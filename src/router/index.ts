import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '@/plugins/i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: { title: '首页' },
        },
        {
          path: 'faculty',
          name: 'faculty',
          component: () => import('@/views/FacultyView.vue'),
          meta: { title: '师资团队' },
        },
        {
          path: 'courses',
          name: 'courses',
          component: () => import('@/views/CoursesView.vue'),
          meta: { title: '课程体系' },
        },
        {
          path: 'gallery',
          name: 'gallery',
          component: () => import('@/views/GalleryView.vue'),
          meta: { title: '作品展厅' },
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('@/views/NewsView.vue'),
          meta: { title: '画室动态' },
        },
        {
          path: 'campus/south',
          name: 'campus-south',
          component: () => import('@/views/campus/SouthCampusView.vue'),
          meta: { title: '南校区' },
        },
        {
          path: 'campus/north',
          name: 'campus-north',
          component: () => import('@/views/campus/NorthCampusView.vue'),
          meta: { title: '北校区' },
        },
        {
          path: 'admissions',
          name: 'admissions',
          component: () => import('@/views/AdmissionsView.vue'),
          meta: { title: '招生资讯' },
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/AboutView.vue'),
          meta: { title: '关于我们' },
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('@/views/ContactView.vue'),
          meta: { title: '联系我们' },
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  const siteName = i18n.global.t('common.siteName')
  document.title = title ? `${title} - ${siteName}` : siteName
})

export default router
