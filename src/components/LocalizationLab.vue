<template>
  <div class="apple-card p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden">
    <!-- Ambient back light -->
    <div
      class="absolute -right-12 -top-12 w-48 h-48 bg-cyan-500/10 dark:bg-cyan-400/15 rounded-full blur-3xl pointer-events-none"
    ></div>

    <div>
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm shadow-apple-sm"
          >
            <span class="text-base">🌐</span>
          </div>
          <div>
            <span class="text-[11px] font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
              Interactive Lab
            </span>
            <h3 class="text-lg sm:text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Мовна локалізація (i18n)
            </h3>
          </div>
        </div>

        <span class="apple-pill border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          5 напрямків
        </span>
      </div>

      <p class="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
        Перемикайте мови нижче, щоб наживо побачити результати адаптації інтерфейсів та контенту:
      </p>

      <!-- Apple Segmented Control -->
      <div
        class="p-1 rounded-2xl bg-neutral-900/[0.04] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between gap-1 mb-6 overflow-x-auto no-scrollbar"
      >
        <button
          v-for="item in languages"
          :key="item.code"
          type="button"
          @click="selectedCode = item.code"
          :class="[
            'flex-1 py-1.5 px-2 rounded-xl text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer select-none whitespace-nowrap',
            selectedCode === item.code
              ? 'bg-white dark:bg-white/[0.16] text-neutral-950 dark:text-white shadow-apple-sm font-semibold'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/[0.05]'
          ]"
        >
          <span><SvgFlag :code="item.flag" size="sm" /></span>
          <span>{{ item.code }}</span>
        </button>
      </div>

      <!-- Live Localized Preview Screen -->
      <div
        class="relative rounded-2xl p-5 bg-neutral-900/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] transition-all duration-300 min-h-[140px] flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between text-xs text-neutral-400 mb-2">
            <span class="font-medium text-neutral-900 dark:text-neutral-200">
              {{ currentLang.name }} ({{ currentLang.code }})
            </span>
            <span class="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
              {{ currentLang.level }}
            </span>
          </div>

          <!-- Animated text switch -->
          <Transition name="fade-slide" mode="out-in">
            <p
              :key="currentLang.code"
              class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed italic"
            >
              “{{ currentLang.quote }}”
            </p>
          </Transition>
        </div>

        <!-- Metric tags -->
        <div class="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.06]">
          <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.05] text-neutral-500 dark:text-neutral-400">
            Scope: {{ currentLang.scope }}
          </span>
          <span class="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
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
