import { request } from '@/utils/request'
import type { NavItem } from '@/types'

/** 获取导航菜单列表 */
export function getNavList() {
  return request<NavItem[]>({
    url: '/api/nav/list',
    method: 'get',
  })
}
