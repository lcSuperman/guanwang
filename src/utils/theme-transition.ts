import { nextTick, type Ref } from 'vue'

let latestTransitionId = 0

function canUseViewTransition() {
  return (
    typeof document !== 'undefined' &&
    typeof document.startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function createThemeTransitionBeforeChange(
  isDark: Ref<boolean>,
  getSwitchElement: () => HTMLElement | undefined,
) {
  return () =>
    new Promise<boolean>((resolve) => {
      if (!canUseViewTransition()) {
        resolve(true)
        return
      }

      const switchElement = getSwitchElement()
      if (!switchElement) {
        resolve(true)
        return
      }

      const rect = switchElement.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      )

      const ratioX = (100 * x) / innerWidth
      const ratioY = (100 * y) / innerHeight
      const referR = Math.hypot(innerWidth, innerHeight) / Math.SQRT2
      const ratioR = (100 * endRadius) / referR

      const transitionId = ++latestTransitionId
      const root = document.documentElement
      root.dataset.themeTransition = isDark.value ? 'to-light' : 'to-dark'
      root.style.setProperty('--theme-transition-x', `${ratioX}%`)
      root.style.setProperty('--theme-transition-y', `${ratioY}%`)
      root.style.setProperty('--theme-transition-radius', `${ratioR}%`)

      const transition = document.startViewTransition!(async () => {
        resolve(true)
        await nextTick()
      })

      transition.finished.finally(() => {
        if (transitionId !== latestTransitionId) return

        delete root.dataset.themeTransition
        root.style.removeProperty('--theme-transition-x')
        root.style.removeProperty('--theme-transition-y')
        root.style.removeProperty('--theme-transition-radius')
      })
    })
}
