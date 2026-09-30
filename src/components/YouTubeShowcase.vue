<template>
  <div class="apple-card p-6 sm:p-9 relative overflow-hidden group">
    <!-- Ambient Glow based on active tab -->
    <div
      :class="[
        'absolute -right-16 -top-16 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-colors duration-700',
        activeTab === 'youtube'
          ? 'bg-red-500/10 dark:bg-red-500/15'
          : activeTab === 'reddit'
            ? 'bg-[#FF4500]/10 dark:bg-[#FF4500]/15'
            : 'bg-neutral-500/10 dark:bg-white/10'
      ]"
    ></div>

    <!-- Apple Top Segmented Tabs: YouTube, Reddit, X -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
      <div class="p-1 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06] flex items-center gap-1 overflow-x-auto no-scrollbar">
        <!-- YouTube Tab Button -->
        <button
          type="button"
          @click="activeTab = 'youtube'"
          :class="[
            'px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer select-none whitespace-nowrap',
            activeTab === 'youtube'
              ? 'bg-white dark:bg-white/[0.16] text-neutral-950 dark:text-white shadow-apple-sm font-semibold'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          ]"
        >
          <svg class="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span>YouTube</span>
          <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
        </button>

        <!-- Reddit Tab Button -->
        <button
          type="button"
          @click="activeTab = 'reddit'"
          :class="[
            'px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer select-none whitespace-nowrap',
            activeTab === 'reddit'
              ? 'bg-white dark:bg-white/[0.16] text-neutral-950 dark:text-white shadow-apple-sm font-semibold'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          ]"
        >
          <svg class="w-4 h-4 text-[#FF4500] fill-current" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.703zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-4.723 4.25c-.12 0-.24.048-.33.138-.18.18-.18.48 0 .66.97.97 2.45.97 3.42 0 .18-.18.18-.48 0-.66-.18-.18-.48-.18-.66 0-.61.61-1.49.61-2.1 0-.09-.09-.21-.138-.33-.138z"/>
          </svg>
          <span>Reddit (u/Banerbansa)</span>
        </button>
      </div>

      <!-- Reddit Quick Counter & Refresh -->
      <div v-if="activeTab === 'reddit'" class="flex items-center gap-2 self-end sm:self-center">
        <span class="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
          {{ t('media.redditSub') }}
        </span>
        <a
          :href="redditUserUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs text-[#FF4500] hover:underline font-mono font-medium flex items-center gap-1"
        >
          reddit.com/user/Banerbansa ↗
        </a>
        <button
          type="button"
          @click="refreshReddit(true)"
          :disabled="isRefreshingReddit"
          class="p-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-neutral-600 dark:text-neutral-300 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          title="Refresh Reddit"
        >
          <svg
            :class="['w-3.5 h-3.5', isRefreshingReddit ? 'animate-spin text-[#FF4500]' : '']"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
        </button>
      </div>
    </div>

    <!-- ============================================================= -->
    <!-- TAB 1: YOUTUBE SHOWCASE                                       -->
    <!-- ============================================================= -->
    <div v-show="activeTab === 'youtube'">
      <!-- Header & Channel Profile -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div class="flex items-start sm:items-center gap-3.5">
          <!-- Channel Avatar -->
          <div class="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-black/[0.08] dark:border-white/[0.12] shadow-apple-sm relative bg-red-600/10 flex items-center justify-center">
            <img
              v-if="!avatarFallback"
              :src="avatarSrc"
              alt="Baneronetwo"
              loading="eager"
              @error="handleAvatarError"
              class="w-full h-full object-cover"
            />
            <div v-else class="absolute inset-0 bg-gradient-to-br from-red-600 to-amber-600 text-white flex items-center justify-center font-bold text-lg select-none">
              B
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Baneronetwo
              </h3>
              <span class="apple-pill border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 font-medium text-[11px]">
                {{ t('media.channelRole') }}
              </span>
            </div>
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              {{ t('media.channelSub') }}
            </span>
          </div>
        </div>

        <!-- Action Buttons: Subscribe & YouTube Sponsor -->
        <div class="flex flex-wrap items-center gap-2.5">
          <!-- YouTube Sponsor Link -->
          <a
            :href="sponsorUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 shadow-apple-sm active:scale-95 transition-all duration-300 select-none"
            :title="t('media.btnBecomeSponsor')"
          >
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{{ t('media.btnBecomeSponsor') }}</span>
          </a>

          <!-- Main Channel Link -->
          <a
            :href="channelUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="apple-btn-secondary px-4 py-2 text-xs"
          >
            <svg class="w-3.5 h-3.5 text-red-500 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>{{ t('media.btnGoToChannel') }}</span>
          </a>
        </div>
      </div>

      <!-- Authentic Channel Description -->
      <p class="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl font-normal">
        {{ t('media.channelDesc') }}
      </p>

      <!-- Latest Video Spotlight (Dynamic from YouTube Feed) -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-3.5">
          <span class="text-xs font-semibold tracking-wider uppercase text-red-500 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            {{ t('media.latestVideoBadge') }}
          </span>
          <span class="text-[11px] font-mono text-neutral-400">
            {{ latestVideo.published }}
          </span>
        </div>

        <div
          class="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 border border-black/[0.08] dark:border-white/[0.12] shadow-apple-md group/video"
        >
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <!-- Thumbnail with Play Hover Overlay -->
            <a
              :href="latestVideo.url"
              target="_blank"
              rel="noopener noreferrer"
              class="lg:col-span-7 relative overflow-hidden block aspect-video cursor-pointer"
            >
              <img
                :src="latestVideo.thumbnail"
                :alt="latestVideo.title"
                referrerpolicy="no-referrer"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/video:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

              <!-- Big Play Button Center -->
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div class="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/video:scale-110">
                  <svg class="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <!-- Video badge -->
              <div class="absolute bottom-3 left-3 flex items-center gap-2">
                <span class="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-mono text-white">
                  YouTube • {{ t('media.latestVideoRelease') }}
                </span>
              </div>
            </a>

            <!-- Video Details Side -->
            <div class="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between text-left bg-[#141416] text-white">
              <div>
                <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-semibold mb-2.5 inline-block">
                  {{ t('media.latestVideoRelease') }}
                </span>
                <h4 class="text-base sm:text-lg font-semibold tracking-tight text-white mb-3 line-clamp-2">
                  {{ latestVideo.title }}
                </h4>
                <p class="text-xs text-neutral-400 leading-relaxed line-clamp-4 font-normal">
                  {{ latestVideo.desc }}
                </p>
              </div>

              <div class="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <span class="text-xs font-mono text-neutral-400">
                  HD 1080p
                </span>
                <a
                  :href="latestVideo.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="apple-btn-primary px-4 py-2 text-xs"
                >
                  <span>{{ t('media.btnWatchNow') }}</span>
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Other Recent Videos Grid -->
      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
          {{ t('media.otherVideosHeading') }}
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            v-for="video in otherVideos"
            :key="video.id"
            :href="video.url"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-2xl bg-neutral-900/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.18] p-3.5 flex flex-col justify-between group/subvideo transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <!-- Thumbnail -->
              <div class="relative rounded-xl overflow-hidden aspect-video mb-3 bg-neutral-950">
                <img
                  :src="video.thumbnail"
                  :alt="video.title"
                  referrerpolicy="no-referrer"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover/subvideo:scale-105"
                />
                <div class="absolute inset-0 bg-black/20 group-hover/subvideo:bg-transparent transition-colors"></div>
                <div class="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-white">
                  YouTube
                </div>
              </div>

              <!-- Title -->
              <h5 class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white tracking-tight line-clamp-2 group-hover/subvideo:text-red-500 transition-colors mb-2">
                {{ video.title }}
              </h5>
              <p class="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 font-normal">
                {{ video.desc }}
              </p>
            </div>

            <div class="mt-3 pt-2.5 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400">
              <span>{{ video.date }}</span>
              <span class="text-red-500 font-medium flex items-center gap-1 group-hover/subvideo:translate-x-0.5 transition-transform">
                {{ t('media.btnWatch') }}
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- ============================================================= -->
    <!-- TAB 2: REDDIT ACTIVITY & POSTS (u/Banerbansa)                 -->
    <!-- ============================================================= -->
    <div v-show="activeTab === 'reddit'">
      <!-- Reddit Profile Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div class="flex items-start sm:items-center gap-3.5">
          <div class="w-12 h-12 rounded-2xl bg-[#FF4500]/10 text-[#FF4500] flex items-center justify-center font-bold shadow-apple-sm shrink-0 border border-[#FF4500]/20">
            <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.703zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-4.723 4.25c-.12 0-.24.048-.33.138-.18.18-.18.48 0 .66.97.97 2.45.97 3.42 0 .18-.18.18-.48 0-.66-.18-.18-.48-.18-.66 0-.61.61-1.49.61-2.1 0-.09-.09-.21-.138-.33-.138z"/>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Baneronetwo
              </h3>
              <span class="apple-pill border-[#FF4500]/20 bg-[#FF4500]/10 text-[#FF4500] font-medium text-[11px]">
                u/Banerbansa
              </span>
            </div>
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              {{ t('media.redditSub') }}
            </span>
          </div>
        </div>

        <!-- Action Links: Redirect directly to Reddit -->
        <div class="flex flex-wrap items-center gap-2.5">
          <a
            :href="redditUserUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="apple-btn-primary px-4 py-2 text-xs bg-[#FF4500] hover:bg-[#e03d00]"
          >
            <span>{{ t('media.btnOpenReddit') }}</span>
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>

          <a
            href="https://www.reddit.com/r/banlive/"
            target="_blank"
            rel="noopener noreferrer"
            class="apple-btn-secondary px-4 py-2 text-xs"
          >
            <span>{{ t('media.btnBanlive') }}</span>
            <svg class="w-3.5 h-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>

      <p class="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl font-normal">
        {{ t('media.redditDesc') }}
      </p>

      <!-- Reddit Sub-navigation & Activity Filters -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-neutral-900/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] mb-6">
        <!-- Filter Tabs: Overview | Posts | Comments/Replies -->
        <div class="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            type="button"
            @click="redditTypeFilter = 'all'"
            :class="[
              'px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5',
              redditTypeFilter === 'all'
                ? 'bg-white dark:bg-white/[0.16] text-[#FF4500] dark:text-[#FF4500] font-semibold shadow-apple-sm'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            ]"
          >
            <span>{{ t('media.filterAll') }}</span>
            <span class="px-1.5 py-0.2 rounded-md bg-neutral-200 dark:bg-white/10 text-[10px]">
              {{ allRedditActivities.length }}
            </span>
          </button>

          <button
            type="button"
            @click="redditTypeFilter = 'posts'"
            :class="[
              'px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5',
              redditTypeFilter === 'posts'
                ? 'bg-white dark:bg-white/[0.16] text-[#FF4500] dark:text-[#FF4500] font-semibold shadow-apple-sm'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            ]"
          >
            <span>{{ t('media.filterPosts') }}</span>
            <span class="px-1.5 py-0.2 rounded-md bg-neutral-200 dark:bg-white/10 text-[10px]">
              {{ postCount }}
            </span>
          </button>

          <button
            type="button"
            @click="redditTypeFilter = 'comments'"
            :class="[
              'px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5',
              redditTypeFilter === 'comments'
                ? 'bg-white dark:bg-white/[0.16] text-[#FF4500] dark:text-[#FF4500] font-semibold shadow-apple-sm'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            ]"
          >
            <span>{{ t('media.filterComments') }}</span>
            <span class="px-1.5 py-0.2 rounded-md bg-neutral-200 dark:bg-white/10 text-[10px]">
              {{ commentCount }}
            </span>
          </button>
        </div>

        <!-- Subreddit Quick Filter -->
        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          <button
            v-for="sub in availableSubreddits"
            :key="sub"
            type="button"
            @click="redditSubFilter = sub"
            :class="[
              'px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer whitespace-nowrap',
              redditSubFilter === sub
                ? 'bg-[#FF4500]/15 text-[#FF4500] font-semibold border border-[#FF4500]/30'
                : 'bg-black/[0.03] dark:bg-white/[0.04] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            ]"
          >
            {{ sub === 'all' ? t('media.subFilterAll') : sub }}
          </button>
        </div>
      </div>

      <!-- Reddit Feed Items List -->
      <div class="space-y-4">
        <div
          v-for="item in filteredRedditActivities"
          :key="item.id"
          class="rounded-2xl bg-neutral-900/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] hover:border-[#FF4500]/30 p-5 transition-all duration-300"
        >
          <!-- 1. Header Row: Subreddit, Context / Post title, and Date -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
            <div class="flex items-center gap-2 flex-wrap text-xs">
              <!-- Subreddit Pill -->
              <span class="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/20 flex items-center gap-1">
                <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.703zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-4.723 4.25c-.12 0-.24.048-.33.138-.18.18-.18.48 0 .66.97.97 2.45.97 3.42 0 .18-.18.18-.48 0-.66-.18-.18-.48-.18-.66 0-.61.61-1.49.61-2.1 0-.09-.09-.21-.138-.33-.138z"/>
                </svg>
                <span>{{ item.subreddit }}</span>
              </span>

              <span class="text-neutral-400">•</span>

              <!-- Context thread title (for comments/replies) or post title -->
              <span class="text-neutral-700 dark:text-neutral-300 font-medium text-xs line-clamp-1">
                {{ item.title }}
              </span>
            </div>

            <!-- Type Badge + Date -->
            <div class="flex items-center gap-2 text-[11px] text-neutral-400 font-mono shrink-0">
              <span
                :class="[
                  'px-2 py-0.5 rounded text-[10px] font-semibold uppercase',
                  item.type === 'post'
                    ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400'
                    : item.type === 'reply'
                      ? 'bg-amber-500/10 text-amber-500 dark:text-amber-400'
                      : 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400'
                ]"
              >
                {{ item.type === 'post' ? t('media.badgePost') : item.type === 'reply' ? t('media.badgeReply') : t('media.badgeComment') }}
              </span>
              <span>{{ item.date }}</span>
            </div>
          </div>

          <!-- 2. Author Action Info (e.g. "BanerBansa replied to Ok_Singer748" or "BanerBansa commented") -->
          <div class="flex items-center justify-between gap-2 mt-3 mb-2 text-xs">
            <div class="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <!-- Small user avatar -->
              <div class="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-black/10 dark:border-white/10">
                <img
                  :src="avatarSrc"
                  alt="BanerBansa"
                  class="w-full h-full object-cover"
                />
              </div>
              <span class="font-semibold text-neutral-900 dark:text-white">BanerBansa</span>
              <span>{{ item.actionText }}</span>
              <span v-if="item.replyTo" class="font-semibold text-neutral-800 dark:text-neutral-200">
                {{ item.replyTo }}
              </span>
            </div>

            <!-- Approved Badge if present -->
            <div
              v-if="item.approvedBadge"
              class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[11px] font-mono border border-emerald-500/20"
            >
              <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>{{ item.approvedBadge }}</span>
            </div>
          </div>

          <!-- 3. Body text -->
          <div class="my-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed font-normal whitespace-pre-line bg-black/[0.015] dark:bg-white/[0.02] p-3.5 rounded-xl border border-black/[0.03] dark:border-white/[0.04]">
            {{ item.body }}
          </div>

          <!-- 4. Footer Actions (Upvotes, downvotes, reply count, link to Reddit) -->
          <div class="flex items-center justify-between pt-3 border-t border-black/[0.04] dark:border-white/[0.06] text-xs">
            <!-- Upvotes / reactions like Reddit -->
            <div class="flex items-center gap-3">
              <span class="inline-flex items-center gap-1.5 font-mono font-semibold text-[#FF4500]">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 4l-8 8h5v8h6v-8h5z" />
                </svg>
                <span>{{ item.ups }}</span>
              </span>

              <span class="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 20l8-8h-5V4H9v8H4z" />
                </svg>
              </span>

              <span v-if="item.views" class="text-[11px] font-mono text-neutral-400">
                👁 {{ item.views }}
              </span>
            </div>

            <!-- Direct link to thread -->
            <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs text-[#FF4500] hover:underline font-mono font-medium flex items-center gap-1 group/link"
            >
              <span>{{ t('media.btnReadOnReddit') }}</span>
              <svg class="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Empty state when filter matches nothing -->
        <div
          v-if="filteredRedditActivities.length === 0"
          class="text-center py-12 rounded-2xl bg-neutral-900/[0.02] dark:bg-white/[0.03] border border-dashed border-black/[0.1] dark:border-white/[0.1]"
        >
          <p class="text-sm text-neutral-500 dark:text-neutral-400">
            {{ t('media.noActivitiesFound') }}
          </p>
          <button
            type="button"
            @click="redditTypeFilter = 'all'; redditSubFilter = 'all'"
            class="mt-3 px-3 py-1.5 text-xs rounded-xl bg-[#FF4500]/10 text-[#FF4500] font-semibold hover:bg-[#FF4500]/20 transition-colors"
          >
            {{ t('media.btnResetFilters') }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { t } from '../i18n';
import localAvatar from '../assets/avatar.png';

type TabKey = 'youtube' | 'reddit';
const activeTab = ref<TabKey>('youtube');

// URLs
const channelUrl = 'https://www.youtube.com/@Baneronetwo';
const sponsorUrl = 'https://www.youtube.com/@Baneronetwo/join';
const redditUserUrl = 'https://www.reddit.com/user/Banerbansa/';

const localAvatarUrl = typeof localAvatar === 'string' ? localAvatar : (localAvatar as any)?.src || '/avatar.png';

// Avatar sources with fallback
const avatarSources = [
  localAvatarUrl,
  '/avatar.png',
  'https://avatars.githubusercontent.com/BANSAFAn',
  'https://github.com/BANSAFAn.png',
  'https://yt3.googleusercontent.com/NGLdV1Qz0zKFt3gbDE3EGLb1A2i0wow71ips4j2kD9JZzgBIozbSkANNywUQeRFjvBKWNhD6Nw=s120-c-k-c0x00ffffff-no-rj',
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

// -------------------------------------------------------------
// YOUTUBE VIDEOS WITH 4-5 HOUR AUTOMATIC CACHING
// -------------------------------------------------------------
const YT_CACHE_KEY = 'baneronetwo_yt_cache_v3';
const CACHE_DURATION = 4.5 * 60 * 60 * 1000; // 4.5 hours in ms
const isRefreshingYt = ref(false);
const lastSyncLabel = ref('Свіжі дані');

interface VideoItem {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  published?: string;
  date?: string;
  desc: string;
}

// Initial default videos (accurate as of current date)
const defaultLatestVideo: VideoItem = {
  id: 'BKBULct83Lc',
  title: 'Віруси в Майнкрафт МОДАХ | 2026',
  url: 'https://www.youtube.com/watch?v=BKBULct83Lc',
  thumbnail: 'https://i3.ytimg.com/vi/BKBULct83Lc/hqdefault.jpg',
  published: '14 вересня 2026',
  desc: 'Детальний розбір реальних кіберзагроз у модах: кампанія WeedHack (MaaS), злом CurseForge через Fractureiser, вразливість BleedingPipe та шифрувальник Chaos. Захист акаунтів та аналіз звітів кібербезпеки.',
};

const defaultOtherVideos: VideoItem[] = [
  {
    id: 'qp1gB3KiWyA',
    title: 'Китайський Modrinth! - Кращий за оригінал?',
    url: 'https://www.youtube.com/watch?v=qp1gB3KiWyA',
    thumbnail: 'https://i2.ytimg.com/vi/qp1gB3KiWyA/hqdefault.jpg',
    date: '9 вересня 2026',
    desc: 'Розбір bbsmc.net — відкритого китайського форку Modrinth. Чим він відрізняється від оригіналу, алгоритми рекомендацій, монетизація та рідкісні шейдери для Minecraft.',
  },
  {
    id: 'unhCXjWq9LQ',
    title: 'Як грати в Minecraft з друзями через інтернет?',
    url: 'https://www.youtube.com/watch?v=unhCXjWq9LQ',
    thumbnail: 'https://i2.ytimg.com/vi/unhCXjWq9LQ/hqdefault.jpg',
    date: '3 вересня 2026',
    desc: 'Детальний аналіз способів підключення: від P2P в лаунчерах (XMCL, HMCL) до Essential, e4mc та віртуальних мереж без лагів.',
  },
  {
    id: 'Lw4Ul6qlWrM',
    title: 'Legacy Launcher - справжнє лайно в плані лаунчерів майнкрафт ?',
    url: 'https://www.youtube.com/watch?v=Lw4Ul6qlWrM',
    thumbnail: 'https://i1.ytimg.com/vi/Lw4Ul6qlWrM/hqdefault.jpg',
    date: '29 серпня 2026',
    desc: 'Чесний технічний розбір софту: чому інсталятор важить понад 110 МБ, порівняння з відкритими Prism та HMCL, авторизація.',
  },
  {
    id: 'vX9uj5DR31U',
    title: 'Віруси в лаунчерах Minecraft ! Чому їх не видно ?',
    url: 'https://www.youtube.com/watch?v=vX9uj5DR31U',
    thumbnail: 'https://i1.ytimg.com/vi/vX9uj5DR31U/hqdefault.jpg',
    date: '25 серпня 2026',
    desc: 'Кібербезпека софту: як сторонні лаунчери приховують шкідливий код, механізми перевірки та поради щодо безпеки вашої системи.',
  },
];

const latestVideo = ref<VideoItem>(defaultLatestVideo);
const otherVideos = ref<VideoItem[]>(defaultOtherVideos);

const formatUkDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = [
      'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
      'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
};

const extractVideoId = (guidOrUrl: string) => {
  if (!guidOrUrl) return '';
  const match = guidOrUrl.match(/([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : '';
};

// Refresh YouTube videos (with cache check)
const refreshYouTube = async (force = false) => {
  if (typeof window === 'undefined') return;

  // 1. Check local cache
  if (!force) {
    try {
      const cachedStr = localStorage.getItem(YT_CACHE_KEY);
      if (cachedStr) {
        const cached = JSON.parse(cachedStr);
        const age = Date.now() - (cached.timestamp || 0);
        if (age < CACHE_DURATION && cached.latestVideo && cached.otherVideos?.length) {
          latestVideo.value = cached.latestVideo;
          otherVideos.value = cached.otherVideos;
          const hoursAgo = Math.floor(age / (60 * 60 * 1000));
          lastSyncLabel.value = hoursAgo > 0 ? `Оновлено ${hoursAgo} год тому` : 'Оновлено щойно';
          return;
        }
      }
    } catch (err) {
      console.warn('Could not read YouTube cache', err);
    }
  }

  isRefreshingYt.value = true;
  const channelFeed = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCUdk5CZfmvSIu9wmI-gx2wQ';

  // Strategy 1: RSS2JSON API
  try {
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(channelFeed)}`);
    if (res.ok) {
      const json = await res.json();
      if (json.status === 'ok' && Array.isArray(json.items) && json.items.length > 0) {
        applyJsonFeedItems(json.items);
        isRefreshingYt.value = false;
        return;
      }
    }
  } catch (err) {
    console.warn('RSS2JSON failed, trying fallback proxy', err);
  }

  // Strategy 2: AllOrigins raw XML proxy
  try {
    const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(channelFeed)}`);
    if (res.ok) {
      const xmlText = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, 'text/xml');
      const entries = Array.from(xml.querySelectorAll('entry'));
      if (entries.length > 0) {
        applyXmlFeedEntries(entries);
        isRefreshingYt.value = false;
        return;
      }
    }
  } catch (err) {
    console.warn('AllOrigins proxy failed', err);
  }

  isRefreshingYt.value = false;
};

const applyJsonFeedItems = (items: any[]) => {
  const parsedItems: VideoItem[] = items.map((item: any) => {
    const id = extractVideoId(item.guid || item.link);
    return {
      id,
      title: item.title || '',
      url: item.link || `https://www.youtube.com/watch?v=${id}`,
      thumbnail: item.thumbnail || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      published: formatUkDate(item.pubDate),
      date: formatUkDate(item.pubDate),
      desc: item.description || item.content || 'Огляд програмного забезпечення та лаунчерів на каналі Baneronetwo.',
    };
  });

  if (parsedItems.length > 0) {
    latestVideo.value = parsedItems[0];
    otherVideos.value = parsedItems.slice(1, 4);
    lastSyncLabel.value = 'Оновлено щойно';

    try {
      localStorage.setItem(
        YT_CACHE_KEY,
        JSON.stringify({
          latestVideo: latestVideo.value,
          otherVideos: otherVideos.value,
          timestamp: Date.now(),
        })
      );
    } catch (e) {
      // quota or private mode
    }
  }
};

const applyXmlFeedEntries = (entries: Element[]) => {
  const parsedItems: VideoItem[] = entries.map((entry) => {
    const videoId =
      entry.querySelector('yt\\:videoId')?.textContent ||
      entry.querySelector('videoId')?.textContent ||
      extractVideoId(entry.querySelector('id')?.textContent || '');
    const title = entry.querySelector('title')?.textContent || '';
    const link =
      entry.querySelector('link[rel="alternate"]')?.getAttribute('href') ||
      `https://www.youtube.com/watch?v=${videoId}`;
    const pubDate = entry.querySelector('published')?.textContent || '';
    const desc =
      entry.querySelector('media\\:description')?.textContent ||
      entry.querySelector('description')?.textContent ||
      '';

    return {
      id: videoId,
      title,
      url: link,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      published: formatUkDate(pubDate),
      date: formatUkDate(pubDate),
      desc,
    };
  });

  if (parsedItems.length > 0) {
    latestVideo.value = parsedItems[0];
    otherVideos.value = parsedItems.slice(1, 4);
    lastSyncLabel.value = 'Оновлено щойно';

    try {
      localStorage.setItem(
        YT_CACHE_KEY,
        JSON.stringify({
          latestVideo: latestVideo.value,
          otherVideos: otherVideos.value,
          timestamp: Date.now(),
        })
      );
    } catch (e) {}
  }
};

import initialRedditData from '../data/reddit.json';

// -------------------------------------------------------------
// REDDIT ALL ACTIVITIES (u/Banerbansa) - Posts, Comments, Replies
// -------------------------------------------------------------
export type RedditTypeFilter = 'all' | 'posts' | 'comments';

export interface RedditActivityItem {
  id: string;
  type: 'post' | 'comment' | 'reply';
  subreddit: string;
  title: string;
  url: string;
  ups: number;
  date: string;
  rawDate?: string;
  actionText: string;
  replyTo?: string;
  body: string;
  approvedBadge?: string;
  views?: string;
}

const REDDIT_CACHE_KEY = 'baneronetwo_reddit_cache_v1';
const allRedditActivities = ref<RedditActivityItem[]>(initialRedditData as RedditActivityItem[]);
const isRefreshingReddit = ref(false);
const redditTypeFilter = ref<RedditTypeFilter>('all');
const redditSubFilter = ref<string>('all');

// Dynamically extract unique subreddits from the user's actual posts and comments
const availableSubreddits = computed(() => {
  const subs = new Set<string>();
  allRedditActivities.value.forEach((i) => {
    if (i.subreddit) subs.add(i.subreddit);
  });
  return ['all', ...Array.from(subs)];
});

const postCount = computed(() =>
  allRedditActivities.value.filter((i) => i.type === 'post').length
);

const commentCount = computed(() =>
  allRedditActivities.value.filter((i) => i.type === 'comment' || i.type === 'reply').length
);

const filteredRedditActivities = computed(() => {
  return allRedditActivities.value.filter((item) => {
    // 1. Filter by type
    if (redditTypeFilter.value === 'posts' && item.type !== 'post') return false;
    if (redditTypeFilter.value === 'comments' && item.type !== 'comment' && item.type !== 'reply') return false;

    // 2. Filter by subreddit
    if (redditSubFilter.value !== 'all' && item.subreddit !== redditSubFilter.value) return false;

    return true;
  });
});

const refreshReddit = async (force = false) => {
  if (typeof window === 'undefined') return;

  // 1. Check local cache if not forced
  if (!force) {
    try {
      const cachedStr = localStorage.getItem(REDDIT_CACHE_KEY);
      if (cachedStr) {
        const cached = JSON.parse(cachedStr);
        const age = Date.now() - (cached.timestamp || 0);
        if (age < CACHE_DURATION && Array.isArray(cached.items) && cached.items.length > 0) {
          allRedditActivities.value = cached.items;
          return;
        }
      }
    } catch {}
  }

  isRefreshingReddit.value = true;
  try {
    const res = await fetch(`/data/reddit.json?t=${Date.now()}`);
    if (res.ok) {
      const items = await res.json();
      if (Array.isArray(items) && items.length > 0) {
        allRedditActivities.value = items;
        try {
          localStorage.setItem(
            REDDIT_CACHE_KEY,
            JSON.stringify({
              items,
              timestamp: Date.now(),
            })
          );
        } catch {}
      }
    }
  } catch (err) {
    console.warn('Reddit refresh fallback to initial data', err);
  } finally {
    isRefreshingReddit.value = false;
  }
};

let refreshIntervalId: any = null;

onMounted(() => {
  refreshYouTube(false);
  refreshReddit(false);
  // Auto-refresh timer every 4.5 hours
  refreshIntervalId = setInterval(() => {
    refreshYouTube(true);
    refreshReddit(true);
  }, CACHE_DURATION);
});

onUnmounted(() => {
  if (refreshIntervalId) clearInterval(refreshIntervalId);
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
