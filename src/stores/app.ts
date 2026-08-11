import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { LOCALE_STORAGE_KEY, type AppLocale } from '@/locales'
import { getInitialLocale, i18n, setDocumentLang } from '@/plugins/i18n'

export const THEME_STORAGE_KEY = 'guanwang-theme'

function getInitialDarkMode(): boolean {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'dark') return true
  if (stored === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function applyDarkMode(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark)
}

export const useAppStore = defineStore('app', () => {
  const isMobileMenuOpen = ref(false)
  const isDark = ref(getInitialDarkMode())
  const locale = ref<AppLocale>(getInitialLocale())

  applyDarkMode(isDark.value)

  watch(isDark, (value) => {
    applyDarkMode(value)
    localStorage.setItem(THEME_STORAGE_KEY, value ? 'dark' : 'light')
  })

  function openMobileMenu() {
    isMobileMenuOpen.value = true
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false
  }

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  function toggleDarkMode() {
    isDark.value = !isDark.value
  }

  function setLocale(nextLocale: AppLocale) {
    locale.value = nextLocale
    localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
    i18n.global.locale.value = nextLocale
    setDocumentLang(nextLocale)
  }

  return {
    isMobileMenuOpen,
    isDark,
    locale,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,
    toggleDarkMode,
    setLocale,
  }
})
