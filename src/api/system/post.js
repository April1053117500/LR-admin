import request from '@/utils/request'

// 获取岗位列表
export function getPostList(params) {
  return request({
    url: `/sysPost/list/${params.pageNum}/${params.pageSize}`,
    method: 'get',
    params: params
  })
}
// 新增岗位
export function addPost(params) {
  return request({
    url: `/sysPost/add`,
    method: 'post',
    data: params
  })
}
// 编辑岗位
export function editPost(params) {
  return request({
    url: `/sysPost/update`,
    method: 'post',
    data: params
  })
}
// 删除岗位
export function deletePost(params) {
  return request({
    url: `/sysPost/delete/${params.id}`,
    method: 'post',
    data: params
  })
}
