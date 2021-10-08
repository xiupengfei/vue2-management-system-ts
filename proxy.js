/*
 * @Descripttion:
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-10-08 20:07:15
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-10-08 20:07:16
 */

module.exports = {
  [process.env.VUE_APP_BASE_API]: {
    target: process.env.VUE_APP_BASE_API,
    changeOrigin: true,
    ws: true, // proxy websockets
    pathRewrite: {
      ['^' + process.env.VUE_APP_BASE_API]: '',
    },
  },
}
