import type { NavItem } from '@/types'

const NAV_I18N_KEYS: Record<string, string> = {
  '/': 'nav.home',
  '/faculty': 'nav.faculty',
  '/courses': 'nav.courses',
  '/gallery': 'nav.gallery',
  '/news': 'nav.news',
  '/campus': 'nav.campus',
  '/campus/south': 'nav.campusSouth',
  '/campus/north': 'nav.campusNorth',
  '/admissions': 'nav.admissions',
  '/about': 'nav.about',
  '/contact': 'nav.contact',
}

export function getNavLabelKey(path: string): string | undefined {
  return NAV_I18N_KEYS[path]
}

export function translateNavItem(
  item: NavItem,
  t: (key: string) => string,
): NavItem {
  const key = getNavLabelKey(item.path)
  return {
    ...item,
    label: key ? t(key) : item.label,
    children: item.children?.map((child) => translateNavItem(child, t)),
  }
}
