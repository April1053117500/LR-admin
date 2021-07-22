import request from '@/utils/request'

// 获取人员列表
export function getUserList(params) {
  return request({
    url: `/sysUser/list/${params.pageNum}/${params.pageSize}`,
    method: 'get',
    params: params
  })
}
// 新增人员
export function addUser(params) {
  return request({
    url: `/sysUser/add`,
    method: 'post',
    data: params
  })
}
// 编辑人员
export function editUser(params) {
  return request({
    url: `/sysUser/update`,
    method: 'post',
    data: params
  })
}
// 删除人员
export function deleteUser(params) {
  return request({
    url: `/sysUser/delete/${params.id}`,
    method: 'post',
    data: params
  })
}

// 给人员分配角色
export function grantRole(params) {
  return request({
    url: `/sysUser/grant/role`,
    method: 'get',
    params: params
  })
}
