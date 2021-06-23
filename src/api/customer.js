import request from '@/utils/request'

export function getCustomerList(params) {
  return request({
    url: '/vue-admin-template/customer/list',
    method: 'get',
    params
  })
}

export function getCabinetList(params) {
  return request({
    url: '/vue-admin-template/cabinet/list',
    method: 'get',
    params
  })
}
