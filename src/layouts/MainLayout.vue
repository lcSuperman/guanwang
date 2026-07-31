<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideDrawer from '@/components/SideDrawer.vue'
</script>

<template>
  <div class="layout">
    <AppHeader />
    <SideDrawer />
    <main class="layout__main">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout__main {
  flex: 1;
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 32px 24px;
  box-sizing: border-box;
}

@media (max-width: 767px) {
  .layout__main {
    padding: 24px 16px;
  }
}
</style>
