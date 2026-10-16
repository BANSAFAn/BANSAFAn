<template>
  <div class="w-full max-w-4xl mx-auto text-left">
    <!-- Paper Blueprint Code Sheet Frame (Cubic Box Style) -->
    <div
      class="relative rounded-none bg-[#0d1117] text-slate-100 border-2 border-slate-900 dark:border-slate-700 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] hover:border-blue-500 hover:shadow-[8px_8px_0px_0px_rgba(37,99,235,0.3)] overflow-hidden transition-all duration-200"
    >
      <!-- Technical Notebook Header Bar -->
      <div
        class="h-11 sm:h-12 px-4 flex items-center justify-between border-b-2 border-slate-800 bg-slate-900 select-none"
      >
        <!-- Technical File Stamp / Index -->
        <div class="flex items-center gap-2.5">
          <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400 uppercase font-bold">
            <span class="w-1.5 h-1.5 rounded-none bg-blue-500 animate-pulse"></span>
            <span>SRC // NOTEBOOK</span>
          </div>
        </div>

        <!-- Interactive File Tabs -->
        <div class="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[65%] sm:max-w-none">
          <button
            v-for="(file, key) in files"
            :key="key"
            type="button"
            @click="activeTab = key"
            :class="[
              'px-3 py-1.5 text-xs font-mono rounded-none transition-all duration-100 flex items-center gap-1.5 cursor-pointer uppercase',
              activeTab === key
                ? 'bg-blue-600 text-white border border-blue-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            ]"
          >
            <span :class="file.dotClass" class="w-1.5 h-1.5 rounded-none"></span>
            <span>{{ file.name }}</span>
          </button>
        </div>

        <!-- Window Action: Copy Code -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="copyCode"
            class="px-2.5 py-1 text-[11px] font-mono rounded-none bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-all duration-100 active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer font-bold uppercase"
            :title="copied ? 'Скопійовано!' : 'Копіювати код'"
          >
            <span v-if="copied" class="text-emerald-400">✓ copied</span>
            <span v-else class="flex items-center gap-1">
              <svg class="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="0" ry="0" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>copy</span>
            </span>
          </button>
        </div>
      </div>

      <!-- Code Area with Line Numbers -->
      <div class="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto max-h-[380px] select-text bg-[#0b0e14]">
        <div
          v-for="(line, idx) in currentContent"
          :key="idx"
          class="flex items-start hover:bg-white/[0.03] rounded px-1 transition-colors"
        >
          <span class="w-8 select-none text-slate-600 text-right pr-4 text-[11px] sm:text-xs pt-0.5">
            {{ idx + 1 }}
          </span>
          <span class="flex-1 whitespace-pre" v-html="line"></span>
        </div>
      </div>

      <!-- Blueprint Technical Status Bar -->
      <div
        class="h-8 px-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none"
      >
        <div class="flex items-center gap-3">
          <span class="flex items-center gap-1.5 text-emerald-400">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ready</span>
          </span>
          <span class="hidden sm:inline text-slate-600">•</span>
          <span class="hidden sm:inline text-slate-400">git:(main)</span>
        </div>
        <div class="flex items-center gap-3 text-slate-400">
          <span>{{ files[activeTab].language }}</span>
          <span class="hidden sm:inline text-slate-600">•</span>
          <span class="hidden sm:inline">UTF-8</span>
          <span class="text-blue-400 font-medium">Baneronetwo Folio</span>
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
