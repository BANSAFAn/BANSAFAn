<template>
  <button
    type="button"
    @click="toggleTheme"
    class="relative p-2 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl text-neutral-700 dark:text-neutral-200 hover:bg-white/90 dark:hover:bg-white/[0.12] transition-all duration-300 shadow-apple-sm dark:shadow-apple-dark-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
    :aria-label="isDark ? 'Перемкнути на світлу тему' : 'Перемкнути на темну тему'"
    title="Змінити тему"
  >
    <div class="relative w-5 h-5 flex items-center justify-center">
      <Transition name="fade-rotate" mode="out-in">
        <IconSun v-if="isDark" class="w-4.5 h-4.5 text-amber-300" />
        <IconMoon v-else class="w-4.5 h-4.5 text-neutral-800" />
      </Transition>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import IconSun from './icons/IconSun.vue';
import IconMoon from './icons/IconMoon.vue';

const isDark = ref(false);

const updateHtmlClass = (dark: boolean) => {
  if (dark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  const theme = isDark.value ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  updateHtmlClass(isDark.value);
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  updateHtmlClass(isDark.value);

  // Listen to system theme changes if user hasn't overridden
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      isDark.value = e.matches;
      updateHtmlClass(isDark.value);
    }
  });
});
</script>

<style scoped>
.fade-rotate-enter-active,
.fade-rotate-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-rotate-enter-from {
  opacity: 0;
  transform: rotate(-45deg) scale(0.8);
}

.fade-rotate-leave-to {
  opacity: 0;
  transform: rotate(45deg) scale(0.8);
}
</style>
