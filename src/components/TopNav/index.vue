<template>
  <el-menu
    mode="horizontal"
    :default-active="activeIndex"
    @select="handleSelect"
  >
    <template>
      <el-menu-item index="finance" disabled>
        <i class="el-icon-s-goods" />
        <span>账务管理</span>
      </el-menu-item>
      <el-menu-item index="resource" disabled>
        <i class="el-icon-s-platform" />
        <span>资源管理</span>
      </el-menu-item>
      <el-menu-item index="user" disabled>
        <i class="el-icon-user-solid" />
        <span>客户管理</span>
      </el-menu-item>
      <el-menu-item index="workOrder" disabled>
        <i class="el-icon-s-grid" />
        <span>工单管理</span>
      </el-menu-item>
      <el-menu-item index="visitor">
        <i class="el-icon-s-custom" />
        <span>访客管理</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { constantRoutes } from '@/router'

export default {
  data() {
    return {
      activeIndex: 'finance'
    }
  },
  computed: {
    // 所有的路由信息
    routers() {
      console.log('this.$store.state.permission===', this.$store.state.permission.topbarRouters)
      return this.$store.state.permission.topbarRouters
    },
    // 顶部显示菜单
    topMenus() {
      const topMenus = []
      this.routers.map(menu => {
        if (menu.hidden !== true) {
          topMenus.push(menu)
        }
      })
      return topMenus
    },
    // 侧边显示菜单
    childrenMenus() {
      const childrenMenus = []
      // this.routers.map(router => {
      //   for (const item in router.children) {

      //   }
      // })
      return constantRoutes.concat(childrenMenus)
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
      const routes = []
      constantRoutes.map(item => {
        if (item.parent && item.parent === key) {
          routes.push(item)
        }
      })
      this.$store.commit('SET_SIDEBAR_ROUTERS', routes)
      return routes
    }
  }
}
</script>

<style lang="scss">
.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 50px;
  line-height: 50px;
  margin: 0;
  border-bottom: 3px solid transparent;
  color: #fff;
  padding: 0 10px 0 8px;
  margin: 0 10px;
  i{
    color: #fff;
  }
  &:hover, &:active, &:focus{
    background: #337ab7 !important;
    color: #fff !important;
  }
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 3px solid #337ab7;
  background: #337ab7 !important;
  color: #fff;
}

/* submenu item */
.el-menu--horizontal > .el-submenu .el-submenu__title {
	height: 50px !important;
	line-height: 50px !important;
}
</style>
