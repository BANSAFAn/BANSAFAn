<template>
  <header class="sticky top-0 z-50 w-full border-b-2 border-slate-900 dark:border-slate-800 bg-white/95 dark:bg-[#0b0e14]/95 backdrop-blur-md transition-colors duration-200">
    <div
      class="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between"
    >
      <!-- НУ НАХ"Я ТИ ТУТ БЛ"ДЬ, ЦЕ ТУПО КОМЕНТАРІЇ ЯКІ НІКОЛИ НЕ ЧИТАЄШ !! -->
      <button
        type="button"
        @click="handleBrandClick"
        class="flex items-center gap-2.5 sm:gap-3 group focus:outline-none py-1 pl-1 pr-3 text-left cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 select-none"
        title="Baneronetwo Головна"
      >
        <!-- GitHub Avatar -->
        <div
          class="w-9 h-9 rounded-none overflow-hidden border-2 border-slate-900 dark:border-slate-600 group-hover:border-blue-600 dark:group-hover:border-blue-400 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] group-hover:shadow-[3px_3px_0px_0px_rgba(37,99,235,0.4)] shrink-0 relative bg-slate-900 flex items-center justify-center transition-all duration-200"
        >
          <img
            v-if="!avatarFallback"
            :src="avatarSrc"
            alt="Baneronetwo"
            class="w-full h-full object-cover rounded-none transition-transform duration-200 group-hover:scale-105"
            loading="eager"
            @error="handleAvatarError"
          />
          <div
            v-else
            class="absolute inset-0 bg-slate-900 text-white flex items-center justify-center font-bold text-xs"
          >
            B
          </div>
        </div>

        <div class="flex flex-col text-left">
          <span class="text-xs sm:text-sm font-black tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase">
            Baneronetwo
          </span>
          <span class="text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5 hidden sm:inline font-mono uppercase tracking-wider">
            {{ t('nav.subtitle') }}
          </span>
        </div>
      </button>

      <!-- Center Links (Technical Cubic Tabs - Desktop Only) -->
      <nav
        class="hidden md:flex items-center gap-1 p-1 rounded-none bg-slate-100 dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 text-xs font-mono shadow-[2px_2px_0px_0px_rgba(15,23,42,0.8)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
        role="tablist"
      >
        <button
          v-for="tab in tabsList"
          :key="tab.id"
          type="button"
          role="tab"
          :aria-selected="activeTab === tab.id"
          @click="setTab(tab.id, true)"
          class="relative px-3.5 py-1.5 rounded-none transition-all duration-200 cursor-pointer shrink-0 select-none focus:outline-none font-bold text-xs uppercase tracking-wider hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5"
          :class="[
            activeTab === tab.id
              ? 'text-white dark:text-slate-950 bg-slate-900 dark:bg-white shadow-[2px_2px_0px_0px_rgba(37,99,235,0.4)]'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800'
          ]"
        >
          <span>{{ tab.label }}</span>
        </button>
      </nav>

      <!-- Right Controls: SVG Flag Language Switcher + Theme Toggle -->
      <div class="flex items-center gap-2 shrink-0">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </div>

    <!-- Technical Mobile Dock Tab Bar (Only on mobile < md) -->
    <nav
      class="fixed bottom-3 inset-x-3 max-w-sm sm:max-w-md mx-auto z-40 md:hidden pointer-events-auto flex items-center justify-around p-1 rounded-none bg-white/95 dark:bg-[#11141c]/95 backdrop-blur-md border-2 border-slate-900 dark:border-slate-700 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] transition-all duration-200"
      role="tablist"
      aria-label="Mobile Navigation"
    >
      <button
        v-for="tab in tabsList"
        :key="tab.id"
        type="button"
        role="tab"
        :aria-selected="activeTab === tab.id"
        @click="setTab(tab.id, true)"
        class="flex-1 flex flex-col items-center justify-center py-1.5 px-0.5 rounded-none transition-all duration-150 cursor-pointer select-none active:translate-x-0.5 active:translate-y-0.5 relative font-mono hover:text-blue-600 dark:hover:text-blue-400"
        :class="[
          activeTab === tab.id
            ? 'text-white dark:text-slate-950 bg-slate-900 dark:bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] font-bold'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
        ]"
      >
        <!-- Dynamic Icon based on tab -->
        <svg v-if="tab.id === 'profile'" class="w-4 h-4 mb-0.5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <component v-else :is="getTabIcon(tab.id)" class="w-4 h-4 mb-0.5" />
        <span class="text-[9px] tracking-tight leading-none truncate max-w-[54px] uppercase">{{ tab.label }}</span>
      </button>
    </nav>

    <!-- Apple Dynamic Island Floating Player for Anthem Easter Egg -->
    <Transition name="anthem-island">
      <div
        v-if="isAnthemPlaying"
        class="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-full bg-neutral-950/95 dark:bg-black/95 backdrop-blur-2xl border flex items-center gap-3 text-white pointer-events-auto transition-all duration-300"
        :class="[activeAnthemMeta.borderColor, activeAnthemMeta.glowColor]"
      >
        <SvgFlag :code="activeAnthemMeta.flagCode" size="md" />
        <div class="flex flex-col text-left max-w-[260px] sm:max-w-[340px]">
          <span class="text-xs font-bold tracking-tight truncate" :class="activeAnthemMeta.textColor">
            {{ activeAnthemMeta.title }}
          </span>
          <span class="text-[10px] text-neutral-300 font-mono truncate">
            {{ activeAnthemMeta.subtitle }}
          </span>
        </div>
        <!-- Apple Music Dynamic Island Frequency Equalizer -->
        <div class="flex items-end justify-center gap-[3.5px] mx-1 h-5 shrink-0 px-1 py-0.5">
          <span
            class="w-[3.5px] rounded-full apple-eq-bar eq-bar-1"
            :class="activeAnthemMeta.eqColors[0]"
          ></span>
          <span
            class="w-[3.5px] rounded-full apple-eq-bar eq-bar-2"
            :class="activeAnthemMeta.eqColors[1]"
          ></span>
          <span
            class="w-[3.5px] rounded-full apple-eq-bar eq-bar-3"
            :class="activeAnthemMeta.eqColors[2]"
          ></span>
          <span
            class="w-[3.5px] rounded-full apple-eq-bar eq-bar-4"
            :class="activeAnthemMeta.eqColors[3]"
          ></span>
        </div>
        <!-- Stop button (hidden on 'ru' so it cannot be dismissed) -->
        <button
          v-if="currentLocale !== 'ru'"
          type="button"
          @click="stopAnthem"
          class="p-1 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
          title="Stop Anthem"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import ThemeToggle from './ThemeToggle.vue';
import LanguageSwitcher from './LanguageSwitcher.vue';
import SvgFlag from './SvgFlag.vue';
import IconCode from './icons/IconCode.vue';
import IconAward from './icons/IconAward.vue';
import IconGlobe from './icons/IconGlobe.vue';
import IconYouTube from './icons/IconYouTube.vue';
import IconHeartHand from './icons/IconHeartHand.vue';
import localAvatar from '../assets/avatar.png';
import { activeTab, setTab, tabsList, isValidTab, setPatrioticMode, type TabId } from '../stores/tabs';
import { t, currentLocale, initClientLocale, type Locale } from '../i18n';

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

const getTabIcon = (id: TabId) => {
  switch (id) {
    case 'tech': return IconCode;
    case 'cert': return IconAward;
    case 'i18n': return IconGlobe;
    case 'media': return IconYouTube;
    case 'support': return IconHeartHand;
    default: return null;
  }
};

// -------------------------------------------------------------
// MULTI-LANGUAGE ANTHEM CONFIGURATION (10 CLICKS EASTER EGG)
// -------------------------------------------------------------
interface AnthemConfig {
  audioSrc: string;
  flagCode: Locale;
  title: string;
  subtitle: string;
  borderColor: string;
  glowColor: string;
  textColor: string;
  eqColors: string[];
}

const anthems: Record<Locale, AnthemConfig> = {
  uk: {
    audioSrc: '/ukraine.mp3',
    flagCode: 'uk',
    title: 'Державний Гімн України',
    subtitle: '«Ще не вмерла України і слава, і воля»',
    borderColor: 'border-yellow-500/50',
    glowColor: 'shadow-[0_8px_32px_rgba(255,215,0,0.3)]',
    textColor: 'text-yellow-400',
    eqColors: ['bg-blue-500', 'bg-yellow-400', 'bg-blue-500', 'bg-yellow-400'],
  },
  be: {
    audioSrc: '/belarusi.mp3',
    flagCode: 'be',
    title: 'Дзяржаўны гімн Беларусі',
    subtitle: '«Мы, беларусы»',
    borderColor: 'border-emerald-500/50',
    glowColor: 'shadow-[0_8px_32px_rgba(0,125,70,0.3)]',
    textColor: 'text-emerald-400',
    eqColors: ['bg-red-500', 'bg-emerald-500', 'bg-red-500', 'bg-emerald-500'],
  },
  en: {
    audioSrc: '/british.mp3',
    flagCode: 'en',
    title: 'National Anthem of the United Kingdom',
    subtitle: '“God Save the King”',
    borderColor: 'border-red-500/50',
    glowColor: 'shadow-[0_8px_32px_rgba(200,16,46,0.3)]',
    textColor: 'text-red-400',
    eqColors: ['bg-blue-600', 'bg-red-500', 'bg-white', 'bg-red-500'],
  },
  de: {
    audioSrc: '/deutch.mp3',
    flagCode: 'de',
    title: 'Nationalhymne von Deutschland',
    subtitle: '„Das Lied der Deutschen“',
    borderColor: 'border-amber-500/50',
    glowColor: 'shadow-[0_8px_32px_rgba(255,206,0,0.3)]',
    textColor: 'text-amber-400',
    eqColors: ['bg-neutral-300', 'bg-red-500', 'bg-amber-400', 'bg-red-500'],
  },
  zh: {
    audioSrc: '/china.mp3',
    flagCode: 'zh',
    title: '中华人民共和国国歌',
    subtitle: '《义勇军进行曲》',
    borderColor: 'border-red-600/50',
    glowColor: 'shadow-[0_8px_32px_rgba(238,28,37,0.35)]',
    textColor: 'text-yellow-400',
    eqColors: ['bg-red-500', 'bg-yellow-400', 'bg-red-500', 'bg-yellow-400'],
  },
  ru: {
    // Replaced with Ukraine's anthem as explicitly requested!
    audioSrc: '/ukraine.mp3',
    flagCode: 'ru',
    title: 'Государственный Гимн России',
    subtitle: '«Ще не вмерла України і слава, і воля» 🇺🇦',
    borderColor: 'border-blue-500/50',
    glowColor: 'shadow-[0_8px_32px_rgba(0,87,183,0.35)]',
    textColor: 'text-blue-400',
    eqColors: ['bg-blue-500', 'bg-yellow-400', 'bg-blue-500', 'bg-yellow-400'],
  },
};

const activeAnthemMeta = computed(() => {
  return anthems[currentLocale.value] || anthems.uk;
});

const clickCount = ref(0);
let clickResetTimer: any = null;
const isAnthemPlaying = ref(false);
let audioElement: HTMLAudioElement | null = null;
let synthOscillators: any[] = [];
let audioCtx: AudioContext | null = null;

const handleBrandClick = () => {
  setTab('profile', false);

  clickCount.value++;
  clearTimeout(clickResetTimer);

  if (clickCount.value >= 10) {
    clickCount.value = 0;
    triggerAnthemEasterEgg();
  } else {
    clickResetTimer = setTimeout(() => {
      clickCount.value = 0;
    }, 2500);
  }
};

const triggerAnthemEasterEgg = () => {
  if (isAnthemPlaying.value) {
    // If Russian locale, anthem cannot be canceled early
    if (currentLocale.value === 'ru') {
      return;
    }
    stopAnthem();
    return;
  }

  const anthem = activeAnthemMeta.value;
  isAnthemPlaying.value = true;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('stop-voice-player'));
  }

  // Ukrainian Flag mode triggers ONLY during Russian anthem playback
  if (currentLocale.value === 'ru') {
    setPatrioticMode(true);
  } else {
    setPatrioticMode(false);
  }

  try {
    if (!audioElement) {
      audioElement = new Audio();
      audioElement.addEventListener('ended', () => {
        isAnthemPlaying.value = false;
        setPatrioticMode(false);
      });
      audioElement.addEventListener('error', () => {
        if (currentLocale.value === 'uk' || currentLocale.value === 'ru') {
          playSynthAnthem();
        } else {
          isAnthemPlaying.value = false;
          setPatrioticMode(false);
        }
      });
    }

    audioElement.src = anthem.audioSrc;
    audioElement.currentTime = 0;
    audioElement.play().catch(() => {
      if (currentLocale.value === 'uk' || currentLocale.value === 'ru') {
        playSynthAnthem();
      } else {
        isAnthemPlaying.value = false;
        setPatrioticMode(false);
      }
    });
  } catch {
    if (currentLocale.value === 'uk' || currentLocale.value === 'ru') {
      playSynthAnthem();
    } else {
      isAnthemPlaying.value = false;
      setPatrioticMode(false);
    }
  }
};

const stopAnthem = () => {
  setPatrioticMode(false);
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }
  synthOscillators.forEach((osc) => {
    try {
      osc.stop();
    } catch {}
  });
  synthOscillators = [];
  if (audioCtx) {
    audioCtx.close().catch(() => {});
    audioCtx = null;
  }
  isAnthemPlaying.value = false;
};

// Stop playback if user switches language while anthem is active
watch(currentLocale, () => {
  if (isAnthemPlaying.value) {
    stopAnthem();
  }
});

// Zero-dependency Web Audio API synthesizer for the iconic Anthem of Ukraine melody
const playSynthAnthem = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    audioCtx = new AudioContextClass();
    const notes: [number, number][] = [
      // [freq (Hz), duration (s)]
      [293.66, 0.4], // D4
      [329.63, 0.4], // E4
      [369.99, 0.4], // F#4
      [392.00, 0.6], // G4
      [440.00, 0.3], // A4
      [493.88, 0.6], // B4
      [523.25, 0.3], // C5
      [493.88, 0.6], // B4
      [440.00, 0.4], // A4
      [392.00, 0.8], // G4
      [369.99, 0.4], // F#4
      [392.00, 0.8], // G4
    ];

    let startTime = audioCtx.currentTime + 0.1;
    notes.forEach(([freq, dur]) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.3, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur - 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + dur);
      synthOscillators.push(osc);

      startTime += dur;
    });

    setTimeout(() => {
      if (!audioElement || audioElement.paused) {
        isAnthemPlaying.value = false;
      }
    }, (startTime - audioCtx.currentTime) * 1000);
  } catch (err) {
    console.warn('Audio synthesis failed', err);
  }
};

// -------------------------------------------------------------
// DYNAMIC BROWSER TAB TITLES & 20s SLEEPING CAT ANIMATION
// -------------------------------------------------------------
const titleDict: Record<Locale, {
  awake: string;
  sleep: string;
  away: string;
  tech: [string, string];
  cert: [string, string];
  i18n: [string, string];
  media: [string, string];
  support: [string, string];
}> = {
  uk: {
    awake: '🐱 Baneronetwo — Котик активний 🐾',
    sleep: '😴 Baneronetwo — Котик спить... zZz',
    away: '🐾 Повернутися до котика? — Baneronetwo',
    tech: ['⚡ Baneronetwo — GitHub & Стек', '💻 Baneronetwo — Open Source Core'],
    cert: ['📜 Baneronetwo — Сертифікати LF', '🛡️ Baneronetwo — Rust & Web Security'],
    i18n: ['🌐 Baneronetwo — Лабораторія i18n', '🗺️ Baneronetwo — 6 Мовних систем'],
    media: ['🎬 Baneronetwo — YouTube & Медіа', '🔴 Baneronetwo — Огляди та розбори'],
    support: ['💳 Baneronetwo — Банка Monobank', '❤️ Baneronetwo — Дякую за підтримку!'],
  },
  be: {
    awake: '🐱 Baneronetwo — Коцік актыўны 🐾',
    sleep: '😴 Baneronetwo — Коцік спіць... zZz',
    away: '🐾 Вярнуцца да коціка? — Baneronetwo',
    tech: ['⚡ Baneronetwo — GitHub & Стэк', '💻 Baneronetwo — Open Source Праекты'],
    cert: ['📜 Baneronetwo — Сертыфікаты LF', '🛡️ Baneronetwo — Rust & Web Security'],
    i18n: ['🌐 Baneronetwo — Лабараторыя i18n', '🗺️ Baneronetwo — 6 Моўных сістэм'],
    media: ['🎬 Baneronetwo — YouTube & Медыя', '🔴 Baneronetwo — Агляды і стрымы'],
    support: ['💳 Baneronetwo — Банка Monobank', '❤️ Baneronetwo — Дзякуй за падтрымку!'],
  },
  en: {
    awake: '🐱 Baneronetwo — Kitty is Awake 🐾',
    sleep: '😴 Baneronetwo — Kitty is Sleeping... zZz',
    away: '🐾 Come back to kitty! — Baneronetwo',
    tech: ['⚡ Baneronetwo — GitHub & Tech Stack', '💻 Baneronetwo — Open Source Core'],
    cert: ['📜 Baneronetwo — LF Certificates', '🛡️ Baneronetwo — Rust & Web Security'],
    i18n: ['🌐 Baneronetwo — i18n Laboratory', '🗺️ Baneronetwo — 6 Language Systems'],
    media: ['🎬 Baneronetwo — YouTube & Media', '🔴 Baneronetwo — Tech Breakdowns'],
    support: ['💳 Baneronetwo — Monobank Support', '❤️ Baneronetwo — Thank You!'],
  },
  de: {
    awake: '🐱 Baneronetwo — Kätzchen ist wach 🐾',
    sleep: '😴 Baneronetwo — Kätzchen schläft... zZz',
    away: '🐾 Zurück zum Kätzchen! — Baneronetwo',
    tech: ['⚡ Baneronetwo — GitHub & Stack', '💻 Baneronetwo — Open Source Architektur'],
    cert: ['📜 Baneronetwo — LF Zertifikate', '🛡️ Baneronetwo — Rust & Web Security'],
    i18n: ['🌐 Baneronetwo — i18n-Labor', '🗺️ Baneronetwo — 6 Sprachsysteme'],
    media: ['🎬 Baneronetwo — YouTube & Medien', '🔴 Baneronetwo — Video-Analysen'],
    support: ['💳 Baneronetwo — Monobank Spenden', '❤️ Baneronetwo — Danke!'],
  },
  zh: {
    awake: '🐱 Baneronetwo — 猫咪清醒活跃 🐾',
    sleep: '😴 Baneronetwo — 猫咪睡觉中... zZz',
    away: '🐾 回来找猫咪吧！— Baneronetwo',
    tech: ['⚡ Baneronetwo — GitHub 与技术栈', '💻 Baneronetwo — 开源核心贡献'],
    cert: ['📜 Baneronetwo — Linux 基金会证书', '🛡️ Baneronetwo — Rust 与 Web 安全'],
    i18n: ['🌐 Baneronetwo — 国际化实验室', '🗺️ Baneronetwo — 6 大语言系统'],
    media: ['🎬 Baneronetwo — YouTube 与媒体', '🔴 Baneronetwo — 深度软件解析'],
    support: ['💳 Baneronetwo — Monobank 赞助', '❤️ Baneronetwo — 感谢支持！'],
  },
  ru: {
    awake: '🐱 Baneronetwo — Котик активен 🐾',
    sleep: '😴 Baneronetwo — Котик спит... zZz',
    away: '🐾 Вернуться к котику? — Baneronetwo',
    tech: ['⚡ Baneronetwo — GitHub & Стек', '💻 Baneronetwo — Open Source Проекты'],
    cert: ['📜 Baneronetwo — Сертификаты LF', '🛡️ Baneronetwo — Rust & Web Security'],
    i18n: ['🌐 Baneronetwo — Лаборатория i18n', '🗺️ Baneronetwo — 6 Языковых систем'],
    media: ['🎬 Baneronetwo — YouTube & Медиа', '🔴 Baneronetwo — Обзоры и стримы'],
    support: ['💳 Baneronetwo — Банка Monobank', '❤️ Baneronetwo — Спасибо за поддержку!'],
  },
};

const isCatSleeping = ref(false);
const subPhase = ref(false);
let catInterval: any = null;
let tabInterval: any = null;

const updateFavicon = (sleeping: boolean) => {
  if (typeof document === 'undefined') return;
  const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
  if (!link) return;
  const href = sleeping ? '/favicon-sleep.svg?v=sleep' : '/favicon.svg?v=cat';
  if (link.getAttribute('href') !== href) {
    link.setAttribute('href', href);
  }
};

const updateBrowserTabTitle = () => {
  if (typeof document === 'undefined') return;

  if (document.visibilityState === 'hidden') {
    const pack = titleDict[currentLocale.value] || titleDict.uk;
    document.title = pack.away;
    return;
  }

  const pack = titleDict[currentLocale.value] || titleDict.uk;
  const tab = activeTab.value;

  if (tab === 'profile') {
    if (isCatSleeping.value) {
      document.title = pack.sleep;
      updateFavicon(true);
    } else {
      document.title = pack.awake;
      updateFavicon(false);
    }
  } else {
    updateFavicon(false);
    const subIdx = subPhase.value ? 1 : 0;
    if (tab === 'tech') document.title = pack.tech[subIdx];
    else if (tab === 'cert') document.title = pack.cert[subIdx];
    else if (tab === 'i18n') document.title = pack.i18n[subIdx];
    else if (tab === 'media') document.title = pack.media[subIdx];
    else if (tab === 'support') document.title = pack.support[subIdx];
  }
};

const startTitleTimers = () => {
  if (catInterval) clearInterval(catInterval);
  if (tabInterval) clearInterval(tabInterval);

  if (activeTab.value === 'profile') {
    // 20-second interval for cat awake / sleep cycle!
    catInterval = setInterval(() => {
      isCatSleeping.value = !isCatSleeping.value;
      updateBrowserTabTitle();
    }, 20000);
  } else {
    // 4-second interval for other tabs
    tabInterval = setInterval(() => {
      subPhase.value = !subPhase.value;
      updateBrowserTabTitle();
    }, 4000);
  }
};

watch([activeTab, currentLocale], () => {
  isCatSleeping.value = false;
  subPhase.value = false;
  updateBrowserTabTitle();
  startTitleTimers();
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

    window.addEventListener('stop-anthem', stopAnthem);
    document.addEventListener('visibilitychange', updateBrowserTabTitle);

    updateBrowserTabTitle();
    startTitleTimers();
  }
});

onUnmounted(() => {
  stopAnthem();
  if (catInterval) clearInterval(catInterval);
  if (tabInterval) clearInterval(tabInterval);
  if (typeof window !== 'undefined') {
    window.removeEventListener('stop-anthem', stopAnthem);
    document.removeEventListener('visibilitychange', updateBrowserTabTitle);
  }
  if (clickResetTimer) clearTimeout(clickResetTimer);
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

.anthem-island-enter-active,
.anthem-island-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.anthem-island-enter-from {
  opacity: 0;
  transform: translate(-50%, -12px) scale(0.9);
}

.anthem-island-leave-to {
  opacity: 0;
  transform: translate(-50%, -8px) scale(0.95);
}

/* Authentic Apple Dynamic Island Sound Equalizer Wave Animations */
@keyframes apple-eq-wave-1 {
  0%, 100% {
    height: 4px;
    opacity: 0.65;
  }
  50% {
    height: 18px;
    opacity: 1;
  }
}

@keyframes apple-eq-wave-2 {
  0%, 100% {
    height: 18px;
    opacity: 1;
  }
  50% {
    height: 5px;
    opacity: 0.7;
  }
}

@keyframes apple-eq-wave-3 {
  0%, 100% {
    height: 7px;
    opacity: 0.75;
  }
  50% {
    height: 20px;
    opacity: 1;
  }
}

@keyframes apple-eq-wave-4 {
  0%, 100% {
    height: 16px;
    opacity: 1;
  }
  50% {
    height: 4px;
    opacity: 0.65;
  }
}

.apple-eq-bar {
  transform-origin: bottom center;
  transition: background-color 0.3s ease;
  will-change: height, opacity;
}

.eq-bar-1 {
  animation: apple-eq-wave-1 0.75s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.eq-bar-2 {
  animation: apple-eq-wave-2 0.62s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.14s;
}

.eq-bar-3 {
  animation: apple-eq-wave-3 0.85s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.28s;
}

.eq-bar-4 {
  animation: apple-eq-wave-4 0.68s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.08s;
}
</style>
