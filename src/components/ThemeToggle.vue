<template>
  <button
    type="button"
    @click="toggleTheme"
    class="h-9 w-9 flex items-center justify-center rounded-none border-2 border-slate-900 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-400 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.8)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(37,99,235,0.35)] focus:outline-none active:translate-x-0.5 active:translate-y-0.5 cursor-pointer shrink-0"
    :aria-label="isDark ? 'Перемкнути на світлу тему' : 'Перемкнути на темну тему'"
    title="Змінити тему"
  >
    <div class="relative w-4 h-4 flex items-center justify-center">
      <Transition name="fade-rotate" mode="out-in">
        <IconSun v-if="isDark" class="w-4 h-4 text-amber-500" />
        <IconMoon v-else class="w-4 h-4 text-zinc-700" />
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
