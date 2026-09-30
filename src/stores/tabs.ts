import { ref, computed } from 'vue';
import { t, currentLocale } from '../i18n';

export type TabId = 'profile' | 'tech' | 'i18n' | 'media' | 'support';

export interface TabItem {
  id: TabId;
  label: string;
}

export const tabsList = computed<TabItem[]>(() => {
  // Access currentLocale.value to establish reactivity
  const _ = currentLocale.value;
  return [
    { id: 'profile', label: t('tabs.profile') },
    { id: 'tech', label: t('tabs.tech') },
    { id: 'i18n', label: t('tabs.i18n') },
    { id: 'media', label: t('tabs.media') },
    { id: 'support', label: t('tabs.support') },
  ];
});

export const validTabIds: TabId[] = ['profile', 'tech', 'i18n', 'media', 'support'];

export function isValidTab(id: string): id is TabId {
  return validTabIds.includes(id as TabId);
}

export const activeTab = ref<TabId>('profile');

export const isPatrioticModeActive = ref(false);

export function setPatrioticMode(active: boolean) {
  isPatrioticModeActive.value = active;
  if (typeof window !== 'undefined') {
    if (active) {
      document.documentElement.setAttribute('data-patriotic', 'ua');
    } else {
      document.documentElement.removeAttribute('data-patriotic');
    }
  }
}

export function setTab(tabId: TabId, scroll = true) {
  if (!isValidTab(tabId)) return;
  activeTab.value = tabId;

  if (typeof window !== 'undefined') {
    history.replaceState(null, '', `#${tabId}`);
    if (scroll) {
      const el = document.getElementById('tabs-container');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }
}
