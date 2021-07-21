import request from '@/utils/request'

// 获取菜单列表
export function getMenuList(params) {
  return request({
    url: `/sysMenu/list`,
    method: 'post',
    data: params
  })
}

// 新增菜单
export function addMenu(params) {
  return request({
    url: `/sysMenu/add`,
    method: 'post',
    data: params
  })
}
// 编辑菜单
export function editMenu(params) {
  return request({
    url: `/sysMenu/update`,
    method: 'post',
    data: params
  })
}
// 删除菜单
export function deleteMenu(params) {
  return request({
    url: `/sysMenu/delete/${params.id}`,
    method: 'post',
    data: params
  })
}
