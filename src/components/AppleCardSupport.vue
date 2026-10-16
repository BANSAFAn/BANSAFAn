<template>
  <div class="space-y-6">
    <!-- TWO MAIN SUPPORT CHANNELS: MONOBANK + YOUTUBE SPONSORSHIP -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- ======================================================== -->
      <!-- CARD 1: ТУТ МОНО, КИНЬ ГРОШЕЙ БУДЬ_ЛАСКА НА ДРОНИ                                    -->
      <!-- ======================================================== -->
      <div
        class="paper-card p-6 sm:p-8 flex flex-col justify-between relative group border-2 border-slate-900 dark:border-slate-700 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] hover:-translate-y-1 hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-[8px_8px_0px_0px_rgba(37,99,235,0.35)] dark:hover:shadow-[8px_8px_0px_0px_rgba(59,130,246,0.3)] transition-all duration-200"
      >
        <div>
          <!-- Top Bar -->
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-3">
              <!-- Monobank Paper Stamp Icon -->
              <div
                class="w-11 h-11 rounded-none bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border border-slate-900 transition-transform duration-100 group-hover:scale-105"
              >
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
                </svg>
              </div>
              <div>
                <span class="text-[10px] font-mono tracking-wider uppercase text-blue-600 dark:text-blue-400 font-bold">
                  {{ t('support.tagWallet') }}
                </span>
                <h3 class="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">
                  {{ t('support.titleMono') }}
                </h3>
              </div>
            </div>

            <span class="paper-pill border border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
              {{ t('support.badgeDirect') }}
            </span>
          </div>

          <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-normal">
            {{ t('support.descMono') }}
          </p>

          <!-- Technical Receipt / Jar Pass Details (Cubic Perforated Ticket) -->
          <div
            class="relative p-5 rounded-none bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-2 border-dashed border-slate-400 dark:border-slate-700 mb-6 font-mono"
          >
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-300 dark:border-slate-800">
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400">
                  {{ t('support.monoCardLabel') }}
                </span>
                <span class="w-2 h-2 rounded-none bg-emerald-500"></span>
              </div>
              <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-none bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-400 dark:border-slate-600">
                UAH ₴
              </span>
            </div>

            <div class="my-2">
              <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1 uppercase">
                {{ t('support.monoCardLink') }}
              </div>
              <div class="text-xs sm:text-sm font-mono font-bold text-slate-950 dark:text-white break-all">
                {{ jarUrlClean }}
              </div>
            </div>

            <div class="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-300 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              <span>{{ t('support.monoCardOwner') }}</span>
              <span class="text-blue-600 dark:text-blue-400 font-mono font-bold uppercase">{{ t('support.monoCardVerified') }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap items-center gap-3">
          <a
            :href="jarUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="paper-btn-primary flex-1 sm:flex-initial"
          >
            <span>{{ t('support.btnDonateMono') }}</span>
            <svg class="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>

          <button
            type="button"
            @click="copyJarLink"
            class="paper-btn-secondary px-4 py-2.5"
            :title="copied ? t('support.btnCopied') : t('support.btnCopyLink')"
          >
            <svg v-if="copied" class="w-4 h-4 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <svg v-else class="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="0" ry="0" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>{{ copied ? t('support.btnCopied') : t('support.btnCopyLink') }}</span>
          </button>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- CARD 2: YOUTUBE SPONSORSHIP (CREATOR MEMBERSHIP)         -->
      <!-- ======================================================== -->
      <div
        class="paper-card p-6 sm:p-8 flex flex-col justify-between relative group border-2 border-slate-900 dark:border-slate-700 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] hover:-translate-y-1 hover:border-red-600 dark:hover:border-red-500 hover:shadow-[8px_8px_0px_0px_rgba(239,68,68,0.35)] dark:hover:shadow-[8px_8px_0px_0px_rgba(239,68,68,0.3)] transition-all duration-200"
      >
        <div>
          <!-- Top Bar -->
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-3">
              <!-- YouTube Paper Stamp Icon -->
              <div
                class="w-11 h-11 rounded-none bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border border-slate-900 transition-transform duration-100 group-hover:scale-105"
              >
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div>
                <span class="text-[10px] font-mono tracking-wider uppercase text-red-600 dark:text-red-400 font-bold">
                  {{ t('support.tagYt') }}
                </span>
                <h3 class="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">
                  {{ t('support.titleYt') }}
                </h3>
              </div>
            </div>

            <span class="paper-pill border border-red-500 bg-red-500/10 text-red-700 dark:text-red-400 font-bold">
              {{ t('support.badgeYt') }}
            </span>
          </div>

          <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-normal">
            {{ t('support.descYt') }}
          </p>

          <!-- Creator Pass Technical Ticket -->
          <div
            class="relative p-5 rounded-none bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-2 border-dashed border-slate-400 dark:border-slate-700 mb-6 font-mono"
          >
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-300 dark:border-slate-800">
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400">
                  {{ t('support.ytCardLabel') }}
                </span>
                <span class="w-2 h-2 rounded-none bg-red-500"></span>
              </div>
              <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-none bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase">
                VIP Perks
              </span>
            </div>

            <div class="my-2">
              <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">youtube.com/@Baneronetwo/join</div>
              <div class="text-xs sm:text-sm font-mono font-bold text-slate-950 dark:text-white">
                {{ t('support.ytCardTier') }}
              </div>
            </div>

            <div class="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-300 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              <span>{{ t('support.ytCardOwner') }}</span>
              <span class="text-amber-600 dark:text-amber-400 font-mono font-bold flex items-center gap-1 uppercase">
                <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span>{{ t('support.ytCardVerified') }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap items-center gap-3">
          <a
            :href="youtubeJoinUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="paper-btn-primary bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white border-2 border-red-700 dark:border-red-500 shadow-[3px_3px_0px_0px_rgba(185,28,28,0.8)] flex-1 sm:flex-initial"
          >
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{{ t('support.btnJoinYt') }}</span>
            <svg class="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>

          <a
            :href="youtubeChannelUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="paper-btn-secondary px-4 py-2.5"
          >
            <span>{{ t('support.btnVisitChannel') }}</span>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { t } from '../i18n';

// Monobank URL
const jarUrl = 'https://send.monobank.ua/jar/7cQ5hJtFDy';
const jarUrlClean = 'send.monobank.ua/jar/7cQ5hJtFDy';

// YouTube Membership & Channel URLs
const youtubeJoinUrl = 'https://www.youtube.com/@Baneronetwo/join';
const youtubeChannelUrl = 'https://www.youtube.com/@Baneronetwo';

const copied = ref(false);

const copyJarLink = async () => {
  try {
    await navigator.clipboard.writeText(jarUrl);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2500);
  } catch (err) {
    console.error('Failed to copy jar link', err);
  }
};
</script>
