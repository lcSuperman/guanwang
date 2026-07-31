<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { NAV_ITEMS } from '@/constants/nav'

const appStore = useAppStore()
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <button
        class="header__menu-btn"
        type="button"
        aria-label="打开菜单"
        :aria-expanded="appStore.isMobileMenuOpen"
        @click="appStore.toggleMobileMenu()"
      >
        <span class="header__menu-icon" :class="{ 'is-open': appStore.isMobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <RouterLink to="/" class="header__logo">官网</RouterLink>

      <nav class="header__nav" aria-label="主导航">
        <RouterLink
          v-for="item in NAV_ITEMS"
          :key="item.path"
          :to="item.path"
          class="header__nav-link"
          exact-active-class="is-active"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
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
  justify-content: space-between;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px;
  height: var(--header-height);
  box-sizing: border-box;
}

.header__logo {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: 0.5px;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header__nav-link {
  padding: 8px 16px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 15px;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.header__nav-link:hover {
  color: var(--primary);
  background: var(--primary-light);
}

.header__nav-link.is-active {
  color: var(--primary);
  font-weight: 500;
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
    gap: 12px;
  }

  .header__menu-btn {
    display: flex;
    flex-shrink: 0;
  }

  .header__logo {
    flex: 1;
    text-align: center;
  }

  .header__nav {
    display: none;
  }
}
</style>
