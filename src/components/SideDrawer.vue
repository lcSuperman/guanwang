<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import NavMenu from '@/components/NavMenu.vue'

const appStore = useAppStore()
const route = useRoute()
const { t } = useI18n()

watch(
  () => route.path,
  () => {
    appStore.closeMobileMenu()
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="appStore.isMobileMenuOpen"
        class="drawer-overlay"
        aria-hidden="true"
        @click="appStore.closeMobileMenu()"
      />
    </Transition>

    <aside
      class="drawer"
      :class="{ 'is-open': appStore.isMobileMenuOpen }"
      :aria-label="t('common.sideNav')"
      :aria-hidden="!appStore.isMobileMenuOpen"
    >
      <NavMenu
        v-if="appStore.isMobileMenuOpen"
        mode="vertical"
        class="drawer__nav"
        @select="appStore.closeMobileMenu()"
      />
    </aside>
  </Teleport>
</template>

<style scoped>
.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.45);
}

.drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 210;
  width: 280px;
  max-width: 85vw;
  height: 100vh;
  background: var(--bg);
  border-right: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  padding-top: calc(var(--header-height) + 16px);
  box-sizing: border-box;
  overflow-y: auto;
}

.drawer.is-open {
  transform: translateX(0);
}

.drawer__nav {
  padding: 8px 12px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 768px) {
  .drawer-overlay,
  .drawer {
    display: none;
  }
}
</style>
