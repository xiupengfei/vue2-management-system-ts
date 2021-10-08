import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const permissionRoutes: RouteConfig = {
  path: '/permission',
  component: Layout,
  redirect: '/permission/directive',
  meta: {
    title: 'permission',
    icon: 'lock',
    roles: ['admin', 'editor'],
    alwaysShow: true,
  },
  children: [
    {
      path: 'page',
      component: () =>
        import(/* webpackChunkName: "permission-page" */ '@/views/permission/page.vue'),
      name: 'PagePermission',
      meta: {
        title: 'pagePermission',
        roles: ['admin'], // 只有admin能看见
      },
    },
  ],
}

export default permissionRoutes
