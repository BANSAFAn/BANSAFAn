<template>
  <div
    class="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-opacity duration-1000"
    aria-hidden="true"
  >
    <!-- VolodiaKraplich - МІЙ СЕКСІ ДІВЧИНА...НЕ ЧІПАТИ -->
    <div
      class="absolute -top-[18%] left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-[100%] blur-[130px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform opacity-75 dark:opacity-85"
      :style="orbTopStyle"
    ></div>

    <!-- Я СЕРЙОЗНО ! -->
    <div
      class="absolute top-[30%] -left-[18%] w-[750px] h-[550px] rounded-[100%] blur-[140px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform opacity-65 dark:opacity-75"
      :style="orbLeftStyle"
    ></div>

    <!-- Bottom-Right Tertiary Atmospheric Orb -->
    <div
      class="absolute bottom-[10%] -right-[18%] w-[750px] h-[550px] rounded-[100%] blur-[140px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform opacity-65 dark:opacity-75"
      :style="orbRightStyle"
    ></div>

    <!-- Subtle Grain / Specular Texture -->
    <div class="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { activeTab } from '../stores/tabs';

// Background lighting configurations per tab
const orbConfigs = {
  profile: {
    // Apple Classic Sapphire & Indigo
    top: 'radial-gradient(ellipse at center, rgba(0, 113, 227, 0.16) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 80%)',
    left: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
    right: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
  },
  tech: {
    // High-tech Developer Matrix: Emerald, Teal & Cyan
    top: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.18) 0%, rgba(20, 184, 166, 0.10) 50%, transparent 80%)',
    left: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
    right: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
  },
  i18n: {
    // Global Polyglot Aurora: Violet, Purple & Celestial Pink
    top: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.18) 0%, rgba(59, 130, 246, 0.10) 50%, transparent 80%)',
    left: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
    right: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.14) 0%, transparent 70%)',
  },
  media: {
    // Creator Studio: YouTube Red, Reddit Orange & Deep Purple
    top: 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.16) 0%, rgba(255, 69, 0, 0.10) 50%, transparent 80%)',
    left: 'radial-gradient(ellipse at center, rgba(255, 69, 0, 0.14) 0%, transparent 70%)',
    right: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.14) 0%, transparent 70%)',
  },
  support: {
    // Apple Wallet Gold & Monobank Warm Emerald
    top: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.18) 0%, rgba(16, 185, 129, 0.10) 50%, transparent 80%)',
    left: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
    right: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.12) 0%, transparent 70%)',
  },
};

const currentConfig = computed(() => {
  return orbConfigs[activeTab.value] || orbConfigs.profile;
});

const orbTopStyle = computed(() => ({
  background: currentConfig.value.top,
}));

const orbLeftStyle = computed(() => ({
  background: currentConfig.value.left,
}));

const orbRightStyle = computed(() => ({
  background: currentConfig.value.right,
}));
</script>
