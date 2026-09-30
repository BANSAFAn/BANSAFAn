<template>
  <div class="space-y-6">
    <!-- GITHUB PROFILE & ORGANIZATIONS PRO CARD -->
    <div class="apple-card p-6 sm:p-9 relative overflow-hidden">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div class="flex items-start sm:items-center gap-3.5">
          <div class="w-12 h-12 rounded-2xl bg-neutral-900/[0.05] dark:bg-white/[0.08] text-neutral-900 dark:text-white flex items-center justify-center font-bold shadow-apple-sm">
            <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                GitHub Ecosystem • BANSAFAn
              </h3>
              <a
                href="https://github.com/BANSAFAn"
                target="_blank"
                rel="noopener noreferrer"
                class="apple-pill border-black/[0.08] dark:border-white/[0.12] text-xs hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition-colors"
              >
                @BANSAFAn
              </a>
            </div>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
              🌴 "No rest yet, time has not set for how long" • 35 Repositories • 66+ Stars
            </p>
          </div>
        </div>

        <!-- Badges & Highlights -->
        <div class="flex flex-wrap items-center gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            Developer Program Member
          </span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            Pull Shark x2
          </span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Pair Extraordinaire
          </span>
        </div>
      </div>

      <!-- ACTIVE ORGANIZATIONS & OPEN-SOURCE ROLES -->
      <div class="py-6 border-b border-black/[0.06] dark:border-white/[0.08]">
        <h4 class="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
          <svg class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span>Організації та активна участь</span>
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Voxelum Organization -->
          <div class="p-5 rounded-2xl bg-neutral-900/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex items-start gap-4">
            <div class="w-11 h-11 rounded-2xl overflow-hidden shrink-0 shadow-apple-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center relative">
              <img
                v-if="!voxelumFallback"
                :src="voxelumLogo"
                alt="Voxelum"
                class="w-full h-full object-cover"
                loading="lazy"
                @error="handleVoxelumError"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-cyan-500/15 text-cyan-500">
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <a
                  href="https://github.com/Voxelum"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-bold text-neutral-900 dark:text-white hover:text-blue-500 transition-colors"
                >
                  Voxelum (x-minecraft-launcher)
                </a>
                <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold">
                  Core Contributor
                </span>
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                Активний контриб'ютор у розробці <strong>XMCL</strong> (Vue 3, Electron, TypeScript) та <strong>xmcl-page</strong>. Реалізація синхронізації мовних пакетів (<code class="text-[11px] font-mono">feat/sync-minecraft-language</code>), оновлення документації, тріаж і вирішення багів.
              </p>
              <div class="mt-2.5 flex items-center gap-3 text-[11px] text-neutral-400 font-mono">
                <a href="https://github.com/Voxelum/x-minecraft-launcher" target="_blank" class="hover:underline text-blue-500">
                  x-minecraft-launcher
                </a>
                <span>•</span>
                <a href="https://xmcl.app" target="_blank" class="hover:underline">
                  xmcl.app
                </a>
              </div>
            </div>
          </div>

          <!-- Prismlinux Organization / Ecosystem -->
          <div class="p-5 rounded-2xl bg-neutral-900/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex items-start gap-4">
            <div class="w-11 h-11 rounded-2xl overflow-hidden shrink-0 shadow-apple-sm bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center relative p-1">
              <img
                v-if="!prismlinuxFallback"
                :src="prismlinuxLogo"
                alt="Prismlinux"
                class="w-full h-full object-contain"
                loading="lazy"
                @error="handlePrismlinuxError"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-indigo-500/15 text-indigo-400">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 3 22 21 2 21"/>
                  <line x1="2" y1="14" x2="10" y2="12" stroke="currentColor"/>
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <a
                  href="https://prismlinux.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-bold text-neutral-900 dark:text-white hover:text-indigo-500 transition-colors"
                >
                  Prismlinux
                </a>
                <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold">
                  Website Contributor
                </span>
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                Участь у розробці та покращенні офіційного вебсайту проєкту (<strong>prismlinux.org</strong>), локалізація інтерфейсу та підтримка спільноти.
              </p>
              <div class="mt-2.5 flex items-center gap-3 text-[11px] text-neutral-400 font-mono">
                <a href="https://prismlinux.org" target="_blank" class="hover:underline text-indigo-500">
                  prismlinux.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- KEY REPOSITORIES SHOWCASE -->
      <div class="pt-6">
        <h4 class="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
          Флагманські відкриті проєкти
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- timiGS- -->
          <a
            href="https://github.com/BANSAFAn/timiGS-"
            target="_blank"
            rel="noopener noreferrer"
            class="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.07] hover:border-black/[0.12] dark:hover:border-white/[0.15] transition-all duration-300 flex flex-col justify-between group/repo"
          >
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-bold text-neutral-900 dark:text-white group-hover/repo:text-blue-500 transition-colors">
                  timiGS-
                </span>
                <span class="text-xs font-mono text-emerald-500 flex items-center gap-1">
                  ★ 11
                </span>
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                Сучасний десктопний трекер активності, аналітика та тайм-менеджмент. Built with <strong>Tauri v2, Rust & Vue 3</strong>. P2P sync.
              </p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400 font-mono">
              <span>Vue • Rust • Tauri</span>
              <span class="text-blue-500">timi-gs.vercel.app</span>
            </div>
          </a>

          <!-- POS-OpenPOS- -->
          <a
            href="https://github.com/BANSAFAn/POS-OpenPOS-"
            target="_blank"
            rel="noopener noreferrer"
            class="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.07] hover:border-black/[0.12] dark:hover:border-white/[0.15] transition-all duration-300 flex flex-col justify-between group/repo"
          >
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-bold text-neutral-900 dark:text-white group-hover/repo:text-blue-500 transition-colors">
                  POS-OpenPOS-
                </span>
                <span class="text-xs font-mono text-cyan-500 flex items-center gap-1">
                  Flutter POS
                </span>
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                Offline-first каса для торгівлі на <strong>Flutter & SQLite</strong>. Локалізація на 7 мов, мультивалютний рушій, робота з POS-терміналами.
              </p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400 font-mono">
              <span>Flutter • Dart • SQLite</span>
              <span class="text-cyan-500">Cross-Platform</span>
            </div>
          </a>

          <!-- XMCL / Open Source Ecosystem -->
          <a
            href="https://github.com/BANSAFAn/XMCL-DEV-Version-Baneronetwo-"
            target="_blank"
            rel="noopener noreferrer"
            class="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.07] hover:border-black/[0.12] dark:hover:border-white/[0.15] transition-all duration-300 flex flex-col justify-between group/repo"
          >
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-bold text-neutral-900 dark:text-white group-hover/repo:text-blue-500 transition-colors">
                  XMCL DEV Baneronetwo
                </span>
                <span class="text-xs font-mono text-purple-500 flex items-center gap-1">
                  Open Source
                </span>
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                Експериментальна гілка та розширення для лаунчера нового покоління. Розширений функціонал та оптимізація.
              </p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400 font-mono">
              <span>TypeScript • Vue 3</span>
              <span class="text-purple-500">Voxelum Ecosystem</span>
            </div>
          </a>
        </div>
      </div>

      <!-- ============================================================= -->
      <!-- GITHUB CONTRIBUTION ACTIVITY (EXACT MATCH TO USER SCREENSHOT) -->
      <!-- ============================================================= -->
      <!-- ============================================================= -->
      <!-- GITHUB CONTRIBUTION ACTIVITY (DYNAMIC, AUTO-UPDATING)         -->
      <!-- ============================================================= -->
      <div class="pt-8 border-t border-black/[0.06] dark:border-white/[0.08]">
        <!-- Timeline Header: Month + Horizontal Line -->
        <div class="flex items-center gap-4 mb-6">
          <span class="text-sm font-semibold text-neutral-900 dark:text-white shrink-0">
            {{ monthLabel }}
          </span>
          <div class="h-[1px] bg-black/[0.08] dark:bg-white/[0.1] w-full"></div>
        </div>

        <!-- Vertical Timeline Container -->
        <div class="relative pl-7 sm:pl-8 space-y-7 before:content-[''] before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-[1.5px] before:bg-black/[0.08] dark:before:bg-white/[0.1]">
          
          <!-- 1. COMMITS -->
          <div v-if="commitRepos.length > 0" class="relative">
            <!-- Timeline Icon -->
            <div class="absolute -left-7 sm:-left-8 top-0 w-6 h-6 rounded-full -translate-x-1/2 bg-neutral-100 dark:bg-neutral-800 border border-black/10 dark:border-white/10 flex items-center justify-center text-neutral-600 dark:text-neutral-400">
              <svg class="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>

            <!-- Title -->
            <div class="flex items-center justify-between gap-2 mb-3">
              <h5 class="text-sm font-semibold text-neutral-900 dark:text-white">
                Created {{ totalCommits }} commits in {{ commitRepos.length }} repositories
              </h5>
            </div>

            <!-- Repos List -->
            <div class="space-y-2.5 text-xs">
              <div
                v-for="repo in commitRepos"
                :key="repo.name"
                class="flex items-center justify-between gap-4 group"
              >
                <a
                  :href="'https://github.com/' + repo.name"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-mono text-blue-600 dark:text-blue-400 hover:underline flex items-baseline gap-2 truncate"
                >
                  <span class="font-medium">{{ repo.name }}</span>
                  <span class="text-neutral-500 dark:text-neutral-400 font-sans text-[11px]">
                    {{ repo.commits }} {{ repo.commits === 1 ? 'commit' : 'commits' }}
                  </span>
                </a>
                <div class="w-24 sm:w-32 h-2 rounded-full bg-emerald-500/20 overflow-hidden shrink-0">
                  <div
                    class="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    :style="{ width: repo.percentage + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. CREATED REPOSITORY -->
          <div v-if="createdRepos.length > 0" class="relative">
            <!-- Timeline Icon -->
            <div class="absolute -left-7 sm:-left-8 top-0 w-6 h-6 rounded-full -translate-x-1/2 bg-neutral-100 dark:bg-neutral-800 border border-black/10 dark:border-white/10 flex items-center justify-center text-neutral-600 dark:text-neutral-400">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16">
                <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.244a.75.75 0 0 1 .75.75v9.75a.75.75 0 0 1-.75.75h-3.905a2.25 2.25 0 0 0-1.591.659l-.47.47a.75.75 0 0 1-1.06 0l-.47-.47A2.25 2.25 0 0 0 5.656 12H1.75a.75.75 0 0 1-.75-.75Zm1.5.75v8h3.406c.64 0 1.25.26 1.696.721l.398.399V3.535a2.25 2.25 0 0 0-1.247-2.007A2.252 2.252 0 0 0 5.003 2.5H1.5Zm7.5 1.035v8.335l.398-.399a2.404 2.404 0 0 1 1.696-.721h3.406v-8h-3.5a2.25 2.25 0 0 0-1.997 1.218A2.25 2.25 0 0 0 9 3.535Z"/>
              </svg>
            </div>

            <!-- Title -->
            <h5 class="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
              Created {{ createdRepos.length }} {{ createdRepos.length === 1 ? 'repository' : 'repositories' }}
            </h5>

            <!-- Repos List -->
            <div class="space-y-2 text-xs">
              <div
                v-for="repo in createdRepos"
                :key="repo.name"
                class="flex items-center justify-between gap-4"
              >
                <div class="flex items-center gap-2 font-mono truncate">
                  <svg class="w-4 h-4 text-neutral-400 fill-current shrink-0" viewBox="0 0 16 16">
                    <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.244a.75.75 0 0 1 .75.75v9.75a.75.75 0 0 1-.75.75h-3.905a2.25 2.25 0 0 0-1.591.659l-.47.47a.75.75 0 0 1-1.06 0l-.47-.47A2.25 2.25 0 0 0 5.656 12H1.75a.75.75 0 0 1-.75-.75Zm1.5.75v8h3.406c.64 0 1.25.26 1.696.721l.398.399V3.535a2.25 2.25 0 0 0-1.247-2.007A2.252 2.252 0 0 0 5.003 2.5H1.5Zm7.5 1.035v8.335l.398-.399a2.404 2.404 0 0 1 1.696-.721h3.406v-8h-3.5a2.25 2.25 0 0 0-1.997 1.218A2.25 2.25 0 0 0 9 3.535Z"/>
                  </svg>
                  <a
                    :href="'https://github.com/' + repo.name"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-medium text-blue-600 dark:text-blue-400 hover:underline truncate"
                  >
                    {{ repo.name }}
                  </a>
                </div>

                <div class="flex items-center gap-4 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                  <span v-if="repo.language" class="flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: repo.languageColor }"></span>
                    <span>{{ repo.language }}</span>
                  </span>
                  <span>{{ repo.date }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. OPENED PULL REQUESTS -->
          <div v-if="prGroups.length > 0" class="relative">
            <!-- Timeline Icon -->
            <div class="absolute -left-7 sm:-left-8 top-0 w-6 h-6 rounded-full -translate-x-1/2 bg-neutral-100 dark:bg-neutral-800 border border-black/10 dark:border-white/10 flex items-center justify-center text-neutral-600 dark:text-neutral-400">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16">
                <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.5 5.396l2.323-2.323a.75.75 0 0 1 1.06 1.06L10.56 6.46a.75.75 0 0 1-1.06 0L7.177 4.134a.75.75 0 0 1 1.06-1.06ZM3 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25-5.5a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Zm0-3a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"/>
              </svg>
            </div>

            <!-- Single Section Title -->
            <h5 class="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
              Opened {{ totalPrs }} pull {{ totalPrs === 1 ? 'request' : 'requests' }} in {{ prGroups.length }} {{ prGroups.length === 1 ? 'repository' : 'repositories' }}
            </h5>

            <!-- Groups of PRs per repository -->
            <div class="space-y-5">
              <div v-for="group in prGroups" :key="group.repo" class="space-y-2">
                <!-- Subheader with repo name + open/merged/closed counters -->
                <div class="flex items-center justify-between gap-2 text-xs font-mono">
                  <a
                    :href="'https://github.com/' + group.repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-medium text-blue-600 dark:text-blue-400 hover:underline truncate"
                  >
                    {{ group.repo }}
                  </a>
                  <div class="flex items-center gap-3 shrink-0">
                    <span v-if="group.openCount > 0" class="inline-flex items-center gap-1 text-[11px] text-[#2da44e] dark:text-[#3fb950]">
                      <span class="w-4 h-4 rounded-full bg-[#2da44e] dark:bg-[#3fb950] text-white flex items-center justify-center font-bold text-[10px]">{{ group.openCount }}</span>
                      <span>open</span>
                    </span>
                    <span v-if="group.mergedCount > 0" class="inline-flex items-center gap-1 text-[11px] text-[#8250df] dark:text-[#a371f7]">
                      <span class="w-4 h-4 rounded-full bg-[#8250df] dark:bg-[#a371f7] text-white flex items-center justify-center font-bold text-[10px]">{{ group.mergedCount }}</span>
                      <span>merged</span>
                    </span>
                    <span v-if="group.closedCount > 0" class="inline-flex items-center gap-1 text-[11px] text-[#cf222e] dark:text-[#f85149]">
                      <span class="w-4 h-4 rounded-full bg-[#cf222e] dark:bg-[#f85149] text-white flex items-center justify-center font-bold text-[10px]">{{ group.closedCount }}</span>
                      <span>closed</span>
                    </span>
                  </div>
                </div>

                <!-- List of Pull Requests -->
                <div class="space-y-2 text-xs pl-0.5">
                  <div
                    v-for="pr in group.prs"
                    :key="pr.url"
                    class="flex items-center justify-between gap-3 group/pr"
                  >
                    <div class="flex items-center gap-2 min-w-0">
                      <!-- Open PR Icon (Green) -->
                      <svg
                        v-if="pr.state === 'open'"
                        class="w-3.5 h-3.5 text-[#2da44e] dark:text-[#3fb950] shrink-0 fill-current"
                        viewBox="0 0 16 16"
                        title="Open"
                      >
                        <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.5 5.396l2.323-2.323a.75.75 0 0 1 1.06 1.06L10.56 6.46a.75.75 0 0 1-1.06 0L7.177 4.134a.75.75 0 0 1 1.06-1.06ZM3 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25-5.5a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Zm0-3a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"/>
                      </svg>
                      <!-- Merged PR Icon (Purple) -->
                      <svg
                        v-else-if="pr.state === 'merged'"
                        class="w-3.5 h-3.5 text-[#8250df] dark:text-[#a371f7] shrink-0 fill-current"
                        viewBox="0 0 16 16"
                        title="Merged"
                      >
                        <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM3.5 3.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"/>
                      </svg>
                      <!-- Closed PR Icon (Red) -->
                      <svg
                        v-else
                        class="w-3.5 h-3.5 text-[#cf222e] dark:text-[#f85149] shrink-0 fill-current"
                        viewBox="0 0 16 16"
                        title="Closed"
                      >
                        <path d="M3.25 1.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM2 3.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0ZM3.25 11a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Zm-1.25 1.75a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0ZM2.5 5.5a.75.75 0 0 1 1.5 0v5a.75.75 0 0 1-1.5 0v-5ZM8.72 4.22a.75.75 0 0 1 1.06 0L11 5.44l1.22-1.22a.75.75 0 1 1 1.06 1.06L12.06 6.5l1.22 1.22a.75.75 0 0 1-1.06 1.06L11 7.56l-1.22 1.22a.75.75 0 0 1-1.06-1.06L9.94 6.5 8.72 5.28a.75.75 0 0 1 0-1.06Z"/>
                      </svg>

                      <a
                        :href="pr.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="font-mono text-neutral-800 dark:text-neutral-200 hover:text-blue-500 hover:underline truncate"
                      >
                        {{ pr.title }}
                      </a>
                    </div>
                    <span class="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                      {{ pr.date }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import voxelumAsset from '../assets/voxelum.png';
import prismlinuxAsset from '../assets/prismlinux.png';

// Organization avatars from GitHub with cascade fallbacks
const voxelumLogoUrl = typeof voxelumAsset === 'string' ? voxelumAsset : (voxelumAsset as any)?.src || '/voxelum.png';
const voxelumSources = [
  voxelumLogoUrl,
  '/voxelum.png',
  'https://avatars.githubusercontent.com/Voxelum',
  'https://github.com/Voxelum.png',
];
const voxelumIndex = ref(0);
const voxelumFallback = ref(false);
const voxelumLogo = computed(() => voxelumSources[voxelumIndex.value]);

const handleVoxelumError = () => {
  if (voxelumIndex.value < voxelumSources.length - 1) {
    voxelumIndex.value++;
  } else {
    voxelumFallback.value = true;
  }
};

const prismlinuxLogoUrl = typeof prismlinuxAsset === 'string' ? prismlinuxAsset : (prismlinuxAsset as any)?.src || '/prismlinux.png';
const prismlinuxSources = [
  prismlinuxLogoUrl,
  '/prismlinux.png',
  'https://avatars.githubusercontent.com/Prismlinux',
  'https://prismlinux.org/favicon.ico',
];
const prismlinuxIndex = ref(0);
const prismlinuxFallback = ref(false);
const prismlinuxLogo = computed(() => prismlinuxSources[prismlinuxIndex.value]);

const handlePrismlinuxError = () => {
  if (prismlinuxIndex.value < prismlinuxSources.length - 1) {
    prismlinuxIndex.value++;
  } else {
    prismlinuxFallback.value = true;
  }
};

interface CommitRepo {
  name: string;
  commits: number;
  percentage: number;
}

interface CreatedRepo {
  name: string;
  language: string;
  languageColor: string;
  date: string;
}

interface PullRequestItem {
  title: string;
  url: string;
  state: 'open' | 'merged' | 'closed';
  date: string;
}

interface PrGroup {
  repo: string;
  openCount: number;
  mergedCount: number;
  closedCount: number;
  prs: PullRequestItem[];
}

// Current month label (e.g., "September 2026")
const monthLabel = ref('September 2026');

// Defaults matching user's exact current activity
const defaultCommitRepos: CommitRepo[] = [
  { name: 'BANSAFAn/i18n-zed', commits: 4, percentage: 100 },
  { name: 'Voxelum/x-minecraft-launcher', commits: 2, percentage: 50 },
  { name: 'BANSAFAn/timiGS-', commits: 1, percentage: 25 },
];

const defaultCreatedRepos: CreatedRepo[] = [
  {
    name: 'BANSAFAn/i18n-zed',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    date: 'Sep 17',
  },
];

const defaultPrGroups: PrGroup[] = [
  {
    repo: 'Voxelum/x-minecraft-launcher',
    openCount: 6,
    mergedCount: 2,
    closedCount: 0,
    prs: [
      {
        title: 'feat: redesign task manager with item icons, animations, progress details, and full multi-language translations',
        url: 'https://github.com/Voxelum/x-minecraft-launcher/pull/1773',
        state: 'open',
        date: 'Sep 25',
      },
      {
        title: 'fix: fix blueprint selection error and improve 3D preview and textures',
        url: 'https://github.com/Voxelum/x-minecraft-launcher/pull/1770',
        state: 'open',
        date: 'Sep 24',
      },
      {
        title: 'feat: redesign P2P multiplayer login dialog with modern glassmorphism and brand provider styles',
        url: 'https://github.com/Voxelum/x-minecraft-launcher/pull/1768',
        state: 'open',
        date: 'Sep 21',
      },
      {
        title: 'feat: add save progress, advancements tree, and FTB quests viewer',
        url: 'https://github.com/Voxelum/x-minecraft-launcher/pull/1767',
        state: 'open',
        date: 'Sep 20',
      },
      {
        title: 'feat: sync launcher language to minecraft game settings',
        url: 'https://github.com/Voxelum/x-minecraft-launcher/pull/1757',
        state: 'open',
        date: 'Sep 9',
      },
      {
        title: 'feat: enhance help walkthroughs and translations',
        url: 'https://github.com/Voxelum/x-minecraft-launcher/pull/1751',
        state: 'merged',
        date: 'Sep 7',
      },
      {
        title: 'feat: allow customizing, hiding, restoring and reordering cards in focus mode',
        url: 'https://github.com/Voxelum/x-minecraft-launcher/pull/1745',
        state: 'merged',
        date: 'Sep 4',
      },
      {
        title: 'feat: support user IP anonymization and in-launcher report preview with log catalog',
        url: 'https://github.com/Voxelum/x-minecraft-launcher/pull/1744',
        state: 'open',
        date: 'Sep 4',
      },
    ],
  },
  {
    repo: 'Xcube-Studio/Natsurainko.FluentLauncher',
    openCount: 3,
    mergedCount: 0,
    closedCount: 0,
    prs: [
      {
        title: 'feat: add Data Packs and Worlds download support from CurseForge and Modrinth',
        url: 'https://github.com/Xcube-Studio/Natsurainko.FluentLauncher/pull/397',
        state: 'open',
        date: 'Sep 24',
      },
      {
        title: 'feat: add instance resource management for shaders, resourcepacks, saves, and updates with dependency installer',
        url: 'https://github.com/Xcube-Studio/Natsurainko.FluentLauncher/pull/396',
        state: 'open',
        date: 'Sep 24',
      },
      {
        title: 'feat: expand localization to 12 languages and add RTL layout support for Arabic',
        url: 'https://github.com/Xcube-Studio/Natsurainko.FluentLauncher/pull/395',
        state: 'open',
        date: 'Sep 23',
      },
    ],
  },
  {
    repo: 'Xcube-Studio/FluentLauncher.Infra.Localization',
    openCount: 1,
    mergedCount: 0,
    closedCount: 0,
    prs: [
      {
        title: 'feat(i18n): expand localization to 12 languages and improve existing translations',
        url: 'https://github.com/Xcube-Studio/FluentLauncher.Infra.Localization/pull/25',
        state: 'open',
        date: 'Sep 23',
      },
    ],
  },
];

const commitRepos = ref<CommitRepo[]>(defaultCommitRepos);
const createdRepos = ref<CreatedRepo[]>(defaultCreatedRepos);
const prGroups = ref<PrGroup[]>(defaultPrGroups);

const totalCommits = computed(() =>
  commitRepos.value.reduce((sum, r) => sum + r.commits, 0)
);

const totalPrs = computed(() =>
  prGroups.value.reduce((sum, g) => sum + g.prs.length, 0)
);

// Format month label from current date
const updateMonthLabel = () => {
  try {
    const now = new Date();
    monthLabel.value = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(now);
  } catch (e) {
    monthLabel.value = 'September 2026';
  }
};

const formatShortDate = (isoStr: string) => {
  try {
    const d = new Date(isoStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}`;
  } catch (e) {
    return 'Sep';
  }
};

// Dynamic fetcher & parser for the last month
const fetchActivity = async () => {
  const CACHE_KEY = 'bansafan_gh_timeline_cache_v7';
  const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < 30 * 60 * 1000) {
        if (parsed.commitRepos?.length) commitRepos.value = parsed.commitRepos;
        if (parsed.createdRepos?.length) createdRepos.value = parsed.createdRepos;
        if (parsed.prGroups?.length) prGroups.value = parsed.prGroups;
        return;
      }
    }
  } catch (e) {}

  // 1. Fetch Events API for Commits & Created Repositories
  try {
    const res = await fetch('https://api.github.com/users/BANSAFAn/events');
    if (res.ok) {
      const events: any[] = await res.json();
      if (Array.isArray(events) && events.length > 0) {
        const recentEvents = events.filter((ev) => {
          const time = new Date(ev.created_at).getTime();
          return time >= oneMonthAgo;
        });

        if (recentEvents.length > 0) {
          // Commits per repo
          const repoCommitsMap = new Map<string, number>();
          for (const ev of recentEvents) {
            if (ev.type === 'PushEvent' && ev.repo?.name) {
              const count = ev.payload?.commits?.length || ev.payload?.size || 1;
              repoCommitsMap.set(ev.repo.name, (repoCommitsMap.get(ev.repo.name) || 0) + count);
            }
          }

          if (repoCommitsMap.size > 0) {
            const sorted = Array.from(repoCommitsMap.entries()).sort((a, b) => b[1] - a[1]);
            const maxCount = sorted[0][1] || 1;
            commitRepos.value = sorted.map(([name, commits]) => ({
              name,
              commits,
              percentage: Math.round((commits / maxCount) * 100),
            }));
          }

          // Created repos
          const parsedCreated: CreatedRepo[] = [];
          for (const ev of recentEvents) {
            if (ev.type === 'CreateEvent' && ev.payload?.ref_type === 'repository' && ev.repo?.name) {
              parsedCreated.push({
                name: ev.repo.name,
                language: 'JavaScript',
                languageColor: '#f1e05a',
                date: formatShortDate(ev.created_at),
              });
            }
          }
          if (parsedCreated.length > 0) {
            createdRepos.value = parsedCreated;
          }
        }
      }
    }
  } catch (err) {}

  // 2. Fetch Search Issues API for authentic PR titles, states (open, merged, closed) & dates
  try {
    const prRes = await fetch(
      'https://api.github.com/search/issues?q=author:BANSAFAn+type:pr&sort=created&order=desc&per_page=30'
    );
    if (prRes.ok) {
      const searchData: any = await prRes.json();
      const items: any[] = searchData.items || [];
      const recentPrs = items.filter((item) => {
        const time = new Date(item.created_at).getTime();
        return time >= oneMonthAgo;
      });

      if (recentPrs.length > 0) {
        const repoPrMap = new Map<string, PullRequestItem[]>();
        for (const item of recentPrs) {
          const repo = item.repository_url.replace('https://api.github.com/repos/', '');
          const state: 'open' | 'merged' | 'closed' = item.pull_request?.merged_at
            ? 'merged'
            : item.state === 'open'
            ? 'open'
            : 'closed';

          const list = repoPrMap.get(repo) || [];
          list.push({
            title: item.title,
            url: item.html_url,
            state,
            date: formatShortDate(item.created_at),
          });
          repoPrMap.set(repo, list);
        }

        if (repoPrMap.size > 0) {
          prGroups.value = Array.from(repoPrMap.entries()).map(([repo, prs]) => ({
            repo,
            openCount: prs.filter((p) => p.state === 'open').length,
            mergedCount: prs.filter((p) => p.state === 'merged').length,
            closedCount: prs.filter((p) => p.state === 'closed').length,
            prs,
          }));
        }
      }
    }
  } catch (err) {}

  // 3. Cache activity
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        commitRepos: commitRepos.value,
        createdRepos: createdRepos.value,
        prGroups: prGroups.value,
        timestamp: Date.now(),
      })
    );
  } catch (e) {}
};

onMounted(() => {
  updateMonthLabel();
  fetchActivity();
});
</script>
