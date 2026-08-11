import type { App, Component } from 'vue'

/**
 * Element Plus 按需引入
 *
 * 组件：在此统一注册
 * 1. import 组件
 * 2. import 对应样式
 * 3. 加入 components 数组
 *
 * @example 组件
 * import { ElButton } from 'element-plus'
 * import 'element-plus/es/components/button/style/css'
 *
 * @example 函数式 API（无需注册，按需 import 后直接使用）
 * import { ElMessage } from 'element-plus'
 * import 'element-plus/es/components/message/style/css'
 * ElMessage.success('操作成功')
 */

import {
  ElConfigProvider,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElSwitch,
} from 'element-plus'
import 'element-plus/es/components/config-provider/style/css'
import 'element-plus/es/components/dropdown/style/css'
import 'element-plus/es/components/dropdown-menu/style/css'
import 'element-plus/es/components/dropdown-item/style/css'
import 'element-plus/es/components/menu/style/css'
import 'element-plus/es/components/menu-item/style/css'
import 'element-plus/es/components/sub-menu/style/css'
import 'element-plus/es/components/switch/style/css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const components: Component[] = [
  ElConfigProvider,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElSwitch,
]

export function setupElementPlus(app: App) {
  for (const component of components) {
    const name = component.name ?? component.name
    if (name) {
      app.component(name, component)
    }
  }
}
