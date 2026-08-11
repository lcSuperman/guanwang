import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { setupElementPlus } from '@/plugins/element-plus'
import { i18n, setDocumentLang } from '@/plugins/i18n'
import { applyDarkMode } from '@/stores/app'
import './style.css'

const storedTheme = localStorage.getItem('guanwang-theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
applyDarkMode(storedTheme === 'dark' || (storedTheme !== 'light' && prefersDark))

setDocumentLang(i18n.global.locale.value as 'zh-CN' | 'en')

const app = createApp(App)

setupElementPlus(app)
app.use(createPinia())
app.use(i18n)
app.use(router)
app.mount('#app')
