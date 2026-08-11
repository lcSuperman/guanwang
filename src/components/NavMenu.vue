<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useNavStore } from '@/stores/nav'
import { translateNavItem } from '@/utils/nav-i18n'

const props = withDefaults(
  defineProps<{
    mode?: 'horizontal' | 'vertical'
  }>(),
  {
    mode: 'horizontal',
  },
)

const emit = defineEmits<{
  select: []
}>()

const navStore = useNavStore()
const { navItems } = storeToRefs(navStore)
const route = useRoute()
const { t } = useI18n()

const translatedNavItems = computed(() =>
  navItems.value.map((item) => translateNavItem(item, t)),
)

const activeIndex = computed(() => route.path)
const openedMenus = ref<string[]>([])

watch(
  [() => route.path, translatedNavItems],
  ([path]) => {
    if (props.mode !== 'vertical') return
    openedMenus.value = translatedNavItems.value
      .filter((item) => item.children?.some((child) => child.path === path))
      .map((item) => item.path)
  },
  { immediate: true },
)

function onSelect() {
  emit('select')
}
</script>

<template>
  <el-menu
    :mode="mode"
    :default-active="activeIndex"
    :default-openeds="mode === 'vertical' ? openedMenus : undefined"
    router
    class="nav-menu"
    :class="`nav-menu--${mode}`"
    @select="onSelect"
  >
    <template v-for="item in translatedNavItems" :key="item.path">
      <el-sub-menu
        v-if="item.children?.length"
        :index="item.path"
        :popper-class="mode === 'horizontal' ? 'nav-menu-popper' : undefined"
      >
        <template #title>{{ item.label }}</template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.path"
          :index="child.path"
        >
          {{ child.label }}
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="item.path">
        {{ item.label }}
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style scoped>
.nav-menu {
  --el-menu-active-color: var(--primary);
  --el-menu-hover-text-color: var(--primary);
  --el-menu-hover-bg-color: var(--primary-light);
  --el-menu-bg-color: transparent;
  --el-menu-text-color: var(--text-secondary);
  --el-menu-border-color: transparent;
  --el-menu-item-height: 40px;
  border-bottom: none;
}

.nav-menu--horizontal {
  flex: 1;
  justify-content: flex-end;
  height: var(--header-height);
}

.nav-menu--horizontal :deep(.el-menu-item) {
  padding: 0 16px;
  font-size: 15px;
  border-bottom: none !important;
  border-radius: 6px;
}

.nav-menu--horizontal :deep(.el-sub-menu__title) {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 16px;
  font-size: 15px;
  border-bottom: none !important;
  border-radius: 6px;
}

.nav-menu--horizontal :deep(.el-sub-menu__icon-arrow) {
  position: static;
  margin: 0;
  flex-shrink: 0;
  font-size: 12px;
  vertical-align: middle;
}

.nav-menu--horizontal :deep(.el-menu-item.is-active) {
  font-weight: 500;
  background: transparent;
}

.nav-menu--horizontal :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
  color: var(--primary);
  font-weight: 500;
}

.nav-menu--vertical {
  width: 100%;
  border-right: none;
}

.nav-menu--vertical :deep(.el-menu-item) {
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  border-radius: 8px;
}

.nav-menu--vertical :deep(.el-sub-menu__title) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  border-radius: 8px;
  padding-right: 16px;
}

.nav-menu--vertical :deep(.el-sub-menu__icon-arrow) {
  position: static;
  margin: 0;
  flex-shrink: 0;
  font-size: 12px;
}

.nav-menu--vertical :deep(.el-menu-item.is-active),
.nav-menu--vertical :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
  font-weight: 500;
  background: var(--primary-light);
}

.nav-menu--vertical :deep(.el-menu--inline .el-menu-item) {
  height: 44px;
  line-height: 44px;
  font-size: 15px;
  padding-left: 36px !important;
}
</style>

<style>
.nav-menu-popper.el-menu--popup {
  --el-menu-bg-color: var(--bg);
  --el-menu-text-color: var(--text-secondary);
  --el-menu-hover-bg-color: var(--primary-light);
  --el-menu-active-color: var(--primary);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  padding: 4px;
  min-width: 140px;
}

.nav-menu-popper.el-menu--popup .el-menu-item {
  border-radius: 6px;
  font-size: 14px;
}
</style>
