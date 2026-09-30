<template>
  <svg
    :class="props.class"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.2"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ class?: string }>();
</script>
