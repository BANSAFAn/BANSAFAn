<template>
  <span class="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-black/10 dark:border-white/15 shadow-[0_1px_2px_rgba(0,0,0,0.15)] leading-none select-none">
    <!-- Ukraine (UA) -->
    <svg
      v-if="code === 'uk'"
      viewBox="0 0 640 480"
      :class="sizeClass"
      aria-label="Україна"
    >
      <path fill="#ffd700" d="M0 0h640v480H0z"/>
      <path fill="#0057b7" d="M0 0h640v240H0z"/>
    </svg>

    <!-- United Kingdom (EN / GB) -->
    <svg
      v-else-if="code === 'en'"
      viewBox="0 0 640 480"
      :class="sizeClass"
      aria-label="English / UK"
    >
      <path fill="#012169" d="M0 0h640v480H0z"/>
      <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
      <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184-82L23 40V0l270 200h-53zM640 0v3L391 191l2-44L582 0h58zM0 477v-4l250-187-3 44L59 480H0v-3z"/>
      <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
      <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
    </svg>

    <!-- Germany (DE) -->
    <svg
      v-else-if="code === 'de'"
      viewBox="0 0 640 480"
      :class="sizeClass"
      aria-label="Deutsch"
    >
      <path fill="#ffce00" d="M0 320h640v160H0z"/>
      <path fill="#000" d="M0 0h640v160H0z"/>
      <path fill="#d00" d="M0 160h640v160H0z"/>
    </svg>

    <!-- China (ZH / CN) -->
    <svg
      v-else-if="code === 'zh'"
      viewBox="0 0 640 480"
      :class="sizeClass"
      aria-label="简体中文"
    >
      <path fill="#ee1c25" d="M0 0h640v480H0z"/>
      <polygon fill="#ffde00" points="120,40 132,77 171,77 139,100 152,137 120,114 88,137 101,100 69,77 108,77"/>
      <polygon fill="#ffde00" points="200,24 204,36 216,36 206,44 210,56 200,48 190,56 194,44 184,36 196,36" transform="rotate(23 200 40)"/>
      <polygon fill="#ffde00" points="240,70 244,82 256,82 246,90 250,102 240,94 230,102 234,90 224,82 236,82" transform="rotate(45 240 86)"/>
      <polygon fill="#ffde00" points="240,140 244,152 256,152 246,160 250,172 240,164 230,172 234,160 224,152 236,152" transform="rotate(2 240 156)"/>
      <polygon fill="#ffde00" points="200,190 204,202 216,202 206,210 210,222 200,214 190,222 194,210 184,202 196,202" transform="rotate(-20 200 206)"/>
    </svg>

    <!-- Belarus (BE) -->
    <svg
      v-else-if="code === 'be'"
      viewBox="0 0 640 480"
      :class="sizeClass"
      aria-label="Беларуская"
    >
      <path fill="#007d46" d="M0 0h640v480H0z"/>
      <path fill="#cf101a" d="M0 0h640v320H0z"/>
      <path fill="#ffffff" d="M0 0h84v480H0z"/>
      <path fill="#cf101a" d="M42 0l22 24-22 24-22-24zm0 48l22 24-22 24-22-24zm0 48l22 24-22 24-22-24zm0 48l22 24-22 24-22-24zm0 48l22 24-22 24-22-24zm0 48l22 24-22 24-22-24zm0 48l22 24-22 24-22-24zm0 48l22 24-22 24-22-24zm0 48l22 24-22 24-22-24zm0 48l22 24-22 24-22-24z"/>
      <path fill="#ffffff" d="M42 8l14 16-14 16-14-16zm0 48l14 16-14 16-14-16zm0 48l14 16-14 16-14-16zm0 48l14 16-14 16-14-16zm0 48l14 16-14 16-14-16zm0 48l14 16-14 16-14-16zm0 48l14 16-14 16-14-16zm0 48l14 16-14 16-14-16zm0 48l14 16-14 16-14-16zm0 48l14 16-14 16-14-16z"/>
    </svg>

    <!-- Russia (RU) -->
    <svg
      v-else-if="code === 'ru'"
      viewBox="0 0 640 480"
      :class="sizeClass"
      aria-label="Русский"
    >
      <path fill="#fff" d="M0 0h640v160H0z"/>
      <path fill="#0039a6" d="M0 160h640v160H0z"/>
      <path fill="#d52b1e" d="M0 320h640v160H0z"/>
    </svg>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Locale } from '../i18n/types';

const props = withDefaults(
  defineProps<{
    code: Locale | string;
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    size: 'sm',
  }
);

const sizeClass = computed(() => {
  if (props.size === 'md') return 'w-5 h-3.5';
  if (props.size === 'lg') return 'w-6 h-4';
  return 'w-4 h-3';
});
</script>
