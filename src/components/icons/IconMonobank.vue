<template>
  <svg
    :class="props.class"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="5" width="20" height="14" rx="3" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <circle cx="7" cy="15" r="1" fill="currentColor" />
    <circle cx="11" cy="15" r="1" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ class?: string }>();
</script>
