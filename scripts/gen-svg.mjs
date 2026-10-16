import fs from 'fs';

const bgBuf = fs.readFileSync('public/cert/extracted-1.png');
const base64Data = 'data:image/png;base64,' + bgBuf.toString('base64');
console.log('Base64 length:', base64Data.length);

function createSvg(title, date, certId, fontSize = 44) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1650 1276" width="1650" height="1276">
  <defs>
    <style>
      .name-text {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        font-size: 64px;
        font-weight: 700;
        fill: #ffffff;
        text-anchor: middle;
        letter-spacing: -0.5px;
      }
      .course-text {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        font-size: ${fontSize}px;
        font-weight: 600;
        fill: #ffffff;
        text-anchor: middle;
        letter-spacing: -0.2px;
      }
      .meta-text {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        font-size: 26px;
        font-weight: 600;
        fill: #ffffff;
        letter-spacing: 0px;
      }
    </style>
  </defs>
  <!-- Embedded High-Resolution Base64 Artwork (100% Self-Contained) -->
  <image href="${base64Data}" xlink:href="${base64Data}" width="1650" height="1276" />

  <!-- 1. Student Name -->
  <text x="825" y="700" class="name-text">Volodymyr Shamin</text>

  <!-- 2. Course Title -->
  <text x="825" y="860" class="course-text">${title}</text>

  <!-- 3. Date of Completion -->
  <text x="660" y="1100" class="meta-text">${date}</text>

  <!-- 4. Certificate ID -->
  <text x="1025" y="1100" class="meta-text">${certId}</text>
</svg>`;
}

fs.writeFileSync('public/cert/1.svg', createSvg('Getting Started with Rust (LFEL1002)', 'October 10, 2026', 'LF-9c159fuqql', 44));
fs.writeFileSync('public/cert/2.svg', createSvg('Authentication and Authorization for Web/API (LFEL1004)', 'October 11, 2026', 'LF-mvqoqvupix', 44));
fs.writeFileSync('public/cert/3.svg', createSvg('Antitrust Laws and OSS Project Management and Participation (LFC105)', 'October 11, 2026', 'LF-7ooankiew0', 38));

// Mirror to public/cerf/
fs.copyFileSync('public/cert/1.svg', 'public/cerf/1.svg');
fs.copyFileSync('public/cert/2.svg', 'public/cerf/2.svg');
fs.copyFileSync('public/cert/3.svg', 'public/cerf/3.svg');

console.log('Successfully generated self-contained SVGs with xlink and explicit 1650x1276!');
