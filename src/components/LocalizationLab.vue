<template>
  <div class="paper-card p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden border-2 border-slate-900 dark:border-slate-700 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-[8px_8px_0px_0px_rgba(37,99,235,0.25)] transition-all duration-200">
    <div>
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-none bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border border-slate-900"
          >
            <span class="text-base">🌐</span>
          </div>
          <div>
            <span class="text-[11px] font-mono tracking-wider uppercase text-blue-600 dark:text-blue-400 font-bold">
              Interactive Lab
            </span>
            <h3 class="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">
              Мовна локалізація (i18n)
            </h3>
          </div>
        </div>

        <span class="paper-pill border border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
          {{ languages.length }} напрямків
        </span>
      </div>

      <p class="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
        Перемикайте мови нижче, щоб наживо побачити результати адаптації інтерфейсів та контенту:
      </p>

      <!-- Paper Segmented Control (Cubic) -->
      <div
        class="p-1 rounded-none bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-between gap-1 mb-6 overflow-x-auto no-scrollbar font-mono"
      >
        <button
          v-for="item in languages"
          :key="item.code"
          type="button"
          @click="selectedCode = item.code"
          :class="[
            'flex-1 py-1.5 px-2 rounded-none text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer select-none whitespace-nowrap uppercase hover:-translate-y-0.5',
            selectedCode === item.code
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-[2px_2px_0px_0px_rgba(37,99,235,0.4)]'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          ]"
        >
          <span><SvgFlag :code="item.flag" size="sm" /></span>
          <span>{{ item.code }}</span>
        </button>
      </div>

      <!-- Live Localized Preview Screen (Cubic Box) -->
      <div
        class="relative rounded-none p-5 bg-slate-50 dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-400 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(37,99,235,0.25)] transition-all duration-200 min-h-[140px] flex flex-col justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,0.06)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]"
      >
        <div>
          <div class="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono">
            <span class="font-bold text-slate-900 dark:text-slate-200 uppercase">
              {{ currentLang.name }} ({{ currentLang.code }})
            </span>
            <span class="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold">
              {{ currentLang.level }}
            </span>
          </div>

          <!-- Animated text switch -->
          <Transition name="fade-slide" mode="out-in">
            <p
              :key="currentLang.code"
              class="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-normal leading-relaxed italic"
            >
              “{{ currentLang.quote }}”
            </p>
          </Transition>
        </div>

        <!-- Metric tags -->
        <div class="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 font-mono">
          <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded-none bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
            Scope: {{ currentLang.scope }}
          </span>
          <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 uppercase">
            <span class="w-1.5 h-1.5 rounded-none bg-emerald-500"></span>
            Повна адаптація
          </span>
        </div>
      </div>
    </div>

    <!-- Footnote -->
    <div class="mt-5 pt-4 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] text-neutral-400 flex items-center justify-between">
      <span>Unicode UTF-8 • Native JSON / PO / YAML</span>
      <span class="text-cyan-600 dark:text-cyan-400 font-medium">Ready for deployment</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import SvgFlag from './SvgFlag.vue';

interface LanguageItem {
  code: string;
  name: string;
  flag: string;
  level: string;
  quote: string;
  scope: string;
}

const languages: LanguageItem[] = [
  {
    code: 'UA',
    name: 'Українська',
    flag: 'uk',
    level: 'Рідна мова',
    quote: 'Якісний веброзробник з України: створюю надійні сервіси та об’єдную інтернет-спільноти.',
    scope: 'Native UI / Docs / Content',
  },
  {
    code: 'EN',
    name: 'English',
    flag: 'en',
    level: 'Technical & Fluent',
    quote: 'Crafting high-performance digital interfaces and resilient software architecture.',
    scope: 'Technical Specs / Codebases',
  },
  {
    code: 'DE',
    name: 'Deutsch',
    flag: 'de',
    level: 'Oberflächenanpassung',
    quote: 'Zuverlässige Webentwicklung und präzise Anpassung digitaler Benutzeroberflächen.',
    scope: 'UI / Localization Systems',
  },
  {
    code: 'ZH',
    name: '中文',
    flag: 'zh',
    level: '本地化与内容',
    quote: '致力于打造高效、响应迅速且美观的前端与后端数字产品体验。',
    scope: 'Interface Strings / i18n',
  },
  {
    code: 'BE',
    name: 'Беларуская',
    flag: 'be',
    level: 'Поўная адаптацыя',
    quote: 'Якасная вэб-распрацоўка, эрганамічныя інтэрфейсы і адкрытыя лічбавыя сістэмы.',
    scope: 'Full UI / i18n Strings',
  },
  {
    code: 'RU',
    name: 'Русский',
    flag: 'ru',
    level: 'Полная адаптация',
    quote: 'Качественная веб-разработка, эргономичные интерфейсы и открытые системы.',
    scope: 'Full UI / Content Strings',
  },
];

const selectedCode = ref('UA');

const currentLang = computed(() => {
  return languages.find((l) => l.code === selectedCode.value) || languages[0];
});
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
