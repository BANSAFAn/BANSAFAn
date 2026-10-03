<template>
  <div class="space-y-6">
    <!-- TWO MAIN SUPPORT CHANNELS: MONOBANK + YOUTUBE SPONSORSHIP -->
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

    <!-- ======================================================== -->
    <!-- CARD 3: КРИПТОГАМАНЕЦЬ (USDT TRC-20 / TRX) - ВЕЛИКИЙ БАНЕР -->
    <!-- ======================================================== -->
    <div
      class="apple-card p-7 sm:p-9 relative overflow-hidden group"
      @mousemove="handleCryptoMouseMove"
      @mouseleave="handleCryptoMouseLeave"
    >
      <!-- Dynamic Emerald/Teal Ambient Light -->
      <div
        class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        :style="{
          background: `radial-gradient(700px circle at ${cryptoMouseX}px ${cryptoMouseY}px, rgba(16, 185, 129, 0.12), transparent 75%)`
        }"
      ></div>

      <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <!-- Left: Information & Actions -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3.5 mb-4">
            <!-- Crypto Emblem (Tether / TRON) -->
            <div
              class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white flex items-center justify-center font-bold text-sm shadow-apple-md transition-transform duration-300 group-hover:scale-105 shrink-0"
            >
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1.6 4.8h3.9v2.2h-3.9v1.2c2.8.2 4.9.8 4.9 1.6s-2.1 1.4-4.9 1.6v4.6h-3.2v-4.6c-2.8-.2-4.9-.8-4.9-1.6s2.1-1.4 4.9-1.6V9H6.5V6.8h3.9V5h3.2v1.8zm-1.6 5.4c-2.3 0-4.1-.4-4.1-.9s1.8-.9 4.1-.9 4.1.4 4.1.9-1.8.9-4.1.9z"/>
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[11px] font-semibold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                  {{ t('support.tagCrypto') }}
                </span>
                <span class="apple-pill border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] py-0.5">
                  {{ t('support.badgeCrypto') }}
                </span>
              </div>
              <h3 class="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                {{ t('support.titleCrypto') }}
              </h3>
            </div>
          </div>

          <p class="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-6 font-normal max-w-xl">
            {{ t('support.descCrypto') }}
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center gap-3">
            <!-- Copy Button -->
            <button
              type="button"
              @click="copyCryptoAddress"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-apple-sm transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <svg v-if="cryptoCopied" class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <svg v-else class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>{{ cryptoCopied ? t('support.btnCopiedCrypto') : t('support.btnCopyCrypto') }}</span>
            </button>

            <!-- Tronscan Explorer Link -->
            <a
              :href="tronscanUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="apple-btn-secondary px-5 py-3 cursor-pointer"
              :title="t('support.btnExplorer')"
            >
              <span>{{ t('support.btnExplorer') }}</span>
              <svg class="w-3.5 h-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>

            <!-- QR Toggle Button -->
            <button
              type="button"
              @click="showQr = !showQr"
              class="apple-btn-secondary px-4 py-3 cursor-pointer shrink-0"
              :title="showQr ? t('support.btnHideQr') : t('support.btnShowQr')"
            >
              <svg class="w-4 h-4 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>{{ showQr ? t('support.btnHideQr') : t('support.btnShowQr') }}</span>
            </button>
          </div>
        </div>

        <!-- Right: Sleek Virtual Card & Expandable QR code -->
        <div class="w-full lg:w-[420px] shrink-0">
          <div
            class="relative p-6 rounded-2xl bg-gradient-to-br from-[#0c1a15] via-[#12241d] to-[#0a1411] text-white border border-emerald-500/25 shadow-[0_20px_40px_rgba(16,185,129,0.15)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_25px_50px_rgba(16,185,129,0.25)]"
          >
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.2),transparent_70%)] pointer-events-none"></div>
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-2xl pointer-events-none"></div>

            <div class="relative z-10 flex flex-col justify-between min-h-[120px]">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono tracking-widest uppercase text-emerald-300">{{ t('support.cryptoCardLabel') }}</span>
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                  TRC-20
                </span>
              </div>

              <!-- Clickable single line Address Box -->
              <div class="my-3">
                <div class="text-[11px] font-mono text-neutral-400">{{ t('support.cryptoCardAddress') }}</div>
                <div
                  @click="copyCryptoAddress"
                  class="mt-1 px-3 py-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer flex items-center justify-between gap-2.5 group/box select-all"
                  title="Клікніть, щоб скопіювати адресу"
                >
                  <span class="font-mono text-xs sm:text-[13px] text-emerald-300 group-hover/box:text-white font-medium tracking-tight break-all">
                    {{ cryptoAddress }}
                  </span>
                  <span class="shrink-0 p-1 rounded-md bg-white/10 group-hover/box:bg-emerald-500/30 text-neutral-300 group-hover/box:text-emerald-200 transition-colors">
                    <svg v-if="cryptoCopied" class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <svg v-else class="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </span>
                </div>
              </div>

              <div class="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-neutral-400">
                <span>{{ t('support.cryptoCardOwner') }}</span>
                <span class="text-emerald-300 font-mono flex items-center gap-1">
                  <svg class="w-3 h-3 text-emerald-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>{{ t('support.cryptoCardVerified') }}</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- FULL-SCREEN / LARGE APPLE QR CODE MODAL                 -->
    <!-- ======================================================== -->
    <Teleport to="body">
      <Transition name="apple-modal">
        <div
          v-if="showQr"
          class="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/80 dark:bg-black/90 backdrop-blur-2xl transition-all duration-300"
          @click.self="showQr = false"
        >
          <div
            class="relative w-full max-w-lg sm:max-w-xl bg-white dark:bg-[#1c1c1e] text-neutral-900 dark:text-white rounded-[36px] p-6 sm:p-9 border border-black/10 dark:border-white/15 shadow-[0_32px_96px_rgba(0,0,0,0.65)] flex flex-col items-center text-center animate-modal-scale select-none"
            role="dialog"
            aria-modal="true"
          >
            <!-- Close Button (Top Right) -->
            <button
              type="button"
              @click="showQr = false"
              class="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/[0.05] dark:bg-white/[0.1] hover:bg-black/[0.1] dark:hover:bg-white/[0.2] text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none"
              title="Закрити"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <!-- Modal Header -->
            <div class="flex items-center gap-3 mb-5">
              <div
                class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white flex items-center justify-center font-bold text-sm shadow-apple-md shrink-0"
              >
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1.6 4.8h3.9v2.2h-3.9v1.2c2.8.2 4.9.8 4.9 1.6s-2.1 1.4-4.9 1.6v4.6h-3.2v-4.6c-2.8-.2-4.9-.8-4.9-1.6s2.1-1.4 4.9-1.6V9H6.5V6.8h3.9V5h3.2v1.8zm-1.6 5.4c-2.3 0-4.1-.4-4.1-.9s1.8-.9 4.1-.9 4.1.4 4.1.9-1.8.9-4.1.9z"/>
                </svg>
              </div>
              <div class="text-left">
                <div class="flex items-center gap-2">
                  <span class="text-[11px] font-semibold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                    {{ t('support.tagCrypto') }}
                  </span>
                  <span class="apple-pill border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] py-0.5">
                    TRC-20
                  </span>
                </div>
                <h3 class="text-xl sm:text-2xl font-bold tracking-tight">
                  USDT / TRX QR-код
                </h3>
              </div>
            </div>

            <!-- HUGE, CRISP QR CODE CONTAINER -->
            <div class="relative p-5 sm:p-7 rounded-[28px] bg-white shadow-[0_12px_44px_rgba(0,0,0,0.18)] border border-black/[0.08] mb-5 max-w-full">
              <img
                :src="qrCodeUrl"
                alt="USDT TRC-20 Large QR Code"
                class="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-contain rounded-xl select-none"
                loading="eager"
              />
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div class="w-12 h-12 rounded-xl bg-white/95 shadow-apple-md border border-black/10 flex items-center justify-center text-emerald-600">
                  <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1.6 4.8h3.9v2.2h-3.9v1.2c2.8.2 4.9.8 4.9 1.6s-2.1 1.4-4.9 1.6v4.6h-3.2v-4.6c-2.8-.2-4.9-.8-4.9-1.6s2.1-1.4 4.9-1.6V9H6.5V6.8h3.9V5h3.2v1.8zm-1.6 5.4c-2.3 0-4.1-.4-4.1-.9s1.8-.9 4.1-.9 4.1.4 4.1.9-1.8.9-4.1.9z"/>
                  </svg>
                </div>
              </div>
            </div>

            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium mb-4 max-w-md leading-relaxed">
              Відскануйте цей QR-код камерою смартфона або застосунком вашого криптогаманця (Binance, Trust Wallet, TronLink, OKX).
            </p>

            <!-- Clickable Address Box inside Modal -->
            <div
              @click="copyCryptoAddress"
              class="w-full max-w-md p-3 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/[0.1] transition-all cursor-pointer flex items-center justify-between gap-3 mb-5 group/box select-all"
              title="Клікніть, щоб скопіювати адресу"
            >
              <span class="font-mono text-xs sm:text-sm text-neutral-900 dark:text-emerald-300 font-semibold tracking-tight break-all text-left">
                {{ cryptoAddress }}
              </span>
              <span class="shrink-0 p-1.5 rounded-xl bg-white dark:bg-white/10 shadow-apple-sm text-neutral-600 dark:text-neutral-200 group-hover/box:text-emerald-500 transition-colors">
                <svg v-if="cryptoCopied" class="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </span>
            </div>

            <!-- Modal Action Buttons -->
            <div class="flex items-center gap-3">
              <button
                type="button"
                @click="copyCryptoAddress"
                class="apple-btn-primary px-6 py-3 cursor-pointer"
              >
                <svg v-if="cryptoCopied" class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <svg v-else class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>{{ cryptoCopied ? t('support.btnCopiedCrypto') : t('support.btnCopyCrypto') }}</span>
              </button>

              <button
                type="button"
                @click="showQr = false"
                class="apple-btn-secondary px-5 py-3 cursor-pointer"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { t } from '../i18n';

// Monobank URL
const jarUrl = 'https://send.monobank.ua/jar/7cQ5hJtFDy';
const jarUrlClean = 'send.monobank.ua/jar/7cQ5hJtFDy';

// YouTube Membership & Channel URLs
const youtubeJoinUrl = 'https://www.youtube.com/@Baneronetwo/join';
const youtubeChannelUrl = 'https://www.youtube.com/@Baneronetwo';

// Crypto (USDT TRC-20 / TRX)
const cryptoAddress = 'TKrzh2CWXVfJyN75dzzviR1azTBHuqBF4o';
const tronscanUrl = 'https://tronscan.org/#/address/TKrzh2CWXVfJyN75dzzviR1azTBHuqBF4o';
const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=TKrzh2CWXVfJyN75dzzviR1azTBHuqBF4o&margin=12';

const copied = ref(false);
const cryptoCopied = ref(false);
const showQr = ref(false);

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

// Crypto specular coords
const cryptoMouseX = ref(0);
const cryptoMouseY = ref(0);

const handleCryptoMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  cryptoMouseX.value = e.clientX - rect.left;
  cryptoMouseY.value = e.clientY - rect.top;
};

const handleCryptoMouseLeave = () => {
  cryptoMouseX.value = -999;
  cryptoMouseY.value = -999;
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

const copyCryptoAddress = async () => {
  try {
    await navigator.clipboard.writeText(cryptoAddress);
    cryptoCopied.value = true;
    setTimeout(() => {
      cryptoCopied.value = false;
    }, 2500);
  } catch (err) {
    console.error('Failed to copy crypto address', err);
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && showQr.value) {
    showQr.value = false;
  }
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeyDown);
  }
});
</script>

<style scoped>
.apple-modal-enter-active,
.apple-modal-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.apple-modal-enter-from,
.apple-modal-leave-to {
  opacity: 0;
}

@keyframes modal-scale {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(16px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modal-scale {
  animation: modal-scale 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
