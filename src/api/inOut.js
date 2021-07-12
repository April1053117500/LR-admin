import request from '@/utils/request'

// 获取列表
export function getVisitRecord(params) {
  return request({
    url: `VisitRecord/getPageList/${params.pageNum}/${params.pageSize}`,
    method: 'post',
    data: params
  })
}

// 新增申请单
export function addVisitRecord(params) {
  return request({
    url: `VisitRecord/add`,
    method: 'post',
    data: params
  })
}
// 新增申请单
export function editVisitRecord(params) {
  return request({
    url: `VisitRecord/update`,
    method: 'post',
    data: params
  })
}

// 获取详情
export function getVisitDetail(params) {
  return request({
    url: `VisitRecord/info/${params.id}`,
    method: 'get',
    params: params
  })
}

// 删除
export function deleteVisitRecord(params) {
  return request({
    url: `VisitRecord/delete/${params.id}`,
    method: 'post',
    data: params
  })
}

// 根据编号查询记录
export function checkVisitRecord(params) {
  return request({
    url: `/VisitRecord/visit/check`,
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
