export type Locale = 'uk' | 'en' | 'de' | 'zh' | 'ru';

export interface LocaleInfo {
  code: Locale;
  label: string;
  nativeName: string;
  flag: string;
}

export const availableLocales: LocaleInfo[] = [
  { code: 'uk', label: 'UK', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'en', label: 'EN', nativeName: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'DE', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', label: 'ZH', nativeName: '简体中文', flag: '🇨🇳' },
  { code: 'ru', label: 'RU', nativeName: 'Русский', flag: '🇷🇺' },
];
