<template>
  <div class="w-full max-w-4xl mx-auto mt-12 group perspective-1000">
    <!-- Window Frame -->
    <div
      class="relative rounded-2xl sm:rounded-3xl bg-[#1e1e20]/90 dark:bg-[#121214]/90 backdrop-blur-3xl border border-white/[0.12] shadow-[0_25px_70px_rgba(0,0,0,0.35)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-500 hover:border-white/[0.2] hover:shadow-[0_35px_90px_rgba(0,0,0,0.45)] text-left"
    >
      <!-- macOS Window Header Bar -->
      <div
        class="h-11 sm:h-12 px-4 flex items-center justify-between border-b border-white/[0.08] bg-white/[0.03] select-none"
      >
        <!-- Traffic lights -->
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] inline-block shadow-sm"></span>
          <span class="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] inline-block shadow-sm"></span>
          <span class="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block shadow-sm"></span>
        </div>

        <!-- Interactive File Tabs -->
        <div class="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[65%] sm:max-w-none">
          <button
            v-for="(file, key) in files"
            :key="key"
            type="button"
            @click="activeTab = key"
            :class="[
              'px-3 py-1 text-xs font-mono rounded-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer',
              activeTab === key
                ? 'bg-white/[0.12] text-white shadow-inner font-medium'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.05]'
            ]"
          >
            <span :class="file.dotClass" class="w-1.5 h-1.5 rounded-full"></span>
            <span>{{ file.name }}</span>
          </button>
        </div>

        <!-- Window Action Pill -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="copyCode"
            class="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-neutral-300 border border-white/[0.08] transition-all duration-200 active:scale-95 flex items-center gap-1 cursor-pointer"
            :title="copied ? 'Скопійовано!' : 'Копіювати код'"
          >
            <span v-if="copied" class="text-emerald-400">✓ copied</span>
            <span v-else>copy</span>
          </button>
        </div>
      </div>

      <!-- Code Area with Line Numbers -->
      <div class="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto max-h-[380px] select-text">
        <div
          v-for="(line, idx) in currentContent"
          :key="idx"
          class="flex items-start hover:bg-white/[0.03] rounded px-1 transition-colors"
        >
          <span class="w-8 select-none text-neutral-600 text-right pr-4 text-[11px] sm:text-xs pt-0.5">
            {{ idx + 1 }}
          </span>
          <span class="flex-1 whitespace-pre" v-html="line"></span>
        </div>
      </div>

      <!-- macOS Status Bar -->
      <div
        class="h-8 px-4 border-t border-white/[0.08] bg-black/40 flex items-center justify-between text-[11px] font-mono text-neutral-400 select-none"
      >
        <div class="flex items-center gap-3">
          <span class="flex items-center gap-1 text-emerald-400">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            ready
          </span>
          <span class="hidden sm:inline text-neutral-500">•</span>
          <span class="hidden sm:inline text-neutral-400">git:(main)</span>
        </div>
        <div class="flex items-center gap-3 text-neutral-400">
          <span>{{ files[activeTab].language }}</span>
          <span class="hidden sm:inline text-neutral-500">•</span>
          <span class="hidden sm:inline">UTF-8</span>
          <span class="text-blue-400 font-medium">Baneronetwo Studio</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

type TabKey = 'profile' | 'mission' | 'stack';

interface FileData {
  name: string;
  language: string;
  dotClass: string;
  lines: string[];
  rawText: string;
}

const activeTab = ref<TabKey>('profile');
const copied = ref(false);

const files: Record<TabKey, FileData> = {
  profile: {
    name: 'profile.ts',
    language: 'TypeScript',
    dotClass: 'bg-blue-400',
    lines: [
      '<span class="text-purple-400">export const</span> <span class="text-blue-300">developer</span> = {',
      '  <span class="text-neutral-300">name</span>: <span class="text-emerald-300">"Володимир Шамін"</span>,',
      '  <span class="text-neutral-300">handle</span>: <span class="text-emerald-300">"BANSAFAn"</span>,',
      '  <span class="text-neutral-300">organizations</span>: [<span class="text-emerald-300">"Voxelum"</span>, <span class="text-emerald-300">"Prismlinux"</span>],',
      '  <span class="text-neutral-300">developerProgram</span>: <span class="text-purple-400">true</span>,',
      '  <span class="text-neutral-300">achievements</span>: [<span class="text-emerald-300">"Pull Shark x2"</span>, <span class="text-emerald-300">"Pair Extraordinaire"</span>, <span class="text-emerald-300">"YOLO"</span>],',
      '  <span class="text-neutral-300">status</span>: <span class="text-amber-300">"🌴 No rest yet, time has not set for how long"</span>,',
      '  <span class="text-neutral-300">mission</span>: <span class="text-emerald-300">"Tauri v2, Rust & High-Performance Open Source Apps"</span>',
      '};',
    ],
    rawText: `export const developer = {
  name: "Володимир Шамін",
  handle: "BANSAFAn",
  organizations: ["Voxelum", "Prismlinux"],
  developerProgram: true,
  achievements: ["Pull Shark x2", "Pair Extraordinaire", "YOLO"],
  status: "🌴 No rest yet, time has not set for how long",
  mission: "Tauri v2, Rust & High-Performance Open Source Apps"
};`,
  },
  mission: {
    name: 'mission.md',
    language: 'Markdown',
    dotClass: 'bg-amber-400',
    lines: [
      '<span class="text-neutral-500"># Філософія та місія</span>',
      '',
      '<span class="text-cyan-300">&gt; "Творити якісний відкритий код, розбирати софт до гвинтика та допомагати людям."</span>',
      '',
      '<span class="text-neutral-300">- Активний контрибʼютор в організацію Voxelum (x-minecraft-launcher, xmcl-page).</span>',
      '<span class="text-neutral-300">- Розробка десктоп-застосунків на Rust + Tauri v2 та Flutter.</span>',
      '<span class="text-neutral-300">- Участь у веб-розробці та локалізації проєкту Prismlinux.</span>',
      '<span class="text-neutral-300">- Незалежні аналізи софту, безпеки та лаунчерів на YouTube (@Baneronetwo).</span>',
    ],
    rawText: `# Філософія та місія

> "Творити якісний відкритий код, розбирати софт до гвинтика та допомагати людям."

- Активний контрибʼютор в організацію Voxelum (x-minecraft-launcher, xmcl-page).
- Розробка десктоп-застосунків на Rust + Tauri v2 та Flutter.
- Участь у веб-розробці та локалізації проєкту Prismlinux.
- Незалежні аналізи софту, безпеки та лаунчерів на YouTube (@Baneronetwo).`,
  },
  stack: {
    name: 'stack.config.ts',
    language: 'TypeScript',
    dotClass: 'bg-emerald-400',
    lines: [
      '<span class="text-purple-400">export default</span> {',
      '  <span class="text-neutral-300">desktop_and_apps</span>: [<span class="text-emerald-300">"Tauri v2"</span>, <span class="text-emerald-300">"Rust"</span>, <span class="text-emerald-300">"Flutter"</span>, <span class="text-emerald-300">"Dart"</span>, <span class="text-emerald-300">"Vue 3"</span>],',
      '  <span class="text-neutral-300">web_and_arch</span>: [<span class="text-emerald-300">"Astro"</span>, <span class="text-emerald-300">"TypeScript"</span>, <span class="text-emerald-300">"SQLite"</span>, <span class="text-emerald-300">"Node.js"</span>],',
      '  <span class="text-neutral-300">open_source</span>: [<span class="text-emerald-300">"x-minecraft-launcher"</span>, <span class="text-emerald-300">"timiGS-"</span>, <span class="text-emerald-300">"POS-OpenPOS-"</span>],',
      '  <span class="text-neutral-300">platforms</span>: [<span class="text-emerald-300">"Linux"</span>, <span class="text-emerald-300">"Prismlinux"</span>, <span class="text-emerald-300">"Cross-platform"</span>]',
      '};',
    ],
    rawText: `export default {
  desktop_and_apps: ["Tauri v2", "Rust", "Flutter", "Dart", "Vue 3"],
  web_and_arch: ["Astro", "TypeScript", "SQLite", "Node.js"],
  open_source: ["x-minecraft-launcher", "timiGS-", "POS-OpenPOS-"],
  platforms: ["Linux", "Prismlinux", "Cross-platform"]
};`,
  },
};

const currentContent = computed(() => files[activeTab.value].lines);

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(files[activeTab.value].rawText);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy', err);
  }
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.perspective-1000 {
  perspective: 1000px;
}
</style>
