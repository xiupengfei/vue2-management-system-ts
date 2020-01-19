import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { getLanguage } from '@/utils/storage'
import defaultSettings from '@/settings'

// element-ui lang
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'

// 本地多语言
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

export const getLocale = () => {
  const localLanguage = getLanguage()
  if (localLanguage) {
    return localLanguage
  }
  // 获取浏览器语言
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.includes(locale)) {
      return locale
    }
  }

  // 默认语言
  return defaultSettings.defaultLang
}

const i18n = new VueI18n({
  locale: getLocale(),
  messages
})

export default i18n
