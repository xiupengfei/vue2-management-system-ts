import axios from 'axios'

declare module '*.vue';

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}

// declare module 'element-ui'

// declare module 'element-ui/lib/locale/lang/*' {
//   export const elementLocale: any
// }
declare module 'element-ui/lib/locale/lang/*';

declare module '*.gif' {
  export const gif: any
}

// TODO: remove this part after vue-count-to has its typescript file
// declare module 'vue-count-to'
