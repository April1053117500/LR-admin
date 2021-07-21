import request from '@/utils/request'

// 获取字典类型列表
export function getDictTypeList(params) {
  return request({
    url: `/sysDictType/list/${params.pageNum}/${params.pageSize}`,
    method: 'post',
    data: params
  })
}
// 新增字典类型
export function addDictType(params) {
  return request({
    url: `/sysDictType/add`,
    method: 'post',
    data: params
  })
}
// 编辑字典类型
export function editDictType(params) {
  return request({
    url: `/sysDictType/update`,
    method: 'post',
    data: params
  })
}
// 删除字典类型
export function deleteDictType(params) {
  return request({
    url: `/sysDictType/delete/${params.id}`,
    method: 'post',
    data: params
  })
}

// 获取字典数据列表
export function getDictDataList(params) {
  return request({
    url: `/sysDictData/dict/${params.type}`,
    method: 'get',
    params: params
  })
}

// 新增字典类型
export function addDictData(params) {
  return request({
    url: `/sysDictData/add`,
    method: 'post',
    data: params
  })
}
// 编辑字典类型
export function editDictData(params) {
  return request({
    url: `/sysDictData/update`,
    method: 'post',
    data: params
  })
}
// 删除字典类型
export function deleteDictData(params) {
  return request({
    url: `/sysDictData/delete/${params.id}`,
    method: 'post',
    data: params
  })
}
