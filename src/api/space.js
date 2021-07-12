import request from '@/utils/request'

// 获取空间树
export function getLocationTree(params) {
  return request({
    url: `/dcimLocation/getLocationTree`,
    method: 'get',
    params: params
  })
}

// 到场记录确认
export function comeVisitRecord(params) {
  return request({
    url: `/VisitRecord/visit/come`,
    method: 'post',
    data: params
  })
}
