<template>
  <div class="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 pb-24">
    <!-- TAB CONTENT WITH APPLE FLUID TRANSITION (CONTROLLED VIA NAVBAR) -->
    <Transition name="apple-tab" mode="out-in">

      <!-- ААААААААААААААААААА СЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕНПАЙ -->
      <div v-if="activeTab === 'profile'" key="profile" class="space-y-12 pt-4 sm:pt-8">
        <!-- Hero Header -->
        <div class="flex flex-col items-center text-center max-w-4xl mx-auto">
          <!-- Top Apple Status Pill Badges -->
          <div class="flex flex-wrap items-center justify-center gap-2 mb-6">
            <div class="apple-pill">
              <svg class="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{{ t('hero.badgeLocation') }}</span>
            </div>
            <div class="apple-pill">
              <svg class="w-3.5 h-3.5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span>{{ t('hero.badgeRole') }}</span>
            </div>
            <div class="apple-pill">
              <svg class="w-3.5 h-3.5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>{{ t('hero.badgeI18n') }}</span>
            </div>
          </div>

          <!-- Apple Keynote Headline -->
          <h1 class="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.08] mb-5">
            {{ t('hero.headlineMain') }}
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
              {{ t('hero.headlineGradient') }}
            </span>
          </h1>

          <!-- Apple Subtitle -->
          <p class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl font-normal leading-relaxed mb-8">
            {{ t('hero.subtitle') }}
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center justify-center gap-3.5 w-full max-w-md mb-8">
            <button
              type="button"
              @click="setTab('support')"
              class="apple-btn-primary w-full sm:w-auto"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              <span>{{ t('hero.btnMonobank') }}</span>
              <svg class="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>

            <button
              type="button"
              @click="setTab('media')"
              class="apple-btn-secondary w-full sm:w-auto"
            >
              <svg class="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>{{ t('hero.btnYouTube') }}</span>
              <svg class="w-3.5 h-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mac Studio Code Window -->
        <MacStudioWindow />

        <!-- Philosophy & Bio Card -->
        <div class="apple-card p-7 sm:p-10 relative overflow-hidden group">
          <div class="absolute -right-20 -top-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div class="max-w-2xl">
              <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shadow-apple-sm">
                  <svg class="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div>
                  <span class="text-[11px] font-semibold tracking-wider uppercase text-neutral-400">{{ t('bio.sectionTag') }}</span>
                  <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    {{ t('bio.title') }}
                  </h2>
                </div>
              </div>

              <div class="space-y-4 text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  {{ t('bio.p1') }}
                </p>
                <p>
                  {{ t('bio.p2') }}
                </p>
              </div>
            </div>

            <!-- Apple-grade Spec Badges Column -->
            <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5 w-full lg:w-72 shrink-0">
              <div class="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                <div>
                  <span class="text-[11px] font-mono text-neutral-400 block mb-0.5">{{ t('bio.badgeFocusLabel') }}</span>
                  <span class="text-sm font-semibold text-neutral-900 dark:text-white">{{ t('bio.badgeFocusVal') }}</span>
                </div>
                <span class="text-xs font-mono text-blue-500 font-medium">{{ t('bio.badgeFocusSub') }}</span>
              </div>

              <div class="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                <div>
                  <span class="text-[11px] font-mono text-neutral-400 block mb-0.5">{{ t('bio.badgeSystemsLabel') }}</span>
                  <span class="text-sm font-semibold text-neutral-900 dark:text-white">{{ t('bio.badgeSystemsVal') }}</span>
                </div>
                <span class="text-xs font-mono text-indigo-500 font-medium">{{ t('bio.badgeSystemsSub') }}</span>
              </div>

              <div class="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                <div>
                  <span class="text-[11px] font-mono text-neutral-400 block mb-0.5">{{ t('bio.badgeCommLabel') }}</span>
                  <span class="text-sm font-semibold text-neutral-900 dark:text-white">{{ t('bio.badgeCommVal') }}</span>
                </div>
                <span class="text-xs font-mono text-emerald-500 font-medium">{{ t('bio.badgeCommSub') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. TAB: TECH & GITHUB ECOSYSTEM -->
      <div v-else-if="activeTab === 'tech'" key="tech" class="space-y-8 pt-4 sm:pt-6">
        <TechMatrix />
      </div>

      <!-- 3. TAB: LOCALIZATION LAB -->
      <div v-else-if="activeTab === 'i18n'" key="i18n" class="space-y-8 pt-4 sm:pt-6">
        <LocalizationLab />
      </div>

      <!-- 4. TAB: MEDIA & COMMUNITIES -->
      <div v-else-if="activeTab === 'media'" key="media" class="space-y-8 pt-4 sm:pt-6">
        <YouTubeShowcase />

        <!-- Communities Grid (Discord, Reddit) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Discord -->
          <a
            href="https://rebrand.ly/liveone"
            target="_blank"
            rel="noopener noreferrer"
            class="apple-card p-5 flex items-center justify-between hover:border-[#5865F2]/40 transition-all duration-300 group/comm"
          >
            <div class="flex items-center gap-3.5">
              <div class="w-11 h-11 rounded-2xl bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center font-bold shadow-apple-sm transition-transform group-hover/comm:scale-105">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-neutral-900 dark:text-white">Discord • Liveone</h4>
                <p class="text-xs text-neutral-500 dark:text-neutral-400">Спільний хаб для дискусій</p>
              </div>
            </div>
            <svg class="w-4 h-4 text-neutral-400 group-hover/comm:text-[#5865F2] group-hover/comm:translate-x-0.5 group-hover/comm:-translate-y-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>

          <!-- Reddit -->
          <a
            href="https://www.reddit.com/user/Banerbansa/"
            target="_blank"
            rel="noopener noreferrer"
            class="apple-card p-5 flex items-center justify-between hover:border-[#FF4500]/40 transition-all duration-300 group/comm"
          >
            <div class="flex items-center gap-3.5">
              <div class="w-11 h-11 rounded-2xl bg-[#FF4500]/10 text-[#FF4500] flex items-center justify-center font-bold shadow-apple-sm transition-transform group-hover/comm:scale-105">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-neutral-900 dark:text-white">Reddit • u/Banerbansa</h4>
                <p class="text-xs text-neutral-500 dark:text-neutral-400">Пости, розробка та спільнота</p>
              </div>
            </div>
            <svg class="w-4 h-4 text-neutral-400 group-hover/comm:text-[#FF4500] group-hover/comm:translate-x-0.5 group-hover/comm:-translate-y-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>

      <!-- 5. TAB: SUPPORT & SPONSOR -->
      <div v-else-if="activeTab === 'support'" key="support" class="space-y-8 pt-4 sm:pt-6">
        <AppleCardSupport />
      </div>

    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import MacStudioWindow from './MacStudioWindow.vue';
import TechMatrix from './TechMatrix.vue';
import LocalizationLab from './LocalizationLab.vue';
import YouTubeShowcase from './YouTubeShowcase.vue';
import AppleCardSupport from './AppleCardSupport.vue';
import { activeTab, setTab, tabsList, isValidTab, type TabId } from '../stores/tabs';
import { t } from '../i18n';

onMounted(() => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace('#', '') as TabId;
    if (isValidTab(hash)) {
      activeTab.value = hash;
    }

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
/* Apple Fluid Tab Transitions */
.apple-tab-enter-active,
.apple-tab-leave-active {
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.apple-tab-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.985);
  filter: blur(8px);
}

.apple-tab-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.985);
  filter: blur(6px);
}
</style>
