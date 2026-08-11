import { createI18n } from 'vue-i18n'
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, messages, type AppLocale } from '@/locales'

export function getInitialLocale(): AppLocale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored === 'zh-CN' || stored === 'en') {
    return stored
  }
  return DEFAULT_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages,
})

export function setDocumentLang(locale: AppLocale) {
  document.documentElement.lang = locale === 'zh-CN' ? 'zh-CN' : 'en'
}
