<template>
  <div
    class="w-full max-w-2xl mx-auto rounded-none p-5 sm:p-6 bg-white dark:bg-[#11141c] border-2 border-slate-900 dark:border-slate-700 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.8)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-[6px_6px_0px_0px_rgba(37,99,235,0.3)] transition-all duration-200 relative select-none"
  >
    <!-- Hidden HTML5 Audio Element -->
    <audio
      ref="audioRef"
      :src="currentAudioSrc"
      preload="metadata"
      @play="handlePlay"
      @pause="handlePause"
      @timeupdate="handleTimeUpdate"
      @loadedmetadata="handleLoadedMetadata"
      @canplay="handleCanPlay"
      @ended="handleEnded"
      @error="handleAudioError"
    ></audio>

    <div class="relative z-10 space-y-4">
      <!-- Top Bar: Title & Current Localization Badge Only -->
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2.5 min-w-0">
          <div
            class="w-9 h-9 rounded-none flex items-center justify-center shrink-0 transition-all duration-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border border-slate-900"
            :class="isPlaying ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'"
          >
            <!-- Equalizer waves when playing, or headphone icon when paused -->
            <div v-if="isPlaying" class="flex items-end justify-center gap-0.5 h-3.5">
              <span class="w-0.5 bg-current rounded-none animate-voice-wave-1 h-3"></span>
              <span class="w-0.5 bg-current rounded-none animate-voice-wave-2 h-1.5"></span>
              <span class="w-0.5 bg-current rounded-none animate-voice-wave-3 h-3.5"></span>
              <span class="w-0.5 bg-current rounded-none animate-voice-wave-4 h-2"></span>
            </div>
            <svg v-else class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          </div>

          <div class="min-w-0 text-left">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-black tracking-tight text-slate-900 dark:text-white uppercase truncate">
                {{ t('voice.title') }}
              </h3>
              <span
                v-if="isPlaying"
                class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-none text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500 uppercase"
              >
                <span class="w-1.5 h-1.5 rounded-none bg-emerald-500 animate-pulse"></span>
                LIVE
              </span>
            </div>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-mono truncate">
              {{ t('voice.subtitle') }}
            </p>
          </div>
        </div>

        <!-- Current Language Badge with Flag (Only the user's active locale) -->
        <div class="paper-pill shrink-0">
          <SvgFlag :code="currentLocale" size="sm" />
          <span class="text-[11px] font-mono font-bold uppercase">{{ activeLocaleLabel }}</span>
        </div>
      </div>

      <!-- Main Controls Row -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
        <!-- Play / Pause Button -->
        <div class="flex items-center justify-between sm:justify-start gap-3">
          <button
            type="button"
            @click="togglePlay"
            class="w-10 h-10 rounded-none flex items-center justify-center shrink-0 cursor-pointer transition-all duration-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-slate-900 dark:border-white focus:outline-none active:translate-x-0.5 active:translate-y-0.5 select-none bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800"
            :title="isPlaying ? t('voice.pause') : t('voice.play')"
            :aria-label="isPlaying ? t('voice.pause') : t('voice.play')"
          >
            <!-- Pause Icon -->
            <svg v-if="isPlaying" class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="0" />
              <rect x="14" y="4" width="4" height="16" rx="0" />
            </svg>
            <!-- Play Icon -->
            <svg v-else class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>

          <!-- Mobile Only Volume (shown beside button on small screens) -->
          <div class="sm:hidden flex items-center gap-2">
            <button
              type="button"
              @click="toggleMute"
              class="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              title="Гучність"
            >
              <svg v-if="effectiveVolume === 0" class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
              <svg v-else class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            </button>
            <div
              ref="volumeTrackMobileRef"
              @pointerdown="handleVolumePointerDown($event, 'mobile')"
              class="relative w-16 h-5 flex items-center cursor-pointer touch-none"
            >
              <div class="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <div
                  class="h-full bg-blue-600 dark:bg-blue-400 rounded-full"
                  :style="{ width: `${effectiveVolume * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline Progress Bar with Smooth Dragging -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-1 select-none">
            <span>{{ formatTime(currentTime) }}</span>
            <span class="text-zinc-600 dark:text-zinc-400 font-sans text-[11px] truncate mx-2 font-medium">
              {{ currentVoiceMeta.speaker }}
            </span>
            <span>{{ formatTime(duration) }}</span>
          </div>

          <!-- Draggable Scrub Track -->
          <div
            ref="progressTrackRef"
            @pointerdown="handleProgressPointerDown"
            class="relative w-full h-6 flex items-center cursor-pointer group/bar touch-none select-none"
            title="Перетягуйте для перемотування"
          >
            <!-- Background Track -->
            <div class="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative">
              <!-- Active Progress Fill -->
              <div
                class="absolute left-0 top-0 bottom-0 bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-75"
                :style="{ width: `${progressPercent}%` }"
              ></div>
            </div>

            <!-- Draggable Thumb Handle -->
            <div
              class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-blue-600 dark:bg-blue-400 border-2 border-white dark:border-zinc-950 shadow-sm transition-transform pointer-events-none"
              :class="isDraggingProgress ? 'scale-125 shadow-md' : 'group-hover/bar:scale-110'"
              :style="{ left: `${progressPercent}%` }"
            ></div>
          </div>
        </div>

        <!-- Desktop Volume Control (Speaker Icon + Draggable Slider + Percentage) -->
        <div class="hidden sm:flex items-center gap-2 pl-1 shrink-0">
          <!-- Mute / Unmute Button -->
          <button
            type="button"
            @click="toggleMute"
            class="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
            :title="isMuted ? 'Увімкнути звук' : 'Вимкнути звук'"
          >
            <!-- Muted -->
            <svg v-if="effectiveVolume === 0" class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
            <!-- Low Volume (< 50%) -->
            <svg v-else-if="effectiveVolume < 0.5" class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
            <!-- High Volume (>= 50%) -->
            <svg v-else class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          </button>

          <!-- Draggable Volume Track -->
          <div
            ref="volumeTrackDesktopRef"
            @pointerdown="handleVolumePointerDown($event, 'desktop')"
            class="relative w-20 h-6 flex items-center cursor-pointer group/vol touch-none select-none"
            title="Гучність (перетягуйте або клікайте)"
          >
            <!-- Track bar -->
            <div class="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative">
              <div
                class="absolute left-0 top-0 bottom-0 bg-zinc-800 dark:bg-zinc-200 rounded-full transition-all duration-75"
                :style="{ width: `${effectiveVolume * 100}%` }"
              ></div>
            </div>

            <!-- Volume thumb -->
            <div
              class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-zinc-900 dark:bg-zinc-100 shadow-sm transition-transform pointer-events-none"
              :class="isDraggingVolume ? 'scale-125' : 'group-hover/vol:scale-110'"
              :style="{ left: `${effectiveVolume * 100}%` }"
            ></div>
          </div>

          <span class="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 w-7 text-right select-none">
            {{ Math.round(effectiveVolume * 100) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { currentLocale, availableLocales, t, type Locale } from '../i18n';
import SvgFlag from './SvgFlag.vue';

// Mapping of voice files in public/voice/
const voiceMap: Record<Locale, { file: string; speaker: string }> = {
  uk: {
    file: '/voice/ukraine voice.wav',
    speaker: 'Володимир Шамін (Baneronetwo)',
  },
  be: {
    file: '/voice/belarus voice.wav',
    speaker: 'Уладзімір Шамін (Baneronetwo)',
  },
  en: {
    file: '/voice/english voice.wav',
    speaker: 'English Intro (Baneronetwo)',
  },
  de: {
    file: '/voice/deutch voice.wav',
    speaker: 'Deutsch Intro (Baneronetwo)',
  },
  zh: {
    file: '/voice/china voice.wav',
    speaker: '中文语音介绍 (Baneronetwo)',
  },
  ru: {
    file: '/voice/russia voice.wav',
    speaker: 'Аудио-визитка (Baneronetwo)',
  },
};

const audioRef = ref<HTMLAudioElement | null>(null);
const progressTrackRef = ref<HTMLElement | null>(null);
const volumeTrackDesktopRef = ref<HTMLElement | null>(null);
const volumeTrackMobileRef = ref<HTMLElement | null>(null);

const isPlaying = ref(false);
const isMuted = ref(false);
const volume = ref(0.85); // Default volume 85%
const lastNonZeroVolume = ref(0.85);
const currentTime = ref(0);
const duration = ref(0);

// Dragging states
const isDraggingProgress = ref(false);
const isDraggingVolume = ref(false);
let wasPlayingBeforeDrag = false;
let activeVolumeRef: HTMLElement | null = null;

const currentVoiceMeta = computed(() => {
  return voiceMap[currentLocale.value] || voiceMap.uk;
});

const currentAudioSrc = computed(() => {
  return encodeURI(currentVoiceMeta.value.file);
});

const activeLocaleLabel = computed(() => {
  const loc = availableLocales.find((l) => l.code === currentLocale.value);
  return loc ? loc.nativeName : 'Українська';
});

const effectiveVolume = computed(() => {
  return isMuted.value ? 0 : volume.value;
});

const progressPercent = computed(() => {
  if (!duration.value || duration.value === 0) return 0;
  return Math.min(100, Math.max(0, (currentTime.value / duration.value) * 100));
});

const formatTime = (secs: number) => {
  if (isNaN(secs) || secs < 0) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

// -------------------------------------------------------------
// PLAYBACK CONTROLS
// -------------------------------------------------------------
let shouldResumeAfterLocaleChange = false;
let activePlayPromise: Promise<void> | null = null;

const safePlay = async () => {
  const audio = audioRef.value;
  if (!audio) return;
  try {
    const p = audio.play();
    activePlayPromise = p;
    await p;
    activePlayPromise = null;
    isPlaying.value = true;
  } catch (err: any) {
    activePlayPromise = null;
    if (err?.name !== 'AbortError') {
      console.warn('Playback blocked or failed:', err);
      isPlaying.value = false;
    }
  }
};

const togglePlay = () => {
  const audio = audioRef.value;
  if (!audio) return;

  if (isPlaying.value) {
    shouldResumeAfterLocaleChange = false;
    audio.pause();
    isPlaying.value = false;
  } else {
    shouldResumeAfterLocaleChange = false;
    // Stop anthem easter egg so audio does not overlap
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('stop-anthem'));
    }
    safePlay();
  }
};

const pauseVoice = () => {
  shouldResumeAfterLocaleChange = false;
  if (audioRef.value && !audioRef.value.paused) {
    audioRef.value.pause();
  }
  isPlaying.value = false;
};

// -------------------------------------------------------------
// TIMELINE SCRUBBING & CURSOR DRAGGING
// -------------------------------------------------------------
const updateProgressFromPointer = (clientX: number) => {
  if (!progressTrackRef.value || !duration.value) return;
  const rect = progressTrackRef.value.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  const newTime = ratio * duration.value;
  currentTime.value = newTime;
  if (audioRef.value) {
    audioRef.value.currentTime = newTime;
  }
};

const handleProgressPointerDown = (e: PointerEvent) => {
  if (!progressTrackRef.value || !duration.value) return;
  isDraggingProgress.value = true;
  wasPlayingBeforeDrag = isPlaying.value;

  updateProgressFromPointer(e.clientX);

  window.addEventListener('pointermove', onProgressPointerMove);
  window.addEventListener('pointerup', onProgressPointerUp);
  window.addEventListener('pointercancel', onProgressPointerUp);
};

const onProgressPointerMove = (e: PointerEvent) => {
  if (!isDraggingProgress.value) return;
  updateProgressFromPointer(e.clientX);
};

const onProgressPointerUp = (e: PointerEvent) => {
  if (!isDraggingProgress.value) return;
  updateProgressFromPointer(e.clientX);
  isDraggingProgress.value = false;

  window.removeEventListener('pointermove', onProgressPointerMove);
  window.removeEventListener('pointerup', onProgressPointerUp);
  window.removeEventListener('pointercancel', onProgressPointerUp);

  if (wasPlayingBeforeDrag && audioRef.value) {
    audioRef.value.play().catch(() => {});
  }
};

// -------------------------------------------------------------
// VOLUME CONTROLS & CURSOR DRAGGING
// -------------------------------------------------------------
const applyVolume = (newVal: number) => {
  const clamped = Math.max(0, Math.min(1, newVal));
  volume.value = clamped;
  if (clamped > 0) {
    lastNonZeroVolume.value = clamped;
    isMuted.value = false;
  } else {
    isMuted.value = true;
  }
  if (audioRef.value) {
    audioRef.value.volume = isMuted.value ? 0 : volume.value;
  }
};

const toggleMute = () => {
  if (isMuted.value || volume.value === 0) {
    isMuted.value = false;
    applyVolume(lastNonZeroVolume.value || 0.85);
  } else {
    isMuted.value = true;
    if (audioRef.value) {
      audioRef.value.volume = 0;
    }
  }
};

const updateVolumeFromPointer = (clientX: number, track: HTMLElement) => {
  const rect = track.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  applyVolume(ratio);
};

const handleVolumePointerDown = (e: PointerEvent, type: 'desktop' | 'mobile') => {
  const track = type === 'desktop' ? volumeTrackDesktopRef.value : volumeTrackMobileRef.value;
  if (!track) return;
  activeVolumeRef = track;
  isDraggingVolume.value = true;

  updateVolumeFromPointer(e.clientX, track);

  window.addEventListener('pointermove', onVolumePointerMove);
  window.addEventListener('pointerup', onVolumePointerUp);
  window.addEventListener('pointercancel', onVolumePointerUp);
};

const onVolumePointerMove = (e: PointerEvent) => {
  if (!isDraggingVolume.value || !activeVolumeRef) return;
  updateVolumeFromPointer(e.clientX, activeVolumeRef);
};

const onVolumePointerUp = (e: PointerEvent) => {
  if (!isDraggingVolume.value) return;
  if (activeVolumeRef) {
    updateVolumeFromPointer(e.clientX, activeVolumeRef);
  }
  isDraggingVolume.value = false;
  activeVolumeRef = null;

  window.removeEventListener('pointermove', onVolumePointerMove);
  window.removeEventListener('pointerup', onVolumePointerUp);
  window.removeEventListener('pointercancel', onVolumePointerUp);
};

// -------------------------------------------------------------
// AUDIO ELEMENT EVENT LISTENERS
// -------------------------------------------------------------
const handlePlay = () => {
  isPlaying.value = true;
};

const handlePause = () => {
  isPlaying.value = false;
};

const handleTimeUpdate = () => {
  if (audioRef.value && !isDraggingProgress.value) {
    currentTime.value = audioRef.value.currentTime;
  }
};

const handleLoadedMetadata = () => {
  if (audioRef.value) {
    duration.value = audioRef.value.duration || 0;
    audioRef.value.volume = isMuted.value ? 0 : volume.value;
  }
};

const handleEnded = () => {
  isPlaying.value = false;
  currentTime.value = 0;
};

const handleAudioError = (e: Event) => {
  console.warn('Audio element error:', e);
  isPlaying.value = false;
};

const handleCanPlay = () => {
  if (shouldResumeAfterLocaleChange) {
    shouldResumeAfterLocaleChange = false;
    safePlay();
  }
};

// When locale changes, smoothly swap audio source to that language without crashing
watch(currentLocale, () => {
  const audio = audioRef.value;
  const wasPlaying = isPlaying.value || shouldResumeAfterLocaleChange;

  if (audio) {
    audio.pause();
  }
  isPlaying.value = false;
  currentTime.value = 0;
  isDraggingProgress.value = false;

  if (wasPlaying) {
    shouldResumeAfterLocaleChange = true;
  }
});

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('stop-voice-player', pauseVoice);
  }
  if (audioRef.value) {
    audioRef.value.volume = isMuted.value ? 0 : volume.value;
    audioRef.value.load();
  }
});

onUnmounted(() => {
  pauseVoice();
  if (typeof window !== 'undefined') {
    window.removeEventListener('stop-voice-player', pauseVoice);
    window.removeEventListener('pointermove', onProgressPointerMove);
    window.removeEventListener('pointerup', onProgressPointerUp);
    window.removeEventListener('pointermove', onVolumePointerMove);
    window.removeEventListener('pointerup', onVolumePointerUp);
  }
});
</script>

<style scoped>
@keyframes voice-wave-1 {
  0%, 100% { height: 4px; }
  50% { height: 14px; }
}
@keyframes voice-wave-2 {
  0%, 100% { height: 12px; }
  50% { height: 5px; }
}
@keyframes voice-wave-3 {
  0%, 100% { height: 6px; }
  50% { height: 16px; }
}
@keyframes voice-wave-4 {
  0%, 100% { height: 13px; }
  50% { height: 4px; }
}

.animate-voice-wave-1 {
  animation: voice-wave-1 0.7s ease-in-out infinite;
}
.animate-voice-wave-2 {
  animation: voice-wave-2 0.6s ease-in-out infinite 0.15s;
}
.animate-voice-wave-3 {
  animation: voice-wave-3 0.8s ease-in-out infinite 0.3s;
}
.animate-voice-wave-4 {
  animation: voice-wave-4 0.65s ease-in-out infinite 0.1s;
}
</style>
