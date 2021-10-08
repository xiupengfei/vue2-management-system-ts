/*
 * @Descripttion:
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-07-10 14:47:57
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-10-08 12:07:50
 */
import request from '@/utils/request'

export const login = (data: object) =>
  request({
    url: '/login',
    method: 'post',
    data,
  })

export const logout = () =>
  request({
    url: '/logout',
    method: 'post',
  })

export const getUserInfo = (params: object) =>
  request({
    url: '/userinfo',
    method: 'get',
    params,
  })
