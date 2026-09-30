import {
  defineConfig,
  presetUno,
  presetAttributify,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    fontFamily: {
      sans: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"SF Pro Display"',
        '"SF Pro Text"',
        '"SF Pro"',
        'Inter',
        '-system-ui',
        'system-ui',
        '"Helvetica Neue"',
        'Helvetica',
        'Arial',
        'sans-serif',
      ].join(', '),
      mono: [
        '"SF Mono"',
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'monospace',
      ].join(', '),
    },
    colors: {
      apple: {
        bg: '#fbfbfd',
        dark: '#000000',
        surface: '#ffffff',
        surfaceDark: '#161617',
        surfaceElevated: '#1c1c1e',
        blue: '#0071e3',
        blueHover: '#0077ed',
        subtext: '#86868b',
      },
    },
    boxShadow: {
      'apple-sm': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
      'apple-md': '0 12px 32px rgba(0, 0, 0, 0.06), 0 4px 10px rgba(0, 0, 0, 0.03)',
      'apple-lg': '0 28px 60px rgba(0, 0, 0, 0.08), 0 8px 18px rgba(0, 0, 0, 0.04)',
      'apple-dark-sm': '0 2px 10px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.25)',
      'apple-dark-md': '0 12px 32px rgba(0, 0, 0, 0.55), 0 4px 12px rgba(0, 0, 0, 0.35)',
      'apple-dark-lg': '0 28px 60px rgba(0, 0, 0, 0.7), 0 8px 24px rgba(0, 0, 0, 0.45)',
    },
  },
  shortcuts: {
    'apple-glass': 'bg-white/70 dark:bg-[#161617]/70 backdrop-blur-2xl border border-black/[0.06] dark:border-white/[0.09] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12)]',
    'apple-card': 'relative bg-white/80 dark:bg-[#161617]/80 backdrop-blur-2xl border border-black/[0.06] dark:border-white/[0.08] rounded-3xl shadow-apple-sm dark:shadow-apple-dark-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'apple-card-hover': 'hover:border-black/[0.12] dark:hover:border-white/[0.18] hover:shadow-apple-md dark:hover:shadow-apple-dark-md hover:-translate-y-1',
    'apple-pill': 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-tight bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 backdrop-blur-md transition-colors',
    'apple-btn': 'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97]',
    'apple-btn-primary': 'inline-flex items-center justify-center gap-2 rounded-full font-medium text-sm px-6 py-3 bg-[#0071e3] hover:bg-[#0077ed] active:scale-[0.97] text-white shadow-[0_4px_16px_rgba(0,113,227,0.35)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'apple-btn-secondary': 'inline-flex items-center justify-center gap-2 rounded-full font-medium text-sm px-6 py-3 bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] active:scale-[0.97] text-neutral-900 dark:text-neutral-100 border border-black/[0.06] dark:border-white/[0.1] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
  },
});
