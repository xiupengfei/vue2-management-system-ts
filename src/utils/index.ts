// Parse the time to string
export const parseTime = (time?: object | string | number, cFormat?: string): string | null => {
  if (time === undefined) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

/**
 * @param {object} obj
 * @return {string}
 * @description 获取数据类型
 */

// enum keyMap {
//   '[object Boolean]',
//   '[object Number]',
//   '[object String]',
//   '[object Function]',
//   '[object Array]',
//   '[object Date]',
//   '[object RegExp]',
//   '[object Undefined]',
//   '[object Null]',
//   '[object Object]',
//   '[object Blob]'
// }

// interface typeKey {
//   '[object Boolean]': string,
//   '[object Number]': string,
//   '[object String]': string,
//   '[object Function]': string,
//   '[object Array]': string,
//   '[object Date]': string,
//   '[object RegExp]': string,
//   '[object Undefined]': string,
//   '[object Null]': string,
//   '[object Object]': string,
//   '[object Blob]': string
// }

// export const typeOf = (obj: any) => {
//   const key = Object.prototype.toString.call(obj)
//   const map: typeKey = {
//     '[object Boolean]': 'boolean',
//     '[object Number]': 'number',
//     '[object String]': 'string',
//     '[object Function]': 'function',
//     '[object Array]': 'array',
//     '[object Date]': 'date',
//     '[object RegExp]': 'regExp',
//     '[object Undefined]': 'undefined',
//     '[object Null]': 'null',
//     '[object Object]': 'object',
//     '[object Blob]': 'blob'
//   }
//   return map[key]
// }

// Format and filter json data using filterKeys array
export const formatJson = (filterKeys: any, jsonData: any) =>
  jsonData.map((data: any) =>
    filterKeys.map((key: string) => {
      if (key === 'timestamp') {
        return parseTime(data[key])
      } else {
        return data[key]
      }
    }),
  )

// Check if an element has a class
export const hasClass = (ele: HTMLElement, className: string) => {
  return !!ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

// Add class to element
export const addClass = (ele: HTMLElement, className: string) => {
  if (!hasClass(ele, className)) ele.className += ' ' + className
}

// Remove class from element
export const removeClass = (ele: HTMLElement, className: string) => {
  if (hasClass(ele, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * @param {string} key
 * @param {string} val
 * @description 本地缓存数据写入
 */

export const SetStorage = (key: string, val: string) => window.localStorage.setItem(key, val)

/**
 * @param {string} key
 * @return {string}
 * @description 本地缓存数据读取
 */

export const GetStorage = (key: string) => window.localStorage.getItem(key)

/**
 * @param {string} key
 * @description 本地缓存数据清除
 */
export const ClearStorage = (key: string) => window.localStorage.removeItem(key)

/**
 * @param {string} key
 * @description 本地缓存数据全部清除
 */
export const ClearAllStorage = () => window.localStorage.clear()
