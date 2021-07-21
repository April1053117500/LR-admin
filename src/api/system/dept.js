import request from '@/utils/request'

// 获取部门列表
export function getDeptList(params) {
  return request({
    url: `/sysDept/list`,
    method: 'post',
    data: params
  })
}

// 新增部门
export function addDept(params) {
  return request({
    url: `/sysDept/add`,
    method: 'post',
    data: params
  })
}
// 编辑部门
export function editDept(params) {
  return request({
    url: `/sysDept/update`,
    method: 'post',
    data: params
  })
}
// 删除部门
export function deleteDept(params) {
  return request({
    url: `/sysDept/delete/${params.id}`,
    method: 'post',
    data: params
  })
}
