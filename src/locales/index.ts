import zhCN from './zh-CN'
import en from './en'

export type AppLocale = 'zh-CN' | 'en'

export const LOCALE_STORAGE_KEY = 'guanwang-locale'
export const DEFAULT_LOCALE: AppLocale = 'zh-CN'

export const messages = {
  'zh-CN': zhCN,
  en,
} as const

export const localeOptions: { value: AppLocale; labelKey: 'locale.zhCN' | 'locale.en' }[] = [
  { value: 'zh-CN', labelKey: 'locale.zhCN' },
  { value: 'en', labelKey: 'locale.en' },
]
