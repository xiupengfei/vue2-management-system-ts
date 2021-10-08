
import { GetStorage, SetStorage, ClearStorage } from './index'

// App
const sidebarStatusKey = '--sidebar-status--'
export const getSidebarStatus = () => GetStorage(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => SetStorage(sidebarStatusKey, sidebarStatus)

const languageKey = '--language--'
export const getLanguage = () => GetStorage(languageKey)
export const setLanguage = (language: string) => SetStorage(languageKey, language)

// User
const tokenKey = '--token--'
export const getToken = () => GetStorage(tokenKey)
export const setToken = (token: string) => SetStorage(tokenKey, token)
export const removeToken = () => ClearStorage(tokenKey)
