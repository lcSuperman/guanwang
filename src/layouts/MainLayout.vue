<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideDrawer from '@/components/SideDrawer.vue'
import { useNavStore } from '@/stores/nav'
import { useAppStore } from '@/stores/app'

const navStore = useNavStore()
const appStore = useAppStore()
const { locale } = storeToRefs(appStore)

const elementLocale = computed(() => (locale.value === 'zh-CN' ? zhCn : en))

onMounted(() => {
  navStore.fetchNavItems()
})
</script>

<template>
  <el-config-provider :locale="elementLocale">
    <div class="layout">
      <AppHeader />
      <SideDrawer />
      <main class="layout__main">
        <RouterView />
      </main>
      <AppFooter />
    </div>
  </el-config-provider>
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
