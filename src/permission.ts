/*
 * @Descripttion:
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-07-10 14:47:56
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-10-08 12:56:01
 */
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import router from '@/router'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'
import { TagsViewModule } from '@/store/modules/tags-view'
import i18n from '@/lang'
import settings from './settings'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

const getPageTitle = (key: string) => {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`)
    return `${pageName} - ${settings.title}`
  }
  return `${settings.title}`
}

router.beforeEach(async(to: Route, _: Route, next: any) => {
  NProgress.start()

  // 检测用户是否登录
  if (UserModule.token) {
    if (to.path === '/login') {
      // 如果登录并且在登录页面则重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 检测用户角色
      if (UserModule.roles.length === 0) {
        try {
          // 说明: 角色必须是数组 eg: ['admin']
          await UserModule.GetUserInfo()
          const roles = UserModule.roles
          // 基于角色生成可访问路由表
          PermissionModule.GenerateRoutes(roles)
          // 动态添加可访问路由
          // router.addRoutes(PermissionModule.dynamicRoutes)
          PermissionModule.dynamicRoutes.forEach(r => {
            router.addRoute(r)
          })
          // 设置replace: true, 导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (err) {
          // Remove token and redirect to login page
          UserModule.ResetToken()
          Message.error(err || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
          TagsViewModule.delAllViews()
        }
      } else {
        next()
      }
    }
  } else {
    // 没登录
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to: Route) => {
  NProgress.done()
  document.title = getPageTitle(to.meta?.title)
})
