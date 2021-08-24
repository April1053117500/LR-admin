import request from '@/utils/request'

// 获取菜单列表
export function getMenuList(params) {
  return request({
    url: `auth/sysMenu/list`,
    method: 'post',
    data: params
  })
}

// 新增菜单
export function addMenu(params) {
  return request({
    url: `auth/sysMenu/add`,
    method: 'post',
    data: params
  })
}
// 编辑菜单
export function editMenu(params) {
  return request({
    url: `auth/sysMenu/update`,
    method: 'post',
    data: params
  })
}
// 删除菜单
export function deleteMenu(params) {
  return request({
    url: `auth/sysMenu/delete/${params.id}`,
    method: 'post',
    data: params
  })
}
