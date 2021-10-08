import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { getSidebarStatus, setSidebarStatus, setLanguage } from '@/utils/storage'
import { getLocale } from '@/lang'
import store from '@/store'
import defaultSettings, { componentSize } from '@/settings'

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  language: string
  size: componentSize
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  // ========================== State ======================
  public sidebar = {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false,
  }
  public device = DeviceType.Desktop
  public language = getLocale()
  public size = defaultSettings.componentSize

  // ========================== Mutation ======================
  @Mutation
  private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = !this.sidebar.opened
    this.sidebar.withoutAnimation = withoutAnimation
    if (this.sidebar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  }

  @Mutation
  private CLOSE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = false
    this.sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus('closed')
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device
  }

  @Mutation
  private SET_LANGUAGE(language: string) {
    this.language = language
    setLanguage(this.language)
  }

  // ========================== Action ======================
  @Action
  public ToggleSideBar(withoutAnimation: boolean) {
    this.TOGGLE_SIDEBAR(withoutAnimation)
  }

  @Action
  public CloseSideBar(withoutAnimation: boolean) {
    this.CLOSE_SIDEBAR(withoutAnimation)
  }

  @Action
  public ToggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device)
  }

  @Action
  public SetLanguage(language: string) {
    this.SET_LANGUAGE(language)
  }
}

export const AppModule = getModule(App)
