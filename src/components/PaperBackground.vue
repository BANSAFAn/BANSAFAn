<template>
  <div
    class="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    aria-hidden="true"
  >
    <!-- 1. Technical Draft Paper Base Layer -->
    <div
      class="absolute inset-0 bg-[#f8f9fa] dark:bg-[#090b10] transition-colors duration-500"
    ></div>

    <!-- 2. Dual-Layer Precision Blueprint Grid (Vector SVG with 24px minor + 96px major cells + Crosshairs) -->
    <svg
      class="absolute inset-0 w-full h-full pointer-events-none opacity-85 dark:opacity-75 transition-opacity duration-500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <!-- Minor 24px grid -->
        <pattern id="minor-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke-width="0.75"
            class="grid-minor-path"
          />
        </pattern>
        <!-- Major 96px grid (4x4 minor cells) with drafting crosshairs -->
        <pattern id="major-grid" width="96" height="96" patternUnits="userSpaceOnUse">
          <rect width="96" height="96" fill="url(#minor-grid)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke-width="1.25"
            class="grid-major-path"
          />
          <!-- Center + registration crosshair -->
          <path
            d="M 44 48 L 52 48 M 48 44 L 48 52"
            fill="none"
            stroke-width="1"
            class="grid-crosshair-center"
          />
          <!-- Corner + registration crosshairs -->
          <path
            d="M -4 0 L 4 0 M 0 -4 L 0 4"
            fill="none"
            stroke-width="1.2"
            class="grid-crosshair-corner"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#major-grid)" />
    </svg>

    <!-- 3. Dynamic Tab Atmospheric Aura (Soft blueprint wash adapting to current sheet) -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] blur-[110px] transition-all duration-700 ease-out opacity-60 dark:opacity-45 pointer-events-none"
      :style="{ background: activeTabAura }"
    ></div>

    <!-- 4. Interactive Spotlight Cursor Follower (Illuminates drafting grid under mouse) -->
    <div
      class="absolute inset-0 transition-opacity duration-300 pointer-events-none opacity-80 dark:opacity-90"
      :style="mouseSpotlightStyle"
    ></div>

    <!-- 5. Architectural Technical Margin Annotations (Visible on wide screens) -->
    <div class="hidden xl:block absolute inset-0 pointer-events-none select-none font-mono text-[9px] uppercase tracking-widest text-slate-400/50 dark:text-slate-600/60 z-0">
      <!-- Top-Left Corner Guide -->
      <div class="absolute top-20 left-6 flex items-center gap-2">
        <span class="text-blue-600 dark:text-blue-400 font-bold">+</span>
        <span>ISO-7200 // GRID 24x96mm</span>
      </div>

      <!-- Top-Right Corner Guide -->
      <div class="absolute top-20 right-6 flex items-center gap-2">
        <span>SHEET: {{ activeTab.toUpperCase() }}</span>
        <span class="text-blue-600 dark:text-blue-400 font-bold">⊕</span>
      </div>

      <!-- Bottom-Left Coordinates -->
      <div class="absolute bottom-6 left-6 flex items-center gap-2">
        <span class="inline-block w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400"></span>
        <span>LAT 50°27'N // LON 30°31'E [KYIV]</span>
      </div>

      <!-- Bottom-Right Technical Revision Stamp -->
      <div class="absolute bottom-6 right-6 flex items-center gap-2">
        <span>BANSAFAn // DOSSIER 2026</span>
        <span class="text-blue-600 dark:text-blue-400 font-bold">∎</span>
      </div>
    </div>

    <!-- 6. Dedicated Ukrainian Flag Dual Horizon overlay (ACTIVE ONLY DURING ANTHEM ON RU) -->
    <div
      v-if="isUaPatriotic"
      class="absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none opacity-30 dark:opacity-40"
      style="background: linear-gradient(180deg, rgba(0, 87, 183, 0.22) 0%, rgba(0, 87, 183, 0.06) 48%, rgba(255, 215, 0, 0.06) 52%, rgba(255, 215, 0, 0.25) 100%);"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { activeTab, isPatrioticModeActive } from '../stores/tabs';

const isUaPatriotic = computed(() => isPatrioticModeActive.value);

// Interactive mouse spotlight tracking
const mouseX = ref(500);
const mouseY = ref(250);
const hasMouseMoved = ref(false);

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
  hasMouseMoved.value = true;
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    mouseX.value = window.innerWidth / 2;
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', handleMouseMove);
  }
});

// Spotlight gradient style that illuminates the engineering grid under the cursor
const mouseSpotlightStyle = computed(() => {
  if (!hasMouseMoved.value) {
    return {
      background: 'radial-gradient(circle 450px at 50% 180px, rgba(37, 99, 235, 0.05), transparent 75%)',
    };
  }
  return {
    background: `radial-gradient(circle 380px at ${mouseX.value}px ${mouseY.value}px, rgba(37, 99, 235, 0.06), transparent 75%)`,
  };
});

// Soft blueprint wash matching the active tab theme
const activeTabAura = computed(() => {
  switch (activeTab.value) {
    case 'tech':
      return 'radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.05) 45%, transparent 75%)';
    case 'cert':
      return 'radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.12) 0%, rgba(6, 182, 212, 0.05) 45%, transparent 75%)';
    case 'i18n':
      return 'radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.12) 0%, rgba(59, 130, 246, 0.05) 45%, transparent 75%)';
    case 'media':
      return 'radial-gradient(ellipse at 50% 0%, rgba(239, 68, 68, 0.11) 0%, rgba(255, 69, 0, 0.05) 45%, transparent 75%)';
    case 'support':
      return 'radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.12) 0%, rgba(245, 158, 11, 0.05) 45%, transparent 75%)';
    case 'profile':
    default:
      return 'radial-gradient(ellipse at 50% 0%, rgba(37, 99, 235, 0.12) 0%, rgba(99, 102, 241, 0.05) 45%, transparent 75%)';
  }
});
</script>

<style scoped>
/* Minor 24px engineering grid lines */
.grid-minor-path {
  stroke: rgba(15, 23, 42, 0.045);
}
:global(.dark) .grid-minor-path {
  stroke: rgba(255, 255, 255, 0.035);
}

/* Major 96px drafting grid lines */
.grid-major-path {
  stroke: rgba(15, 23, 42, 0.09);
}
:global(.dark) .grid-major-path {
  stroke: rgba(255, 255, 255, 0.07);
}

/* Center + registration crosshair */
.grid-crosshair-center {
  stroke: rgba(37, 99, 235, 0.35);
}
:global(.dark) .grid-crosshair-center {
  stroke: rgba(56, 189, 248, 0.28);
}

/* Corner + registration crosshairs */
.grid-crosshair-corner {
  stroke: rgba(37, 99, 235, 0.5);
}
:global(.dark) .grid-crosshair-corner {
  stroke: rgba(56, 189, 248, 0.4);
}
</style>
