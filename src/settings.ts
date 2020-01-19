enum componentSize { large, medium, small}
enum Lang { en = 'en', zh = 'zh'}

export { componentSize }

interface ISettings {
  title: string // 系统标题
  version: string, // 系统版本
  defaultLang: Lang, // 默认语言
  componentSize: componentSize, // 组件大小
  superAdminRoleNames: string[], // 超级管理员角色名称列表
  passwordRegex: RegExp, // 密码规则
  showTagsView: boolean
  showSidebarLogo: boolean
  fixedHeader: boolean
  sidebarTextTheme: boolean
  devServerPort: number
  mockServerPort: number
}

// You can customize below settings :)
const settings: ISettings = {
  title: '管理系统Demo',
  version: 'V0.1',
  defaultLang: Lang.en,
  componentSize: componentSize.small,
  superAdminRoleNames: ['admin'],
  passwordRegex: /^(?=^.{6,20}$)(?=(?:.*?\d){1})(?=(?:.*?[a-z]){1})(?=(?:.*?[A-Z]){1})(?!.*\s)[0-9a-zA-Z!@#$%*()_+^&?.]*$/,
  showTagsView: true,
  fixedHeader: true,
  showSidebarLogo: true,
  sidebarTextTheme: true,
  devServerPort: 9527,
  mockServerPort: 9528
}

export default settings
