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
        '"Plus Jakarta Sans"',
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'system-ui',
        'sans-serif',
      ].join(', '),
      mono: [
        '"JetBrains Mono"',
        '"SF Mono"',
        'ui-monospace',
        'Menlo',
        'Monaco',
        'Consolas',
        'monospace',
      ].join(', '),
    },
    colors: {
      draft: {
        bg: '#fafaf9',
        dark: '#0e1015',
        card: '#ffffff',
        cardDark: '#15181f',
        border: '#e4e4e7',
        borderDark: '#262932',
        ink: '#09090b',
        subink: '#71717a',
        blue: '#2563eb',
        cyan: '#0284c7',
        emerald: '#059669',
        amber: '#f59e0b',
      },
    },
    boxShadow: {
      'paper-sm': '0 1px 2px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.04)',
      'paper-md': '0 4px 16px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
      'paper-lg': '0 12px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
      'paper-dark-sm': '0 1px 3px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.07)',
      'paper-dark-md': '0 4px 20px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)',
      'paper-dark-lg': '0 14px 36px rgba(0, 0, 0, 0.7), 0 2px 8px rgba(0, 0, 0, 0.4)',
      // Backward-compatible aliases
      'apple-sm': '0 1px 2px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.04)',
      'apple-md': '0 4px 16px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
      'apple-lg': '0 12px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
      'apple-dark-sm': '0 1px 3px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.07)',
      'apple-dark-md': '0 4px 20px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)',
      'apple-dark-lg': '0 14px 36px rgba(0, 0, 0, 0.7), 0 2px 8px rgba(0, 0, 0, 0.4)',
    },
  },
  shortcuts: {
    'paper-card': 'relative bg-white dark:bg-[#11141c] border-2 border-slate-900 dark:border-slate-800 rounded-none shadow-[4px_4px_0px_0px_rgba(15,23,42,0.8)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] transition-all duration-200',
    'paper-card-hover': 'hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-[6px_6px_0px_0px_rgba(37,99,235,0.3)] dark:hover:shadow-[6px_6px_0px_0px_rgba(59,130,246,0.3)] hover:-translate-y-1',
    'paper-pill': 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none text-xs font-mono bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all duration-200 uppercase tracking-wider',
    'paper-tag': 'inline-flex items-center gap-1 px-2 py-0.5 rounded-none text-[11px] font-mono border border-slate-300 dark:border-slate-700 uppercase transition-colors duration-200 hover:border-blue-500',
    'paper-btn': 'inline-flex items-center justify-center gap-2 rounded-none font-bold transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer uppercase tracking-wider hover:-translate-y-0.5',
    'paper-btn-primary': 'inline-flex items-center justify-center gap-2 rounded-none font-bold text-xs sm:text-sm px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white dark:bg-white dark:hover:bg-blue-500 dark:text-slate-950 dark:hover:text-white border-2 border-slate-900 dark:border-white shadow-[3px_3px_0px_0px_rgba(15,23,42,0.8)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(37,99,235,0.45)] dark:hover:shadow-[5px_5px_0px_0px_rgba(59,130,246,0.45)] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer uppercase tracking-wider',
    'paper-btn-secondary': 'inline-flex items-center justify-center gap-2 rounded-none font-bold text-xs sm:text-sm px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border-2 border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-blue-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.06)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(37,99,235,0.25)] dark:hover:shadow-[5px_5px_0px_0px_rgba(59,130,246,0.25)] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer uppercase tracking-wider',

    // Mapping legacy classes to cubic paper aesthetics
    'apple-glass': 'bg-white/95 dark:bg-[#11141c]/95 border-2 border-slate-300 dark:border-slate-800 rounded-none shadow-[4px_4px_0px_0px_rgba(15,23,42,0.8)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]',
    'apple-card': 'relative bg-white dark:bg-[#11141c] border-2 border-slate-900 dark:border-slate-800 rounded-none shadow-[4px_4px_0px_0px_rgba(15,23,42,0.8)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] transition-all duration-200',
    'apple-card-hover': 'hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-[6px_6px_0px_0px_rgba(37,99,235,0.3)] dark:hover:shadow-[6px_6px_0px_0px_rgba(59,130,246,0.3)] hover:-translate-y-1',
    'apple-pill': 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none text-xs font-mono bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 uppercase tracking-wider',
    'apple-btn': 'inline-flex items-center justify-center gap-2 rounded-none font-bold transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer uppercase tracking-wider hover:-translate-y-0.5',
    'apple-btn-primary': 'inline-flex items-center justify-center gap-2 rounded-none font-bold text-xs sm:text-sm px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white dark:bg-white dark:hover:bg-blue-500 dark:text-slate-950 dark:hover:text-white border-2 border-slate-900 dark:border-white shadow-[3px_3px_0px_0px_rgba(15,23,42,0.8)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(37,99,235,0.45)] dark:hover:shadow-[5px_5px_0px_0px_rgba(59,130,246,0.45)] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer uppercase tracking-wider',
    'apple-btn-secondary': 'inline-flex items-center justify-center gap-2 rounded-none font-bold text-xs sm:text-sm px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border-2 border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-blue-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.06)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(37,99,235,0.25)] dark:hover:shadow-[5px_5px_0px_0px_rgba(59,130,246,0.25)] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer uppercase tracking-wider',
  },
});
