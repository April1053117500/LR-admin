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
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // {
  //   path: '/servers',
  //   component: Layout,
  //   parent: 'none',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Servers',
  //       component: () => import('@/views/servers/index'),
  //       meta: { title: '服务器管理', icon: 'el-icon-ice-cream-round' }
  //     }
  //   ]
  // },

  // {
  //   path: '/cabinet',
  //   component: Layout,
  //   parent: 'none',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Cabinet',
  //       component: () => import('@/views/cabinet/index'),
  //       meta: { title: '机柜管理', icon: 'table' }
  //     }
  //   ]
  // },
  {
    path: '/meter-records',
    component: Layout,
    parent: 'finance',
    children: [
      {
        path: 'index',
        name: 'MeterRecords',
        component: () => import('@/views/finance/meter-records'),
        meta: { title: '抄表记录', icon: 'tree' }
      }
    ]
  },

  {
    path: '/electricity-price',
    component: Layout,
    parent: 'finance',
    children: [
      {
        path: 'index',
        name: 'electricityPrice',
        component: () => import('@/views/electricity-price/index'),
        meta: { title: 'PUE管理', icon: 'el-icon-s-help' }
      }
    ]
  },

  // {
  //   path: '/product-price',
  //   component: Layout,
  //   parent: 'finance',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'productPrice',
  //       component: () => import('@/views/product-price/index'),
  //       meta: { title: '产品单价管理', icon: 'el-icon-s-ticket' }
  //     }
  //   ]
  // },

  // {
  //   path: '/electricity-meter',
  //   component: Layout,
  //   parent: 'finance',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'electricityMeter',
  //       component: () => import('@/views/electricity-meter/index'),
  //       meta: { title: '电量表管理', icon: 'el-icon-s-cooperation' }
  //     }
  //   ]
  // },

  {
    path: '/bills',
    component: Layout,
    redirect: '/bills/index',
    parent: 'finance',
    meta: { title: '账单管理', icon: 'el-icon-s-finance' },
    children: [
      {
        path: 'index',
        name: 'Bills',
        component: () => import('@/views/bills/index'),
        meta: { title: '电费账单' }
      },
      {
        path: 'cabinet',
        name: 'Bills',
        component: () => import('@/views/bills/index'),
        meta: { title: '机柜账单' }
      }
    ]
  },

  {
    path: '/measuring-point',
    component: Layout,
    parent: 'resource',
    children: [
      {
        path: 'index',
        name: 'MeasuringPoint',
        component: () => import('@/views/measuring-point/index'),
        meta: { title: '计量点管理', icon: 'el-icon-s-finance' }
      }
    ]
  },

  {
    path: '/measuring-point2',
    component: Layout,
    parent: 'resource',
    children: [
      {
        path: 'index',
        name: 'MeasuringPoint',
        component: () => import('@/views/measuring-point/index'),
        meta: { title: '资源查询', icon: 'el-icon-s-finance' }
      }
    ]
  },

  {
    path: '/measuring-point3',
    component: Layout,
    parent: 'resource',
    children: [
      {
        path: 'index',
        name: 'MeasuringPoint',
        component: () => import('@/views/measuring-point/index'),
        meta: { title: '空间管理', icon: 'el-icon-s-finance' }
      }
    ]
  },

  {
    path: '/customer',
    component: Layout,
    parent: 'user',
    children: [
      {
        path: 'index',
        name: 'Customer',
        component: () => import('@/views/customer/index'),
        meta: { title: '客户管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/customer',
    component: Layout,
    parent: 'user',
    children: [
      {
        path: 'index',
        name: 'Customer',
        component: () => import('@/views/customer/index'),
        meta: { title: '用户管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/customer',
    component: Layout,
    parent: 'workOrder',
    children: [
      {
        path: 'index',
        name: 'WorkOrder',
        component: () => import('@/views/customer/index'),
        meta: { title: '上电工单', icon: 'form' }
      }
    ]
  },

  {
    path: '/visitor/reservation',
    component: Layout,
    parent: 'visitor',
    children: [
      {
        path: 'index',
        name: 'Reservation',
        component: () => import('@/views/visitor/reservation'),
        meta: { title: '预约管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/visitor/account',
    component: Layout,
    parent: 'visitor',
    children: [
      {
        path: 'index',
        name: 'Account',
        component: () => import('@/views/visitor/reservation'),
        meta: { title: '账号管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/visitor/reservation2',
    component: Layout,
    parent: 'visitor',
    children: [
      {
        path: 'index',
        name: 'Reservation',
        component: () => import('@/views/visitor/reservation'),
        meta: { title: '预约审批', icon: 'form' }
      }
    ]
  },
  {
    path: '/visitor/inOut',
    component: Layout,
    parent: 'visitor',
    children: [
      {
        path: 'index',
        name: 'InOut',
        component: () => import('@/views/visitor/reservation'),
        meta: { title: '出入管理', icon: 'form' }
      }
    ]
  },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   parent: 'finance',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

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
