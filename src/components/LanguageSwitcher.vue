<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <!-- Trigger Button (Cubic) -->
    <button
      type="button"
      @click="toggleDropdown"
      class="h-9 flex items-center gap-1.5 px-2.5 sm:px-3 rounded-none bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-slate-900 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-400 text-xs font-bold text-slate-900 dark:text-slate-100 transition-all duration-200 cursor-pointer select-none hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(37,99,235,0.35)] active:translate-x-0.5 active:translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.8)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] uppercase font-mono"
      :aria-expanded="isOpen"
      aria-label="Change language"
    >
      <SvgFlag :code="activeLocaleInfo.code" size="sm" />
      <span class="text-[11px] font-mono tracking-tight uppercase font-bold">{{ activeLocaleInfo.label }}</span>
      <svg
        class="w-3 h-3 text-slate-600 dark:text-slate-400 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>

    <!-- Dropdown Menu (Cubic Box) -->
    <Transition name="apple-dropdown">
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 rounded-none bg-white dark:bg-[#11141c] border-2 border-slate-900 dark:border-slate-700 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] p-1 z-50 focus:outline-none"
        role="menu"
      >
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          type="button"
          @click="selectLocale(loc.code)"
          role="menuitem"
          class="w-full flex items-center justify-between px-3 py-2 rounded-none text-xs transition-all duration-150 cursor-pointer select-none uppercase font-mono"
          :class="[
            currentLocale === loc.code
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
          ]"
        >
          <div class="flex items-center gap-2.5">
            <SvgFlag :code="loc.code" size="md" />
            <div class="flex flex-col text-left">
              <span class="text-xs font-medium">{{ loc.nativeName }}</span>
              <span class="text-[10px] opacity-75 font-mono">{{ loc.label }}</span>
            </div>
          </div>

          <!-- Active Checkmark -->
          <svg
            v-if="currentLocale === loc.code"
            class="w-4 h-4 fill-current opacity-90"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { currentLocale, setLocale, availableLocales, type Locale } from '../i18n';
import SvgFlag from './SvgFlag.vue';

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const activeLocaleInfo = computed(() => {
  return availableLocales.find((l) => l.code === currentLocale.value) || availableLocales[0];
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectLocale = (code: Locale) => {
  setLocale(code);
  isOpen.value = false;
};

const handleClickOutside = (e: MouseEvent) => {
  if (isOpen.value && dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (isOpen.value && e.key === 'Escape') {
    isOpen.value = false;
  }
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('click', handleClickOutside);
    window.removeEventListener('keydown', handleKeyDown);
  }
});
</script>

<style scoped>
.apple-dropdown-enter-active,
.apple-dropdown-leave-active {
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.apple-dropdown-enter-from {
  opacity: 0;
  transform: translateY(-6px) scale(0.96);
}

.apple-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.96);
}
</style>
