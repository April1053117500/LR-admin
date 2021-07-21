<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="listQuery" :model="listQuery" :inline="true">
        <el-form-item label="角色名称">
          <el-input v-model="listQuery.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb20">
        <el-col>
          <el-button type="primary" @click="showDialog(null)">添加</el-button>
        </el-col>
      </el-row>

      <el-table v-loading="listLoading" :data="list" border>
        <el-table-column label="角色编号" prop="roleId" />
        <el-table-column label="角色名称" prop="roleName" />
        <el-table-column label="权限字符" prop="roleKey" />
        <el-table-column label="显示顺序" prop="roleSort" />
        <el-table-column label="状态" prop="status" width="70">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0">正常</el-tag>
            <el-tag v-if="scope.row.status==1" type="danger">停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showDialog(scope.row)">编辑</el-button>
            <!-- <el-button type="text" @click="showDialog(scope.row)">数据权限</el-button> -->
            <el-popconfirm title="确定删除该条数据吗？" class="ml10" @onConfirm="handleDelete(scope.row.postId)">
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <lr-pagination class="mt20" :total="total" :page-num="pageNum" :page-size="pageSize" @getList="getList" />
      <!-- <el-pagination class="mt20" :current-page="1" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
    </el-card>

    <el-dialog :title="`${postId?'编辑':'添加'}角色`" :visible.sync="dialogVisible" width="600px" label-width="120px" label-position="right">
      <el-form ref="modalRef" :model="formData" label-position="right" label-width="100px" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="formData.roleName" />
        </el-form-item>
        <el-form-item label="权限字符" prop="roleKey">
          <el-input v-model="formData.roleKey" />
        </el-form-item>
        <el-form-item label="角色顺序" prop="roleSort">
          <el-input-number v-model="formData.roleSort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio label="0">正常</el-radio>
            <el-radio label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限" prop="status">
          <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">展开/折叠</el-checkbox>
          <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">全选/全不选</el-checkbox>
          <el-checkbox v-model="formData.menuCheckStrictly" @change="handleCheckedTreeConnect($event, 'menu')">父子联动</el-checkbox>
          <div style="max-height:300px;overflow:auto;border:1px solid #eee;padding:5px;">
            <el-tree
              ref="menu"
              class="filter-tree"
              :data="menuOptions"
              node-key="menuId"
              show-checkbox
              :expand-on-click-node="false"
              :check-on-click-node="true"
              :check-strictly="!formData.menuCheckStrictly"
            />
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, addRole, editRole, deleteRole } from '@/api/system/role'
import { getMenuList } from '@/api/system/menu'
import { lrPagination } from '@/base-npm/index'
// 默认表单数据
const defaultFormData = () => {
  return {
    roleName: '', // 角色名称
    roleKey: '', // 权限字符
    roleSort: '', // 角色顺序
    status: '0', // 状态
    remark: '', // 备注
    menuIds: [], // 菜单权限
    menuCheckStrictly: true // 父子联动
  }
}
export default {
  components: { lrPagination },
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 10,
      listLoading: false,
      // 模糊搜索数据
      listQuery: {
        name: ''
      },
      // 用户列表
      list: [],
      // 弹窗是否显示
      dialogVisible: false,
      postId: undefined,

      formData: defaultFormData(),
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        // roleKey: [
        //   { required: true, message: '请输入权限字符', trigger: 'blur' }
        // ],
        roleSort: [
          { required: true, message: '请输入角色顺序', trigger: 'blur' }
        ]
      },

      menuOptions: [], // 菜单树结构
      menuExpand: false,
      menuNodeAll: false
    }
  },
  created() {
    this.getList()
    this.getMenuList()
  },
  methods: {
    getList(params = {}) {
      const { pageNum, pageSize } = params
      this.pageNum = pageNum || this.pageNum
      this.pageSize = pageSize || this.pageSize
      this.listLoading = true
      getRoleList({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.total = res.total
        this.list = res.list
        this.listLoading = false
      })
    },
    getMenuList() {
      getMenuList({}).then(res => {
        this.menuList = res
        this.menuOptions = this.composeTree(res)
      })
    },
    // 一维数据清洗为树形结构数据
    composeTree(list = []) {
      const data = JSON.parse(JSON.stringify(list))
      const result = []
      if (!Array.isArray(data)) {
        return result
      }
      data.forEach(item => {
        delete item.children
      })
      const map = {}
      data.forEach(item => {
        map[item.menuId] = item
      })
      // this.mapList = map
      data.forEach(item => {
        item.id = item.menuId
        item.label = item.menuName
        const parent = map[item.parentId]
        if (parent) {
          (parent.children || (parent.children = [])).push(item)
        } else {
          result.push(item)
        }
      })
      return result
    },
    // 树权限（展开/折叠）
    handleCheckedTreeExpand(value, type) {
      console.log('value, type===', value, type)
      if (type === 'menu') {
        const treeList = this.menuOptions
        for (let i = 0; i < treeList.length; i++) {
          this.$refs.menu.store.nodesMap[treeList[i].id].expanded = value
        }
      } else if (type === 'dept') {
        const treeList = this.deptOptions
        for (let i = 0; i < treeList.length; i++) {
          this.$refs.dept.store.nodesMap[treeList[i].id].expanded = value
        }
      }
    },
    // 树权限（全选/全不选）
    handleCheckedTreeNodeAll(value, type) {
      if (type === 'menu') {
        this.$refs.menu.setCheckedNodes(value ? this.menuList : [])
      } else if (type === 'dept') {
        this.$refs.dept.setCheckedNodes(value ? this.deptOptions : [])
      }
    },
    // 树权限（父子联动）
    handleCheckedTreeConnect(value, type) {
      if (type === 'menu') {
        this.formData.menuCheckStrictly = !!value
      } else if (type === 'dept') {
        this.formData.deptCheckStrictly = !!value
      }
    },

    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      const checkedKeys = this.$refs.menu.getCheckedKeys()
      // 半选中的菜单节点
      const halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys()
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
      return checkedKeys
    },

    submitHandle() {
      this.$refs.modalRef.validate((valid) => {
        if (valid) {
          this.formData.menuIds = this.getMenuAllCheckedKeys()
          if (this.roleId) {
            this.edit({
              roleId: this.roleId,
              ...this.formData
            })
          } else {
            this.add(this.formData)
          }
        }
      })
    },
    add(params) {
      addRole(params).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.dialogVisible = false
          this.getList()
        }
      })
    },
    edit(params) {
      editRole(params).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          this.dialogVisible = false
          this.getList()
        }
      })
    },
    // 确认删除
    handleDelete(id) {
      deleteRole({ id }).then(res => {
        if (res) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        }
      })
    },
    showDialog(row) {
      this.dialogVisible = true
      if (row) {
        this.roleId = row.roleId
        this.formData = {
          roleName: row.roleName, // 角色名称
          roleKey: row.roleKey, // 权限字符
          roleSort: row.roleSort, // 角色顺序
          status: row.status, // 状态
          remark: row.remark, // 备注
          menuIds: row.menuIds, // 菜单权限
          menuCheckStrictly: row.menuCheckStrictly // 父子联动
        }
      } else {
        this.postId = undefined
        this.$nextTick(() => {
          this.formData = defaultFormData()
          this.$refs.modalRef.resetFields()
        })
      }
    }
  }
}
</script>

