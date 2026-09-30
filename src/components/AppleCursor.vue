<template>
  <div
    v-if="isEnabled"
    class="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300"
    :class="{ 'opacity-0': !isVisible, 'opacity-100': isVisible }"
    aria-hidden="true"
  >
    <!-- ВАААААААААААААААААААААААААІІІІІІІІІІІ ТУТ ЙОПТА КУРСОР ЯКИЙ Я СП"ЗДИВ З ОДНОГО РЕСУРСА -->
    <div
      class="fixed pointer-events-none will-change-transform will-change-[width,height,border-radius]"
      :style="cursorStyle"
      :class="cursorClasses"
    ></div>

    <!-- Inner Dot (Only active in default mode) -->
    <div
      class="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full pointer-events-none will-change-transform transition-all duration-75"
      :class="dotClasses"
      :style="dotStyle"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

type CursorMode = 'default' | 'button' | 'text';

const isEnabled = ref(false);
const isVisible = ref(false);
const mode = ref<CursorMode>('default');
const isMouseDown = ref(false);

const mouseX = ref(-100);
const mouseY = ref(-100);

// Interpolated position for smooth trailing
const posX = ref(-100);
const posY = ref(-100);

// Target dimensions & position
const targetX = ref(-100);
const targetY = ref(-100);
const targetW = ref(32);
const targetH = ref(32);
const targetRadius = ref('9999px');

// Dynamic outline color matching the button
const activeColor = ref({
  color: '#0071e3',
  glow: 'rgba(0, 113, 227, 0.4)',
});

let currentHoverEl: HTMLElement | null = null;
let currentTextTarget: HTMLElement | null = null;
let rafId: number | null = null;

const cursorClasses = computed(() => {
  if (mode.value === 'button') {
    return 'border-2 bg-transparent transition-[width,height,border-radius,border-color,box-shadow] duration-200 ease-out';
  }
  if (mode.value === 'text') {
    return 'border-0 bg-[#0071e3] dark:bg-[#2997ff] shadow-[0_0_8px_rgba(0,113,227,0.5)] dark:shadow-[0_0_12px_rgba(41,151,255,0.7)] animate-apple-caret transition-[width,height,border-radius,background-color] duration-150 ease-out';
  }
  return 'border border-neutral-800/40 dark:border-white/50 bg-black/[0.02] dark:bg-white/[0.04] transition-[width,height,border-radius,background-color,border-color] duration-200 ease-out';
});

const dotClasses = computed(() => {
  if (mode.value === 'button' || mode.value === 'text') {
    return 'scale-0 opacity-0';
  }
  return 'bg-neutral-900 dark:bg-white shadow-sm opacity-100 scale-100';
});

const cursorStyle = computed(() => {
  const scale = isMouseDown.value && mode.value === 'button' ? 0.98 : isMouseDown.value ? 0.8 : 1;
  const styleObj: Record<string, string> = {
    width: `${targetW.value}px`,
    height: `${targetH.value}px`,
    borderRadius: targetRadius.value,
    transform: `translate3d(${posX.value}px, ${posY.value}px, 0) scale(${scale})`,
  };

  if (mode.value === 'button') {
    styleObj.borderColor = activeColor.value.color;
    styleObj.boxShadow = `0 0 16px ${activeColor.value.glow}`;
  }

  return styleObj;
});

const dotStyle = computed(() => ({
  transform: `translate3d(${mouseX.value}px, ${mouseY.value}px, 0)`,
}));

function detectButtonColor(el: HTMLElement): { color: string; glow: string } {
  // If Ukrainian patriotic mode is active (triggered on RU locale)
  if (typeof document !== 'undefined' && document.documentElement.getAttribute('data-patriotic') === 'ua') {
    return { color: '#ffd700', glow: 'rgba(0, 87, 183, 0.75)' };
  }

  const html = el.outerHTML.toLowerCase();
  const href = (el.getAttribute('href') || '').toLowerCase();

  // YouTube / Red brand
  if (href.includes('youtube.com') || html.includes('youtube') || html.includes('text-red') || html.includes('bg-red')) {
    return { color: '#ef4444', glow: 'rgba(239, 68, 68, 0.45)' };
  }
  // Discord brand
  if (href.includes('discord') || href.includes('liveone') || html.includes('5865f2') || html.includes('discord')) {
    return { color: '#5865F2', glow: 'rgba(88, 101, 242, 0.45)' };
  }
  // Reddit brand
  if (href.includes('reddit.com') || html.includes('ff4500') || html.includes('reddit')) {
    return { color: '#FF4500', glow: 'rgba(255, 69, 0, 0.45)' };
  }
  // Monobank brand
  if (href.includes('monobank') || html.includes('monobank') || html.includes('apple-btn-primary')) {
    return { color: '#0071e3', glow: 'rgba(0, 113, 227, 0.45)' };
  }
  // Emerald / Green / USDT
  if (html.includes('emerald') || html.includes('green') || html.includes('usdt')) {
    return { color: '#10b981', glow: 'rgba(16, 185, 129, 0.45)' };
  }
  // Purple / ETH / Voxelum
  if (html.includes('purple') || html.includes('indigo') || html.includes('eth')) {
    return { color: '#a855f7', glow: 'rgba(168, 85, 247, 0.45)' };
  }
  // Cyan / Prismlinux
  if (html.includes('cyan') || html.includes('prism')) {
    return { color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.45)' };
  }
  // Amber / Gold / BTC
  if (html.includes('amber') || html.includes('yellow') || html.includes('btc') || html.includes('star')) {
    return { color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.45)' };
  }

  // Fallback to theme-adaptive crisp accent
  const isDark = document.documentElement.classList.contains('dark');
  return isDark
    ? { color: '#ffffff', glow: 'rgba(255, 255, 255, 0.35)' }
    : { color: '#0071e3', glow: 'rgba(0, 113, 227, 0.35)' };
}

// Robust text element detector
function isTextElement(target: HTMLElement): boolean {
  // If target or any ancestor is a button/clickable, it's not text mode
  if (
    target.closest(
      'button, a, [role="button"], input, select, textarea, .apple-pill, .apple-btn-primary, .apple-btn-secondary, [class*="cursor-pointer"]'
    )
  ) {
    return false;
  }

  // Common text tags
  const textSelector =
    'p, h1, h2, h3, h4, h5, h6, span, strong, em, b, i, small, code, pre, label, li, blockquote, dd, dt, time, sub, sup, mark';
  const matched = target.closest(textSelector);
  if (matched) {
    // Ensure the matched text element is not inside a button or clickable link
    return !matched.closest(
      'button, a, [role="button"], input, select, textarea, .apple-pill, .apple-btn-primary, .apple-btn-secondary, [class*="cursor-pointer"]'
    );
  }

  // Check if target itself has direct text nodes
  if (target.childNodes && target.childNodes.length > 0) {
    for (let i = 0; i < target.childNodes.length; i++) {
      const node = target.childNodes[i];
      if (node.nodeType === Node.TEXT_NODE && (node.textContent || '').trim().length > 0) {
        return true;
      }
    }
  }

  return false;
}

const updateAnimation = () => {
  // If snapped to a button, follow the button exactly
  if (mode.value === 'button' && currentHoverEl) {
    const rect = currentHoverEl.getBoundingClientRect();
    const padding = 5;
    targetW.value = rect.width + padding * 2;
    targetH.value = rect.height + padding * 2;
    targetX.value = rect.left - padding;
    targetY.value = rect.top - padding;

    // Fast spring snap to button
    const snapSpeed = 0.35;
    posX.value += (targetX.value - posX.value) * snapSpeed;
    posY.value += (targetY.value - posY.value) * snapSpeed;
  } else if (mode.value === 'text') {
    targetW.value = 2.5;
    targetRadius.value = '9999px';
    targetX.value = mouseX.value - 1.25;
    targetY.value = mouseY.value - targetH.value / 2;

    const textSpeed = 0.45;
    posX.value += (targetX.value - posX.value) * textSpeed;
    posY.value += (targetY.value - posY.value) * textSpeed;
  } else {
    // Default circle cursor following mouse
    targetW.value = 32;
    targetH.value = 32;
    targetRadius.value = '9999px';
    targetX.value = mouseX.value - 16;
    targetY.value = mouseY.value - 16;

    const defaultSpeed = 0.22;
    posX.value += (targetX.value - posX.value) * defaultSpeed;
    posY.value += (targetY.value - posY.value) * defaultSpeed;
  }

  rafId = requestAnimationFrame(updateAnimation);
};

const onMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
  if (!isVisible.value) isVisible.value = true;

  const target = e.target as HTMLElement | null;
  if (!target) return;

  // 1. Check for button / link / interactive clickable element
  const buttonEl = target.closest(
    'button, a, [role="button"], input[type="submit"], input[type="button"], .apple-pill, .apple-btn-primary, .apple-btn-secondary, [class*="cursor-pointer"]'
  ) as HTMLElement | null;

  if (buttonEl) {
    if (buttonEl !== currentHoverEl) {
      mode.value = 'button';
      currentHoverEl = buttonEl;
      activeColor.value = detectButtonColor(buttonEl);

      // Extract border-radius of the button only once upon entering
      try {
        const style = window.getComputedStyle(buttonEl);
        const rad = parseInt(style.borderRadius, 10);
        targetRadius.value = isNaN(rad) || rad === 0 ? '12px' : `${rad + 4}px`;
      } catch (err) {
        targetRadius.value = '9999px';
      }
    }
    return;
  }

  currentHoverEl = null;

  // 2. Check for text element (works everywhere across the whole page, including cards)
  if (isTextElement(target)) {
    mode.value = 'text';
    if (target !== currentTextTarget) {
      currentTextTarget = target;
      try {
        const fs = parseFloat(window.getComputedStyle(target).fontSize);
        if (!isNaN(fs) && fs > 12) {
          targetH.value = Math.min(Math.max(Math.round(fs * 1.25), 20), 48);
        } else {
          targetH.value = 22;
        }
      } catch {
        targetH.value = 22;
      }
    }
    return;
  }

  currentTextTarget = null;
  mode.value = 'default';
};

const onMouseDown = () => {
  isMouseDown.value = true;
};

const onMouseUp = () => {
  isMouseDown.value = false;
};

const onMouseLeave = () => {
  isVisible.value = false;
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    const isTouch = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (!isTouch) {
      isEnabled.value = true;
      document.documentElement.classList.add('custom-cursor-active');

      // Inject aggressive rule into head to guarantee native OS arrow is hidden
      let styleEl = document.getElementById('apple-cursor-hide-native');
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'apple-cursor-hide-native';
        styleEl.innerHTML = `
          *, *::before, *::after, html, body, a, button, input, select, textarea, [role="button"] {
            cursor: none !important;
          }
        `;
        document.head.appendChild(styleEl);
      }

      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mouseleave', onMouseLeave);
      rafId = requestAnimationFrame(updateAnimation);
    }
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.remove('custom-cursor-active');
    const styleEl = document.getElementById('apple-cursor-hide-native');
    if (styleEl) styleEl.remove();

    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mouseleave', onMouseLeave);
    if (rafId) cancelAnimationFrame(rafId);
  }
});
</script>

<style scoped>
@keyframes apple-caret {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

.animate-apple-caret {
  animation: apple-caret 1s ease-in-out infinite;
}
</style>
