<template>
  <div class="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 pb-24">
    <!-- FOLIO METADATA STRIP (CLEAN TECHNICAL HEADER) -->
    <div class="pt-2 sm:pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 border-b-2 border-slate-900/10 dark:border-slate-800 pb-3">
      <div class="flex items-center gap-2">
        <span class="inline-block w-2.5 h-2.5 rounded-none bg-blue-600 animate-pulse"></span>
        <span class="font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider">BANSAFAn // FOLIO 2026</span>
        <span class="text-slate-400 dark:text-slate-600">/</span>
        <span class="uppercase">CUBIC TECHNICAL DOSSIER</span>
      </div>

      <div class="flex items-center gap-3">
        <span class="hidden md:inline px-2 py-0.5 rounded-none bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30 uppercase tracking-wider">
          🇺🇦 UKRAINE / OPEN SOURCE
        </span>
        <span class="font-mono text-xs font-bold text-slate-900 dark:text-slate-100 uppercase">
          [ SHEET {{ activeTabNumber }} / 06 ]
        </span>
      </div>
    </div>

    <!-- TAB CONTENT WITH BUTTERY-SMOOTH SPRING TRANSITIONS -->
    <Transition name="page-sheet" mode="out-in">

      <!-- ======================================================== -->
      <!-- ААААААААААААААААААА СЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕНПАЙ -->
      <!-- ======================================================== -->
      <!-- 01. SHEET: CREATOR PASSPORT & STUDIO                     -->
      <!-- ======================================================== -->
      <div v-if="activeTab === 'profile'" key="profile" class="space-y-10 pt-2">
        <!-- Hero Identity Passport Card (Cubic Box Style) -->
        <div class="paper-card p-6 sm:p-10 relative overflow-hidden animate-sheet-stagger-1 border-2 border-slate-900 dark:border-slate-700 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-[8px_8px_0px_0px_rgba(37,99,235,0.25)] dark:hover:shadow-[8px_8px_0px_0px_rgba(59,130,246,0.25)] transition-all duration-300">
          <!-- Subtle technical corner marks -->
          <div class="absolute top-2.5 left-2.5 text-[10px] font-mono text-slate-400 dark:text-slate-600 select-none pointer-events-none uppercase font-bold">[ 01 / PASSPORT ]</div>
          <div class="absolute top-2.5 right-2.5 text-[10px] font-mono text-slate-400 dark:text-slate-600 select-none pointer-events-none uppercase font-bold">[ STATUS: ONLINE ]</div>

          <div class="flex flex-col lg:flex-row items-start gap-8 sm:gap-10 mt-3">
            <!-- Left: Avatar with square cubic frame -->
            <div class="flex flex-col items-center sm:items-start shrink-0 mx-auto lg:mx-0">
              <div class="relative group">
                <!-- Square photo frame -->
                <div class="w-32 h-32 sm:w-40 sm:h-40 rounded-none p-1 bg-slate-100 dark:bg-slate-800 border-2 border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                  <img
                    v-if="!avatarFallback"
                    :src="avatarSrc"
                    alt="Volodymyr Shamin (Baneronetwo)"
                    class="w-full h-full object-cover rounded-none"
                    loading="eager"
                    @error="handleAvatarError"
                  />
                  <div
                    v-else
                    class="w-full h-full rounded-none bg-slate-900 text-white flex items-center justify-center font-black text-3xl"
                  >
                    B
                  </div>
                </div>

                <!-- Online Status Stamp Badge (Cubic Box) -->
                <div class="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-none bg-emerald-500 text-white text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border border-slate-900 uppercase">
                  <span class="w-2 h-2 rounded-none bg-white animate-pulse"></span>
                  <span>OPEN FOR DEV</span>
                </div>
              </div>

              <!-- Quick ID Handle Tag -->
              <div class="mt-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                <span class="text-sm font-black text-slate-900 dark:text-slate-100 font-mono tracking-wider">@BANSAFAn</span>
                <span class="text-[11px] text-slate-500 dark:text-slate-400 font-mono uppercase">Volodymyr Shamin</span>
              </div>
            </div>

            <!-- Right: Identity Details & Hero Content -->
            <div class="flex-1 text-left space-y-4">
              <!-- Top Cubic Paper Pills -->
              <div class="flex flex-wrap items-center gap-2">
                <span class="paper-pill">
                  <svg class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{{ t('hero.badgeLocation') }}</span>
                </span>
                <span class="paper-pill">
                  <svg class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  <span>{{ t('hero.badgeRole') }}</span>
                </span>
                <span class="paper-pill">
                  <svg class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>{{ t('hero.badgeI18n') }}</span>
                </span>
                <!-- Clickable Certificate Badge -->
                <button
                  type="button"
                  @click="setTab('cert')"
                  class="paper-pill hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer transition-colors"
                >
                  <svg class="w-3.5 h-3.5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                  <span>3 Сертифікати Linux Foundation →</span>
                </button>
              </div>

              <!-- Bold Geometric Headline -->
              <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                {{ t('hero.headlineMain') }}
                <span class="block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300 bg-clip-text text-transparent mt-1 font-black">
                  {{ t('hero.headlineGradient') }}
                </span>
              </h1>

              <!-- Bio Subtitle -->
              <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-3xl">
                {{ t('hero.subtitle') }}
              </p>

              <!-- Cubic Action Buttons Row -->
              <div class="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  @click="setTab('support')"
                  class="paper-btn-primary"
                >
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <rect x="2" y="5" width="20" height="14" rx="0" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                  <span>{{ t('hero.btnMonobank') }}</span>
                  <svg class="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </button>

                <button
                  type="button"
                  @click="setTab('media')"
                  class="paper-btn-secondary"
                >
                  <svg class="w-4 h-4 text-red-600 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>{{ t('hero.btnYouTube') }}</span>
                  <svg class="w-3.5 h-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 17L17 7H7M17 7V17" />
                  </svg>
                </button>

                <a
                  href="https://github.com/BANSAFAn"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="paper-btn-secondary px-3.5"
                  title="GitHub @BANSAFAn"
                >
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  <span class="text-xs font-mono">@BANSAFAn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Audio Voice Player Note (Cubic) -->
        <div class="animate-sheet-stagger-2">
          <AppleVoicePlayer />
        </div>

        <!-- Blueprint Code Sheet Notebook (Cubic) -->
        <div class="animate-sheet-stagger-3">
          <MacStudioWindow />
        </div>

        <!-- Philosophy & Bio Card (Cubic) -->
        <div class="paper-card p-6 sm:p-10 relative overflow-hidden animate-sheet-stagger-4 border-2 border-slate-900 dark:border-slate-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.06)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
          <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div class="max-w-2xl text-left">
              <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-none bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border border-slate-900">
                  <svg class="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div>
                  <span class="text-[11px] font-mono tracking-wider uppercase text-blue-600 dark:text-blue-400 font-bold">{{ t('bio.sectionTag') }}</span>
                  <h2 class="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">
                    {{ t('bio.title') }}
                  </h2>
                </div>
              </div>

              <div class="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                <p>{{ t('bio.p1') }}</p>
                <p>{{ t('bio.p2') }}</p>
              </div>
            </div>

            <!-- Technical Spec Badges Column (Cubic) -->
            <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 w-full lg:w-72 shrink-0">
              <div class="p-4 rounded-none bg-slate-50 dark:bg-slate-800/40 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                <div>
                  <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-0.5 uppercase">{{ t('bio.badgeFocusLabel') }}</span>
                  <span class="text-sm font-black text-slate-900 dark:text-slate-100 uppercase">{{ t('bio.badgeFocusVal') }}</span>
                </div>
                <span class="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase">{{ t('bio.badgeFocusSub') }}</span>
              </div>

              <div class="p-4 rounded-none bg-slate-50 dark:bg-slate-800/40 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                <div>
                  <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-0.5 uppercase">{{ t('bio.badgeSystemsLabel') }}</span>
                  <span class="text-sm font-black text-slate-900 dark:text-slate-100 uppercase">{{ t('bio.badgeSystemsVal') }}</span>
                </div>
                <span class="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase">{{ t('bio.badgeSystemsSub') }}</span>
              </div>

              <div class="p-4 rounded-none bg-slate-50 dark:bg-slate-800/40 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                <div>
                  <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-0.5 uppercase">{{ t('bio.badgeCommLabel') }}</span>
                  <span class="text-sm font-black text-slate-900 dark:text-slate-100 uppercase">{{ t('bio.badgeCommVal') }}</span>
                </div>
                <span class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">{{ t('bio.badgeCommSub') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Sheet Pagination Link (Cubic) -->
        <div class="pt-4 flex justify-end">
          <button
            type="button"
            @click="setTab('tech')"
            class="paper-btn-secondary group flex items-center gap-2 text-xs font-mono"
          >
            <span>Наступний лист: 02 // Екосистема та GitHub</span>
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 02. SHEET: TECH & GITHUB ECOSYSTEM                       -->
      <!-- ======================================================== -->
      <div v-else-if="activeTab === 'tech'" key="tech" class="space-y-8 pt-2">
        <div class="animate-sheet-stagger-1">
          <TechMatrix />
        </div>

        <!-- Sheet Pagination Links -->
        <div class="pt-4 flex items-center justify-between">
          <button
            type="button"
            @click="setTab('profile')"
            class="paper-btn-secondary group flex items-center gap-2 text-xs font-mono"
          >
            <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>← 01 // Профіль</span>
          </button>

          <button
            type="button"
            @click="setTab('cert')"
            class="paper-btn-secondary group flex items-center gap-2 text-xs font-mono"
          >
            <span>03 // Сертифікати →</span>
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 03. SHEET: VERIFIED CERTIFICATES & CREDENTIALS           -->
      <!-- ======================================================== -->
      <div v-else-if="activeTab === 'cert'" key="cert" class="space-y-8 pt-2">
        <div class="animate-sheet-stagger-1">
          <CertificatesGallery />
        </div>

        <!-- Sheet Pagination Links -->
        <div class="pt-4 flex items-center justify-between">
          <button
            type="button"
            @click="setTab('tech')"
            class="paper-btn-secondary group flex items-center gap-2 text-xs font-mono"
          >
            <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>← 02 // Екосистема</span>
          </button>

          <button
            type="button"
            @click="setTab('i18n')"
            class="paper-btn-secondary group flex items-center gap-2 text-xs font-mono"
          >
            <span>04 // Локалізація (i18n) →</span>
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 04. SHEET: LOCALIZATION LAB                              -->
      <!-- ======================================================== -->
      <div v-else-if="activeTab === 'i18n'" key="i18n" class="space-y-8 pt-2">
        <div class="animate-sheet-stagger-1">
          <LocalizationLab />
        </div>

        <!-- Sheet Pagination Links -->
        <div class="pt-4 flex items-center justify-between">
          <button
            type="button"
            @click="setTab('cert')"
            class="paper-btn-secondary group flex items-center gap-2 text-xs font-mono"
          >
            <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>← 03 // Сертифікати</span>
          </button>

          <button
            type="button"
            @click="setTab('media')"
            class="paper-btn-secondary group flex items-center gap-2 text-xs font-mono"
          >
            <span>05 // Медіа & YouTube →</span>
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 05. SHEET: MEDIA & COMMUNITIES                           -->
      <!-- ======================================================== -->
      <div v-else-if="activeTab === 'media'" key="media" class="space-y-8 pt-2">
        <div class="animate-sheet-stagger-1">
          <YouTubeShowcase />
        </div>

        <!-- Communities Grid (Discord, Reddit) Cubic -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-sheet-stagger-2">
          <!-- Discord -->
          <a
            href="https://rebrand.ly/liveone"
            target="_blank"
            rel="noopener noreferrer"
            class="paper-card p-5 flex items-center justify-between hover:border-[#5865F2] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(88,101,242,0.4)] dark:hover:shadow-[6px_6px_0px_0px_rgba(88,101,242,0.4)] transition-all duration-200 group/comm border-2 border-slate-900 dark:border-slate-700 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.8)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]"
          >
            <div class="flex items-center gap-3.5">
              <div class="w-11 h-11 rounded-none bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] border border-[#5865F2]/40 transition-transform group-hover/comm:scale-105">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <div class="text-left">
                <h4 class="text-sm font-black text-slate-900 dark:text-slate-100 uppercase">Discord • Liveone</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400">Спільний хаб для дискусій</p>
              </div>
            </div>
            <svg class="w-4 h-4 text-slate-400 group-hover/comm:text-[#5865F2] group-hover/comm:translate-x-0.5 group-hover/comm:-translate-y-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7H7M17 7V17" />
            </svg>
          </a>

          <!-- Reddit -->
          <a
            href="https://www.reddit.com/user/Banerbansa/"
            target="_blank"
            rel="noopener noreferrer"
            class="paper-card p-5 flex items-center justify-between hover:border-[#FF4500] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(255,69,0,0.4)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,69,0,0.4)] transition-all duration-200 group/comm border-2 border-slate-900 dark:border-slate-700 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.8)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]"
          >
            <div class="flex items-center gap-3.5">
              <div class="w-11 h-11 rounded-none bg-[#FF4500]/10 text-[#FF4500] flex items-center justify-center font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] border border-[#FF4500]/40 transition-transform group-hover/comm:scale-105">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
              </div>
              <div class="text-left">
                <h4 class="text-sm font-black text-slate-900 dark:text-slate-100 uppercase">Reddit • u/Banerbansa</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400">Пости, розробка та спільнота</p>
              </div>
            </div>
            <svg class="w-4 h-4 text-slate-400 group-hover/comm:text-[#FF4500] group-hover/comm:translate-x-0.5 group-hover/comm:-translate-y-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7H7M17 7V17" />
            </svg>
          </a>
        </div>

        <!-- Sheet Pagination Links -->
        <div class="pt-4 flex items-center justify-between">
          <button
            type="button"
            @click="setTab('i18n')"
            class="paper-btn-secondary group flex items-center gap-2 text-xs font-mono"
          >
            <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>← 04 // Локалізація</span>
          </button>

          <button
            type="button"
            @click="setTab('support')"
            class="paper-btn-secondary group flex items-center gap-2 text-xs font-mono"
          >
            <span>06 // Підтримка & Банка →</span>
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 06. SHEET: SUPPORT & SPONSOR                             -->
      <!-- ======================================================== -->
      <div v-else-if="activeTab === 'support'" key="support" class="space-y-8 pt-2">
        <div class="animate-sheet-stagger-1">
          <AppleCardSupport />
        </div>

        <!-- Sheet Pagination Links -->
        <div class="pt-4 flex items-center justify-between">
          <button
            type="button"
            @click="setTab('media')"
            class="paper-btn-secondary group flex items-center gap-2 text-xs font-mono"
          >
            <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>← 05 // Медіа & YouTube</span>
          </button>

          <button
            type="button"
            @click="setTab('profile')"
            class="paper-btn-secondary group flex items-center gap-2 text-xs font-mono"
          >
            <span>Повернутися до Профілю (01) ↺</span>
          </button>
        </div>
      </div>

    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import MacStudioWindow from './MacStudioWindow.vue';
import TechMatrix from './TechMatrix.vue';
import CertificatesGallery from './CertificatesGallery.vue';
import LocalizationLab from './LocalizationLab.vue';
import YouTubeShowcase from './YouTubeShowcase.vue';
import AppleCardSupport from './AppleCardSupport.vue';
import AppleVoicePlayer from './AppleVoicePlayer.vue';
import localAvatar from '../assets/avatar.png';
import { activeTab, setTab, tabsList, isValidTab, type TabId } from '../stores/tabs';
import { t, initClientLocale } from '../i18n';

const localAvatarUrl = typeof localAvatar === 'string' ? localAvatar : (localAvatar as any)?.src || '/avatar.png';

const avatarSources = [
  localAvatarUrl,
  '/avatar.png',
  'https://avatars.githubusercontent.com/BANSAFAn',
  'https://github.com/BANSAFAn.png',
];
const currentAvatarIndex = ref(0);
const avatarFallback = ref(false);
const avatarSrc = computed(() => avatarSources[currentAvatarIndex.value]);

const handleAvatarError = () => {
  if (currentAvatarIndex.value < avatarSources.length - 1) {
    currentAvatarIndex.value++;
  } else {
    avatarFallback.value = true;
  }
};

const activeTabNumber = computed(() => {
  const index = tabsList.value.findIndex(tab => tab.id === activeTab.value);
  return index !== -1 ? `0${index + 1}` : '01';
});

onMounted(() => {
  if (typeof window !== 'undefined') {
    nextTick(() => {
      initClientLocale();

      const hash = window.location.hash.replace('#', '') as TabId;
      if (isValidTab(hash)) {
        activeTab.value = hash;
      }
    });

    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace('#', '') as TabId;
      if (isValidTab(h)) {
        activeTab.value = h;
      }
    });
  }
});
</script>

<style>
/* Page Sheet Spring Entrance Animation */
.page-sheet-enter-active {
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-sheet-leave-active {
  transition: opacity 0.15s cubic-bezier(0.4, 0, 1, 1),
              transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.page-sheet-enter-from {
  opacity: 0;
  transform: translateY(24px);
}

.page-sheet-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* Cascading Staggered Entrance Animations */
@keyframes sheetCascade {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-sheet-stagger-1 {
  animation: sheetCascade 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.02s;
}

.animate-sheet-stagger-2 {
  animation: sheetCascade 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.08s;
}

.animate-sheet-stagger-3 {
  animation: sheetCascade 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.14s;
}

.animate-sheet-stagger-4 {
  animation: sheetCascade 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.2s;
}
</style>
