import request from '@/utils/request'

export const login = (data: object) =>
  request({
    url: '/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/logout',
    method: 'post'
  })

export const getUserInfo = (params: object) =>
  request({
    url: '/userinfo',
    method: 'get',
    params
  })
