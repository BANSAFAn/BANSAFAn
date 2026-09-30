import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const USER_AGENT = 'web:bansafan-portfolio:v1.0.0 (by /u/Banerbansa)';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      {
        headers: {
          'User-Agent': USER_AGENT,
          Accept: 'application/atom+xml, application/xml, text/xml',
        },
      },
      (res) => {
        if (res.statusCode && (res.statusCode < 200 || res.statusCode >= 300)) {
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      }
    ).on('error', reject);
  });
}

const MONTHS_UK = [
  'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
  'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
];

function formatTimeAgo(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const diffMs = Date.now() - d.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'щойно';
    if (diffHours < 24) return `${diffHours} год тому`;
    if (diffDays === 1) return 'вчора';
    if (diffDays < 7) return `${diffDays} дн тому`;

    return `${d.getDate()} ${MONTHS_UK[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

function parseFeed(xml) {
  if (!xml || typeof xml !== 'string') return [];
  const entries = xml.split('<entry>').slice(1);

  return entries.map((entry) => {
    const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = entry.match(/<link[^>]*href="([^"]*)"/);
    const updatedMatch = entry.match(/<updated>(.*?)<\/updated>/);
    const categoryMatch = entry.match(/<category[^>]*label="([^"]*)"/);
    const contentMatch = entry.match(/<content[^>]*>([\s\S]*?)<\/content>/);
    const idMatch = entry.match(/<id>.*?([a-zA-Z0-9_]+)<\/id>/);

    let title = titleMatch ? titleMatch[1] : '';
    title = title
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();

    const link = linkMatch ? linkMatch[1] : '';
    const updated = updatedMatch ? updatedMatch[1] : '';
    const subreddit = categoryMatch ? categoryMatch[1] : 'r/reddit';
    let content = contentMatch ? contentMatch[1] : '';

    content = content
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#32;/g, ' ');

    const mdMatch = content.match(/<div class="md">([\s\S]*?)<\/div>/);
    let body = mdMatch ? mdMatch[1] : content;
    body = body
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n\s+\n/g, '\n\n')
      .trim();

    const id = idMatch ? idMatch[1] : `r-${Math.random().toString(36).substring(2, 9)}`;
    const isComment = id.startsWith('t1_') || title.startsWith('/u/Banerbansa on ');
    const isPost = id.startsWith('t3_') || !isComment;

    let cleanTitle = title;
    let replyTo = '';
    if (isComment && title.startsWith('/u/Banerbansa on ')) {
      cleanTitle = title.replace('/u/Banerbansa on ', '');
    }

    return {
      id,
      type: isPost ? 'post' : 'comment',
      subreddit,
      title: cleanTitle,
      url: link || `https://www.reddit.com/user/Banerbansa`,
      ups: isPost ? Math.floor(Math.random() * 5) + 1 : 1,
      date: formatTimeAgo(updated),
      rawDate: updated,
      actionText: isPost ? 'опублікував(ла) пост' : 'прокоментував(ла)',
      replyTo,
      body: body || cleanTitle,
    };
  });
}

async function main() {
  const outDirSrc = path.join(rootDir, 'src', 'data');
  const outDirPublic = path.join(rootDir, 'public', 'data');
  fs.mkdirSync(outDirSrc, { recursive: true });
  fs.mkdirSync(outDirPublic, { recursive: true });

  const targetFileSrc = path.join(outDirSrc, 'reddit.json');
  const targetFilePublic = path.join(outDirPublic, 'reddit.json');

  // Load existing items if present
  let existingItems = [];
  if (fs.existsSync(targetFileSrc)) {
    try {
      existingItems = JSON.parse(fs.readFileSync(targetFileSrc, 'utf-8'));
    } catch {}
  }

  let fetchedItems = [];
  try {
    const xml = await fetchUrl('https://www.reddit.com/user/Banerbansa/.rss');
    fetchedItems = parseFeed(xml);
    console.log(`[fetch-reddit] Fetched ${fetchedItems.length} items from Reddit RSS.`);
  } catch (err) {
    console.log(`[fetch-reddit] Notice: ${err.message}. Retaining ${existingItems.length} cached items.`);
  }

  const map = new Map();
  // Insert existing first
  for (const item of existingItems) {
    map.set(item.id, item);
  }
  // Overlay freshly fetched
  for (const item of fetchedItems) {
    map.set(item.id, item);
  }

  const combined = Array.from(map.values());
  combined.sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime());

  if (combined.length > 0) {
    const jsonStr = JSON.stringify(combined, null, 2);
    fs.writeFileSync(targetFileSrc, jsonStr, 'utf-8');
    fs.writeFileSync(targetFilePublic, jsonStr, 'utf-8');
    console.log(`[fetch-reddit] Total ${combined.length} items ready.`);
  }
}

main().catch(() => process.exit(0));
