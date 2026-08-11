<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { SwitchInstance } from 'element-plus'
import { useAppStore } from '@/stores/app'
import { localeOptions, type AppLocale } from '@/locales'
import { createThemeTransitionBeforeChange } from '@/utils/theme-transition'
import NavMenu from '@/components/NavMenu.vue'
import ThemeDarkIcon from '@/components/icons/ThemeDarkIcon.vue'
import ThemeLightIcon from '@/components/icons/ThemeLightIcon.vue'
import TranslationIcon from '@/components/icons/TranslationIcon.vue'

const appStore = useAppStore()
const { isDark, locale } = storeToRefs(appStore)
const { t } = useI18n()

const switchRef = ref<SwitchInstance>()
const darkMode = ref(isDark.value)

watch(
  () => isDark.value,
  (value) => {
    darkMode.value = value
  },
)

watch(darkMode, (value) => {
  if (value !== isDark.value) {
    isDark.value = value
  }
})

const beforeThemeChange = createThemeTransitionBeforeChange(isDark, () => switchRef.value?.$el)

function onLocaleChange(nextLocale: AppLocale) {
  appStore.setLocale(nextLocale)
}
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__start">
        <button
          class="header__menu-btn"
          type="button"
          :aria-label="t('common.openMenu')"
          :aria-expanded="appStore.isMobileMenuOpen"
          @click="appStore.toggleMobileMenu()"
        >
          <span class="header__menu-icon" :class="{ 'is-open': appStore.isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <RouterLink to="/" class="header__logo">{{ t('common.siteName') }}</RouterLink>
      </div>

      <NavMenu mode="horizontal" class="header__nav" />

      <div class="header__actions">
        <el-switch
          ref="switchRef"
          v-model="darkMode"
          :active-action-icon="ThemeDarkIcon"
          :inactive-action-icon="ThemeLightIcon"
          :before-change="beforeThemeChange"
          :aria-label="t('theme.toggle')"
          class="header__theme-switch"
        />

        <el-dropdown
          trigger="click"
          popper-class="header-locale-popper"
          @command="onLocaleChange"
        >
          <button
            type="button"
            class="header__locale-btn"
            :aria-label="t('locale.switch')"
          >
            <TranslationIcon />
          </button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="option in localeOptions"
                :key="option.value"
                :command="option.value"
                :class="{ 'is-active': locale === option.value }"
              >
                {{ t(option.labelKey) }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--header-bg);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(8px);
}

.header__inner {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px;
  height: var(--header-height);
  box-sizing: border-box;
}

.header__start {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.header__logo {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.header__nav {
  display: flex;
  flex: 1;
  min-width: 0;
}

.header__actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.header__theme-switch {
  height: 24px;
  padding: 0 12px;
}

.header__theme-switch :deep(.el-switch__core) {
  --el-switch-on-color: var(--switch-bg);
  --el-switch-off-color: var(--switch-bg);
  --el-switch-border-color: var(--switch-border);
  min-width: 40px;
  height: 20px;
  border: 1px solid var(--switch-border);
}

.header__theme-switch :deep(.el-switch__action) {
  width: 14px;
  height: 14px;
}

.header__theme-switch :deep(.theme-light-icon) {
  width: 12px;
  height: 12px;
  color: #606266;
}

.header__theme-switch :deep(.theme-dark-icon) {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  color: #cfd3dc;
  background-color: #141414;
}

.header__locale-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: 0 12px;
  border: none;
  border-radius: 0;
  background: transparent;
  color: #606266;
  cursor: pointer;
  transition: color 0.2s;
}

html.dark .header__locale-btn {
  color: #cfd3dc;
}

.header__locale-btn:hover {
  color: var(--primary);
}

.header__menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s;
}

.header__menu-btn:hover {
  background: var(--primary-light);
}

.header__menu-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 20px;
}

.header__menu-icon span {
  display: block;
  height: 2px;
  background: var(--text-primary);
  border-radius: 1px;
  transition: transform 0.25s, opacity 0.25s;
}

.header__menu-icon.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.header__menu-icon.is-open span:nth-child(2) {
  opacity: 0;
}

.header__menu-icon.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 767px) {
  .header__inner {
    padding: 0 16px;
    gap: 8px;
  }

  .header__menu-btn {
    display: flex;
  }

  .header__start {
    flex: 1;
    justify-content: center;
  }

  .header__menu-btn {
    position: absolute;
    left: 16px;
  }

  .header__inner {
    position: relative;
  }

  .header__nav {
    display: none;
  }
}
</style>

<style>
.header-locale-popper.el-popper {
  --el-bg-color-overlay: var(--bg);
  --el-popper-border-radius: 8px;
  --el-border-color-light: transparent;
  padding: 7px 0;
  min-width: 120px;
}

.header-locale-popper .el-popper__arrow {
  display: none;
}

.header-locale-popper .el-dropdown-menu__item {
  padding: 0 16px;
  line-height: 28px;
}

.el-dropdown-menu__item.is-active {
  color: var(--el-color-primary);
  font-weight: 500;
}
</style>
