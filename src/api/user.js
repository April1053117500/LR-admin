import request from '@/utils/request'

export function login(data) {
  return request({
    url: `login`,
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: 'whoami',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
