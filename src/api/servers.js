import request from '@/utils/request'

export function getDcimServerList(data) {
  return request({
    url: '/dcimServer/getPageList',
    method: 'post',
    data
  })
}

export function addDcimServer(data) {
  return request({
    url: '/dcimServer/add',
    method: 'post',
    data
  })
}
