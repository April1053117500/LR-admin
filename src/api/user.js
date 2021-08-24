import request from '@/utils/request'

export function login(data) {
  return request({
    url: `auth/login`,
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: 'auth/sysUser/token',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
