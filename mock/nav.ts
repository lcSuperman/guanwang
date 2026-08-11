import type { MockMethod } from 'vite-plugin-mock'

const navList = [
  { label: '首页', path: '/' },
  { label: '师资团队', path: '/faculty' },
  { label: '课程体系', path: '/courses' },
  { label: '作品展厅', path: '/gallery' },
  { label: '画室动态', path: '/news' },
  {
    label: '校区环境',
    path: '/campus',
    children: [
      { label: '南校区', path: '/campus/south' },
      { label: '北校区', path: '/campus/north' },
    ],
  },
  { label: '招生资讯', path: '/admissions' },
  { label: '关于我们', path: '/about' },
  { label: '联系我们', path: '/contact' },
]

export default [
  {
    url: '/api/nav/list',
    method: 'get',
    response: () => ({
      code: 200,
      data: navList,
      message: 'success',
    }),
  },
] as MockMethod[]
