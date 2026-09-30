<template>
  <div
    class="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-canvas-optimized"
    style="contain: strict; isolation: isolate; transform: translate3d(0, 0, 0); backface-visibility: hidden;"
    aria-hidden="true"
  >
    <!-- Background Tint Layer -->
    <div
      class="absolute inset-0 transition-colors duration-1000 ease-out"
      :style="{ backgroundColor: palette.tint }"
    ></div>

    <!-- ORB 1: Main Floating Fluid Aura (Top Center / Left) -->
    <div
      class="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-[45px] sm:blur-[60px] orb-blur opacity-75 sm:opacity-85 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform animate-float-1"
      :style="{
        background: `radial-gradient(circle, ${palette.orb1} 0%, ${palette.orb1} 20%, transparent 65%)`
      }"
    ></div>

    <!-- ORB 2: Secondary Pulsing Fluid Aura (Top Right) -->
    <div
      class="absolute -top-[10%] -right-[15%] w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full blur-[50px] sm:blur-[65px] orb-blur opacity-70 sm:opacity-80 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform animate-float-2"
      :style="{
        background: `radial-gradient(circle, ${palette.orb2} 0%, ${palette.orb2} 20%, transparent 65%)`
      }"
    ></div>

    <!-- ORB 3: Drifting Ambient Aura (Middle / Bottom Left) -->
    <div
      class="absolute top-[35%] -left-[20%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-[50px] sm:blur-[65px] orb-blur opacity-65 sm:opacity-75 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform animate-float-3"
      :style="{
        background: `radial-gradient(circle, ${palette.orb3} 0%, ${palette.orb3} 20%, transparent 65%)`
      }"
    ></div>

    <!-- ORB 4: Accent Breathing Aura (Bottom Right) -->
    <div
      class="absolute bottom-[5%] -right-[15%] w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full blur-[50px] sm:blur-[65px] orb-blur opacity-60 sm:opacity-70 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform animate-float-4"
      :style="{
        background: `radial-gradient(circle, ${palette.orb4} 0%, ${palette.orb4} 20%, transparent 65%)`
      }"
    ></div>

    <!-- Dedicated Ukrainian Flag Dual Horizon overlay (ACTIVE ONLY DURING ANTHEM ON RU) -->
    <div
      v-if="isUaPatriotic"
      class="absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none opacity-45 dark:opacity-60"
      style="background: linear-gradient(180deg, rgba(0, 87, 183, 0.32) 0%, rgba(0, 87, 183, 0.12) 48%, rgba(255, 215, 0, 0.12) 52%, rgba(255, 215, 0, 0.35) 100%);"
    ></div>

    <!-- Subtle Vignette & Specular Ambient Mesh -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-black/[0.15] dark:via-black/[0.2] dark:to-black/[0.6] pointer-events-none"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { activeTab, isPatrioticModeActive, type TabId } from '../stores/tabs';

interface TabPalette {
  tint: string;
  orb1: string;
  orb2: string;
  orb3: string;
  orb4: string;
}

const isUaPatriotic = computed(() => isPatrioticModeActive.value);

const uaFlagPalette: TabPalette = {
  tint: 'rgba(0, 87, 183, 0.08)',
  orb1: 'rgba(0, 87, 183, 0.75)',  // Ukrainian Sky Blue (Top Left)
  orb2: 'rgba(0, 113, 227, 0.70)', // Ukrainian Azure Blue (Top Right)
  orb3: 'rgba(255, 215, 0, 0.75)', // Ukrainian Wheat Gold (Bottom Left)
  orb4: 'rgba(255, 193, 7, 0.70)',  // Ukrainian Golden Yellow (Bottom Right)
};

const palettes: Record<TabId, TabPalette> = {
  profile: {
    // Apple Classic Sapphire & Electric Indigo
    tint: 'rgba(0, 113, 227, 0.03)',
    orb1: 'rgba(0, 113, 227, 0.55)', // Vivid Royal Blue
    orb2: 'rgba(99, 102, 241, 0.45)', // Electric Indigo
    orb3: 'rgba(6, 182, 212, 0.40)',  // Cyan
    orb4: 'rgba(59, 130, 246, 0.35)', // Azure
  },
  tech: {
    // High-Tech Matrix / Developer: Neon Emerald, Cyber Cyan & Teal
    tint: 'rgba(16, 185, 129, 0.04)',
    orb1: 'rgba(16, 185, 129, 0.55)', // Vivid Emerald
    orb2: 'rgba(6, 182, 212, 0.50)',  // Cyber Cyan
    orb3: 'rgba(20, 184, 166, 0.45)', // Matrix Teal
    orb4: 'rgba(34, 197, 94, 0.40)',  // Neon Green
  },
  i18n: {
    // Global Polyglot Aurora: Cosmic Violet, Fuchsia & Electric Blue
    tint: 'rgba(139, 92, 246, 0.04)',
    orb1: 'rgba(139, 92, 246, 0.55)', // Cosmic Violet
    orb2: 'rgba(236, 72, 153, 0.45)', // Neon Fuchsia
    orb3: 'rgba(59, 130, 246, 0.45)', // Electric Blue
    orb4: 'rgba(168, 85, 247, 0.40)', // Celestial Purple
  },
  media: {
    // Creator Studio: Intense YouTube Crimson, Reddit Orange & Violet
    tint: 'rgba(239, 68, 68, 0.04)',
    orb1: 'rgba(239, 68, 68, 0.60)', // Intense YouTube Crimson Red
    orb2: 'rgba(255, 69, 0, 0.50)',  // Reddit Fiery Orange
    orb3: 'rgba(168, 85, 247, 0.45)',// Sunset Violet
    orb4: 'rgba(244, 63, 94, 0.40)', // Rose Glow
  },
  support: {
    // Apple Wallet Gold, Amber & Monobank Emerald
    tint: 'rgba(245, 158, 11, 0.04)',
    orb1: 'rgba(245, 158, 11, 0.60)', // Royal Gold Amber
    orb2: 'rgba(16, 185, 129, 0.45)', // Monobank Emerald
    orb3: 'rgba(251, 191, 36, 0.45)', // Warm Sunlight
    orb4: 'rgba(217, 119, 6, 0.40)',  // Bronze Glow
  },
};

const palette = computed(() => {
  if (isUaPatriotic.value) {
    return uaFlagPalette;
  }
  return palettes[activeTab.value] || palettes.profile;
});
</script>

<style>
/* Organic Fluid Keyframe Animations for Floating Mesh Orbs */
@keyframes float1 {
  0%, 100% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(80px, -60px) scale(1.08);
  }
  66% {
    transform: translate(-50px, 40px) scale(0.95);
  }
}

@keyframes float2 {
  0%, 100% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(-90px, 70px) scale(0.92);
  }
  66% {
    transform: translate(60px, -40px) scale(1.06);
  }
}

@keyframes float3 {
  0%, 100% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(70px, 80px) scale(1.05);
  }
  66% {
    transform: translate(-60px, -50px) scale(0.96);
  }
}

@keyframes float4 {
  0%, 100% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(-70px, -60px) scale(1.08);
  }
  66% {
    transform: translate(80px, 50px) scale(0.94);
  }
}

.animate-float-1 {
  animation: float1 18s ease-in-out infinite;
  transform: translate3d(0, 0, 0);
}

.animate-float-2 {
  animation: float2 22s ease-in-out infinite;
  transform: translate3d(0, 0, 0);
}

.animate-float-3 {
  animation: float3 25s ease-in-out infinite;
  transform: translate3d(0, 0, 0);
}

.animate-float-4 {
  animation: float4 20s ease-in-out infinite;
  transform: translate3d(0, 0, 0);
}

/* Firefox Specific Optimization: Gecko WebRender has heavy overhead for >50px blur with backdrop filters */
@-moz-document url-prefix() {
  .orb-blur {
    filter: blur(35px) !important;
  }
}

@supports (-moz-appearance: none) {
  .orb-blur {
    filter: blur(35px) !important;
  }
}
</style>
