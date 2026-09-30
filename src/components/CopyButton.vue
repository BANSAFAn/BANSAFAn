<template>
  <button
    type="button"
    @click="copyText"
    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-black/[0.08] dark:border-white/[0.12] bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-neutral-800 dark:text-neutral-200 transition-all duration-200"
    :title="label || 'Копіювати'"
  >
    <IconCheck v-if="copied" class="w-3.5 h-3.5 text-emerald-500" />
    <IconCopy v-else class="w-3.5 h-3.5 opacity-70" />
    <span>{{ copied ? 'Скопійовано' : (label || 'Копіювати') }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconCopy from './icons/IconCopy.vue';
import IconCheck from './icons/IconCheck.vue';

const props = defineProps<{
  text: string;
  label?: string;
}>();

const copied = ref(false);

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(props.text);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (e) {
    console.error('Failed to copy', e);
  }
};
</script>
