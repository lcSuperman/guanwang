import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getNavList } from '@/api'
import type { NavItem } from '@/types'

export const useNavStore = defineStore('nav', () => {
  const navItems = ref<NavItem[]>([])
  const loading = ref(false)

  async function fetchNavItems() {
    if (navItems.value.length) return

    loading.value = true
    try {
      navItems.value = await getNavList()
    } finally {
      loading.value = false
    }
  }

  return {
    navItems,
    loading,
    fetchNavItems,
  }
})
