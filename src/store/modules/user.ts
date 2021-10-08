import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout, getUserInfo } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/storage'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'

export interface IUserState {
  token: string
  roles: string[]
  userinfo: object
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  // ========================== State ======================
  public token = getToken() || ''
  public roles: string[] = []
  public userinfo = {}

  // ========================== Mutation ======================
  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Mutation
  private SET_USERINFO(userinfo: object) {
    this.userinfo = userinfo
  }

  // ========================== Action ======================
  @Action
  public async Login(userInfo: { username: string; password: string }) {
    let { username, password } = userInfo
    username = username.trim()
    const res = await login({ username, password })
    setToken(res.token)
    this.SET_TOKEN(res.token)
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const res = await getUserInfo({
      /* Your params here */
    })

    const { roles } = res

    this.SET_ROLES(roles)
    this.SET_USERINFO(res)
  }

  @Action
  public async ChangeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + '-token'
    this.SET_TOKEN(token)
    setToken(token)
    await this.GetUserInfo()
    resetRouter()
    // Generate dynamic accessible routes based on roles
    PermissionModule.GenerateRoutes(this.roles)
    // Add generated routes
    // router.addRoutes(PermissionModule.dynamicRoutes)
    PermissionModule.dynamicRoutes.forEach((r) => {
      router.addRoute(r)
    })
    // Reset visited views and cached views
    TagsViewModule.delAllViews()
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    resetRouter()

    // Reset visited views and cached views
    TagsViewModule.delAllViews()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
}

export const UserModule = getModule(User)
