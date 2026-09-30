<template>
  <div class="space-y-6">
    <!-- TWO SUPPORT CHANNELS: MONOBANK + YOUTUBE SPONSORSHIP -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- ======================================================== -->
      <!-- CARD 1: ТУТ МОНО, КИНЬ ГРОШЕЙ БУДЬ_ЛАСКА НА ДРОНИ                                    -->
      <!-- ======================================================== -->
      <div
        class="apple-card p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden group"
        @mousemove="handleMonoMouseMove"
        @mouseleave="handleMonoMouseLeave"
      >
        <!-- Dynamic Specular Hover Light -->
        <div
          class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
          :style="{
            background: `radial-gradient(550px circle at ${monoMouseX}px ${monoMouseY}px, rgba(0, 113, 227, 0.12), transparent 80%)`
          }"
        ></div>

        <div>
          <!-- Top Bar -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <!-- Monobank Emblem -->
              <div
                class="w-11 h-11 rounded-2xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-bold text-sm shadow-apple-md transition-transform duration-300 group-hover:scale-105"
              >
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
                </svg>
              </div>
              <div>
                <span class="text-[11px] font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                  {{ t('support.tagWallet') }}
                </span>
                <h3 class="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                  {{ t('support.titleMono') }}
                </h3>
              </div>
            </div>

            <span class="apple-pill border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              {{ t('support.badgeDirect') }}
            </span>
          </div>

          <p class="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-6 font-normal">
            {{ t('support.descMono') }}
          </p>

          <!-- Virtual Card -->
          <div
            class="relative p-6 rounded-2xl bg-gradient-to-br from-[#1d1d1f] via-[#242426] to-[#121214] text-white border border-white/[0.14] shadow-[0_20px_40px_rgba(0,0,0,0.35)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] mb-6"
          >
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none"></div>
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>

            <div class="relative z-10 flex flex-col justify-between min-h-[120px]">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono tracking-widest uppercase text-neutral-400">{{ t('support.monoCardLabel') }}</span>
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/10 text-neutral-200 border border-white/10">
                  UAH ₴
                </span>
              </div>

              <div class="my-3">
                <div class="text-[11px] font-mono text-neutral-400">{{ t('support.monoCardLink') }}</div>
                <div class="text-xs sm:text-sm font-mono font-medium text-white tracking-tight break-all">
                  {{ jarUrlClean }}
                </div>
              </div>

              <div class="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-neutral-400">
                <span>{{ t('support.monoCardOwner') }}</span>
                <span class="text-blue-300 font-mono">{{ t('support.monoCardVerified') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap items-center gap-3">
          <a
            :href="jarUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="apple-btn-primary flex-1 sm:flex-initial"
          >
            <span>{{ t('support.btnDonateMono') }}</span>
            <svg class="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>

          <button
            type="button"
            @click="copyJarLink"
            class="apple-btn-secondary px-5 py-3 cursor-pointer"
            :title="copied ? t('support.btnCopied') : t('support.btnCopyLink')"
          >
            <svg v-if="copied" class="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <svg v-else class="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
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
        class="apple-card p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden group"
        @mousemove="handleYtMouseMove"
        @mouseleave="handleYtMouseLeave"
      >
        <!-- Dynamic Red/Gold Ambient Light -->
        <div
          class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
          :style="{
            background: `radial-gradient(550px circle at ${ytMouseX}px ${ytMouseY}px, rgba(239, 68, 68, 0.14), transparent 80%)`
          }"
        ></div>

        <div>
          <!-- Top Bar -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <!-- YouTube Emblem -->
              <div
                class="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center font-bold text-sm shadow-apple-md transition-transform duration-300 group-hover:scale-105"
              >
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div>
                <span class="text-[11px] font-semibold tracking-wider uppercase text-red-600 dark:text-red-400">
                  {{ t('support.tagYt') }}
                </span>
                <h3 class="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                  {{ t('support.titleYt') }}
                </h3>
              </div>
            </div>

            <span class="apple-pill border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400">
              {{ t('support.badgeYt') }}
            </span>
          </div>

          <p class="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-6 font-normal">
            {{ t('support.descYt') }}
          </p>

          <!-- Virtual Creator Pass Card -->
          <div
            class="relative p-6 rounded-2xl bg-gradient-to-br from-[#1a1112] via-[#241718] to-[#141212] text-white border border-red-500/20 shadow-[0_20px_40px_rgba(239,68,68,0.15)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_25px_50px_rgba(239,68,68,0.25)] mb-6"
          >
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.2),transparent_70%)] pointer-events-none"></div>
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>

            <div class="relative z-10 flex flex-col justify-between min-h-[120px]">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono tracking-widest uppercase text-neutral-300">{{ t('support.ytCardLabel') }}</span>
                  <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                </div>
                <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/30">
                  VIP Perks
                </span>
              </div>

              <div class="my-3">
                <div class="text-[11px] font-mono text-neutral-400">youtube.com/@Baneronetwo/join</div>
                <div class="text-xs sm:text-sm font-semibold text-white tracking-tight mt-0.5">
                  {{ t('support.ytCardTier') }}
                </div>
              </div>

              <div class="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-neutral-400">
                <span>{{ t('support.ytCardOwner') }}</span>
                <span class="text-amber-400 font-mono flex items-center gap-1">
                  <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span>{{ t('support.ytCardVerified') }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap items-center gap-3">
          <!-- Main Join Button -->
          <a
            :href="youtubeJoinUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-apple-sm transition-all duration-300 active:scale-95 flex-1 sm:flex-initial"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{{ t('support.btnJoinYt') }}</span>
            <svg class="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>

          <!-- Channel Link -->
          <a
            :href="youtubeChannelUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="apple-btn-secondary px-5 py-3 cursor-pointer"
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

// Monobank specular coords
const monoMouseX = ref(0);
const monoMouseY = ref(0);

const handleMonoMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  monoMouseX.value = e.clientX - rect.left;
  monoMouseY.value = e.clientY - rect.top;
};

const handleMonoMouseLeave = () => {
  monoMouseX.value = -999;
  monoMouseY.value = -999;
};

// YouTube specular coords
const ytMouseX = ref(0);
const ytMouseY = ref(0);

const handleYtMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  ytMouseX.value = e.clientX - rect.left;
  ytMouseY.value = e.clientY - rect.top;
};

const handleYtMouseLeave = () => {
  ytMouseX.value = -999;
  ytMouseY.value = -999;
};

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
