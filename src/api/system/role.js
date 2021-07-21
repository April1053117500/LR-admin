import request from '@/utils/request'

// 获取角色列表
export function getRoleList(params) {
  return request({
    url: `/sysRole/list/${params.pageNum}/${params.pageSize}`,
    method: 'get',
    params: params
  })
}
// 新增角色
export function addRole(params) {
  return request({
    url: `/sysRole/add`,
    method: 'post',
    data: params
  })
}
// 编辑角色
export function editRole(params) {
  return request({
    url: `/sysRole/update`,
    method: 'post',
    data: params
  })
}
// 删除角色
export function deleteRole(params) {
  return request({
    url: `/sysRole/delete/${params.id}`,
    method: 'post',
    data: params
  })
}
