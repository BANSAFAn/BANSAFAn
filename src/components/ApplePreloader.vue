<template>
  <div
    v-if="showPreloader"
    class="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#fbfbfd] dark:bg-[#000000] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none cursor-none"
    :class="{
      'opacity-100 scale-100 filter-none': !isFadingOut,
      'opacity-0 scale-105 blur-xl pointer-events-none': isFadingOut
    }"
  >
    <!-- ДАДАДАДАДДАДАДАДАДАДАДАД ПО"НО ТУТ ПОШУКАЙ !! -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" style="contain: strict;">
      <div class="w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-cyan-500/20 blur-[60px] animate-pulse"></div>
    </div>

    <!-- Center Content (Zero logos as requested) -->
    <div class="relative flex flex-col items-center z-10 px-6 text-center">
      <!-- Title Typography -->
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2">
        Baneronetwo
      </h2>
      <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-mono tracking-widest uppercase mb-10">
        Studio Profile
      </p>

      <!-- Apple Minimalist Loading Bar with Glowing Head -->
      <div class="w-64 sm:w-80 h-[2.5px] rounded-full bg-neutral-200 dark:bg-neutral-800/90 overflow-hidden relative mb-4">
        <div
          class="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 dark:from-white dark:via-blue-400 dark:to-cyan-300 rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(0,113,227,0.7)]"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>

      <!-- Live Loading Status & Percentage -->
      <div class="flex items-center justify-between w-64 sm:w-80 text-xs font-mono text-neutral-500 dark:text-neutral-400">
        <span class="transition-opacity duration-300">{{ currentStatus }}</span>
        <span class="font-semibold text-neutral-800 dark:text-neutral-200">{{ progress }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const showPreloader = ref(true);
const isFadingOut = ref(false);
const progress = ref(0);

const currentStatus = computed(() => {
  if (progress.value < 25) return 'Ініціалізація студії...';
  if (progress.value < 55) return 'Завантаження екосистеми...';
  if (progress.value < 85) return 'Синхронізація i18n & проектів...';
  if (progress.value < 100) return 'Підготовка інтерфейсу...';
  return 'Готово';
});

onMounted(() => {
  // Check if shown in current session
  try {
    const hasLoaded = sessionStorage.getItem('bansafan_splash_shown');
    if (hasLoaded) {
      showPreloader.value = false;
      return;
    }
  } catch (e) {}

  // Snappy Apple Keynote startup experience (1.8s for optimal LCP & responsiveness)
  const duration = 1800;
  const startTime = performance.now();

  const updateProgress = (now: number) => {
    const elapsed = now - startTime;
    const rawProgress = Math.min(100, Math.round((elapsed / duration) * 100));
    progress.value = rawProgress;

    if (elapsed < duration) {
      requestAnimationFrame(updateProgress);
    } else {
      progress.value = 100;
      setTimeout(() => {
        isFadingOut.value = true;
        try {
          sessionStorage.setItem('bansafan_splash_shown', 'true');
        } catch (e) {}

        setTimeout(() => {
          showPreloader.value = false;
        }, 500);
      }, 150);
    }
  };

  requestAnimationFrame(updateProgress);
});
</script>
