import { ref, computed } from 'vue';
import type { Locale } from './types';
import { availableLocales } from './types';
import uk from './locales/uk';
import en from './locales/en';
import de from './locales/de';
import zh from './locales/zh';
import ru from './locales/ru';
import be from './locales/be';

const dictionaries: Record<Locale, any> = {
  uk,
  be,
  en,
  de,
  zh,
  ru,
};

const STORAGE_KEY = 'bansafan_locale_pref';

function getInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale;
      if (stored && ['uk', 'be', 'en', 'de', 'zh', 'ru'].includes(stored)) {
        return stored;
      }
      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith('uk')) return 'uk';
      if (navLang.startsWith('be')) return 'be';
      if (navLang.startsWith('ru')) return 'ru';
      if (navLang.startsWith('de')) return 'de';
      if (navLang.startsWith('zh')) return 'zh';
      if (navLang.startsWith('en')) return 'en';
    } catch (e) {
      // ignore
    }
  }
  return 'uk';
}

export const currentLocale = ref<Locale>(getInitialLocale());

export function setLocale(locale: Locale) {
  if (!['uk', 'be', 'en', 'de', 'zh', 'ru'].includes(locale)) return;
  currentLocale.value = locale;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
      document.documentElement.lang = locale === 'zh' ? 'zh-Hans' : locale;
      // Do not activate patriotic mode just by selecting RU.
      // Patriotic mode is only active when anthem is playing on RU.
      document.documentElement.removeAttribute('data-patriotic');
    } catch (e) {}
  }
}

export function t(path: string, params?: Record<string, string | number>): string {
  const dict = dictionaries[currentLocale.value] || dictionaries.uk;
  const keys = path.split('.');
  let result: any = dict;

  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      // Fallback to uk if missing
      let fallback: any = dictionaries.uk;
      for (const fk of keys) {
        if (fallback && typeof fallback === 'object' && fk in fallback) {
          fallback = fallback[fk];
        } else {
          return path;
        }
      }
      result = fallback;
      break;
    }
  }

  if (typeof result !== 'string') {
    return path;
  }

  if (params) {
    let formatted = result;
    for (const [pk, pv] of Object.entries(params)) {
      formatted = formatted.replace(new RegExp(`\\{${pk}\\}`, 'g'), String(pv));
    }
    return formatted;
  }

  return result;
}

export { availableLocales, type Locale };
