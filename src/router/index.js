import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/entry',
    component: () => import('@/views/entry/index'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/system/user'
    // children: [{
    //   path: 'dashboard',
    //   name: 'Dashboard',
    //   component: () => import('@/views/dashboard/index'),
    //   meta: { title: '首页', icon: 'dashboard' }
    // }]
  },
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统管理', icon: 'el-icon-setting' },
    redirect: '/system/user',
    children: [
      {
        path: 'user',
        name: 's-user',
        component: () => import('@/views/system/user/index'),
        meta: { title: '人员管理', icon: 'el-icon-user-solid' }
      },
      {
        path: 'role',
        name: 's-role',
        component: () => import('@/views/system/role/index'),
        meta: { title: '角色管理', icon: 'el-icon-s-goods' }
      },
      {
        path: 'dept',
        name: 's-dept',
        component: () => import('@/views/system/dept/index'),
        meta: { title: '部门管理', icon: 'el-icon-s-fold' }
      },
      {
        path: 'post',
        name: 's-post',
        component: () => import('@/views/system/post/index'),
        meta: { title: '岗位管理', icon: 'el-icon-s-cooperation' }
      },
      {
        path: 'menu',
        name: 's-menu',
        component: () => import('@/views/system/menu/index'),
        meta: { title: '菜单管理', icon: 'el-icon-menu' }
      },
      {
        path: 'dict',
        name: 's-dict',
        component: () => import('@/views/system/dict/index'),
        meta: { title: '字典管理', icon: 'el-icon-s-help' }
      },
      {
        path: 'dict/detail',
        name: 's-dict-detail',
        component: () => import('@/views/system/dict/detail'),
        meta: { title: '字典详情', icon: 'el-icon-ice-cream-round', activeMenu: '/system/dict' },
        hidden: true
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'p-index',
        component: () => import('@/views/profile/index'),
        meta: { title: '个人中心', icon: 'el-icon-ice-cream-round' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
