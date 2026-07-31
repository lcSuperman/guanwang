<script setup lang="ts">
import { watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { NAV_ITEMS } from '@/constants/nav'

const appStore = useAppStore()
const route = useRoute()

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
      aria-label="侧边导航"
      :aria-hidden="!appStore.isMobileMenuOpen"
    >
      <nav class="drawer__nav">
        <RouterLink
          v-for="item in NAV_ITEMS"
          :key="item.path"
          :to="item.path"
          class="drawer__link"
          exact-active-class="is-active"
          @click="appStore.closeMobileMenu()"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
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
}

.drawer.is-open {
  transform: translateX(0);
}

.drawer__nav {
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
}

.drawer__link {
  padding: 14px 16px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 16px;
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
}

.drawer__link:hover {
  color: var(--primary);
  background: var(--primary-light);
}

.drawer__link.is-active {
  color: var(--primary);
  background: var(--primary-light);
  font-weight: 500;
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
