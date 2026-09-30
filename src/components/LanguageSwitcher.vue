<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <!-- Trigger Button -->
    <button
      type="button"
      @click="toggleDropdown"
      class="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.04] dark:border-white/[0.08] text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-all duration-200 cursor-pointer select-none active:scale-95"
      :aria-expanded="isOpen"
      aria-label="Change language"
    >
      <SvgFlag :code="activeLocaleInfo.code" size="sm" />
      <span class="text-[11px] font-mono tracking-tight uppercase">{{ activeLocaleInfo.label }}</span>
      <svg
        class="w-3 h-3 text-neutral-400 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <Transition name="apple-dropdown">
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 rounded-2xl bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.12] shadow-apple-md p-1.5 z-50 focus:outline-none"
        role="menu"
      >
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          type="button"
          @click="selectLocale(loc.code)"
          role="menuitem"
          class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer select-none"
          :class="[
            currentLocale === loc.code
              ? 'bg-blue-500/10 dark:bg-blue-400/15 text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
          ]"
        >
          <div class="flex items-center gap-2.5">
            <SvgFlag :code="loc.code" size="md" />
            <div class="flex flex-col text-left">
              <span class="text-xs font-medium">{{ loc.nativeName }}</span>
              <span class="text-[10px] text-neutral-400 font-mono">{{ loc.label }}</span>
            </div>
          </div>

          <!-- Active Checkmark -->
          <svg
            v-if="currentLocale === loc.code"
            class="w-4 h-4 text-blue-500 fill-current"
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
