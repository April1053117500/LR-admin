<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="listQuery" :model="listQuery" :inline="true">
        <el-form-item label="菜单名称">
          <el-input v-model="listQuery.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb20">
        <el-col>
          <el-button type="primary" @click="showDialog(null)">添加</el-button>
          <!-- <el-button type="primary" @click="expandAll">展开/折叠</el-button> -->
        </el-col>
      </el-row>

      <el-table ref="tableRef" v-loading="listLoading" :data="list" border row-key="menuId" :expand-row-keys="expandRowKeys">
        <el-table-column label="菜单名称" prop="menuName" />
        <el-table-column label="排序" prop="orderNum" />
        <el-table-column label="请求地址" prop="url">
          <template slot-scope="scope" width="70">
            <span v-if="scope.row.url">{{ scope.row.url }}</span>
            <span v-else>#</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="menuType" width="70">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.menuType=='M'">目录</el-tag>
            <el-tag v-if="scope.row.menuType=='C'" type="success">菜单</el-tag>
            <el-tag v-if="scope.row.menuType=='F'" type="danger">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="可见" prop="visible" width="70">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.visible==0">显示</el-tag>
            <el-tag v-if="scope.row.visible==1" type="danger">隐藏</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showDialog(scope.row)">编辑</el-button>
            <el-button type="text" class="mr10" @click="showDialog(null, scope.row.menuId)">新增</el-button>
            <el-popconfirm title="确定删除该条数据吗？" @onConfirm="handleDelete(scope.row.menuId)">
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="`${menuId?'编辑':'添加'}菜单`" :visible.sync="dialogVisible" width="600px" label-width="120px" label-position="right" :close-on-click-modal="false">
      <el-form ref="modalRef" :model="formData" label-position="right" label-width="100px" :rules="rules">
        <el-form-item label="上级菜单">
          <el-input v-model="ancestorsInfo.menuName" disabled placeholder="请选择" @click.native="showTree">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="formData.menuType">
            <el-radio label="M">目录</el-radio>
            <el-radio label="C">菜单</el-radio>
            <el-radio label="F">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="formData.menuName" placeholder="请输入" />
        </el-form-item>

        <template v-if="['C'].indexOf(formData.menuType)>-1">
          <el-form-item label="请求地址" prop="url">
            <el-input v-model="formData.url" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="打开方式" prop="target">
            <el-select v-model="formData.target" placeholder="请输入" style="width:100%">
              <el-option label="页签" value="menuItem">页签</el-option>
              <el-option label="新窗口" value="menuBlank">新窗口</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限标识" prop="perms">
            <el-input v-model="formData.perms" placeholder="请输入" />
          </el-form-item>
        </template>

        <el-form-item label="显示排序" prop="orderNum">
          <el-input-number v-model="formData.orderNum" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="formData.icon" placeholder="请输入" />
        </el-form-item>
        <el-form-item v-if="['M','C'].indexOf(formData.menuType)>-1" label="菜单状态" prop="visible">
          <el-radio-group v-model="formData.visible">
            <el-radio label="0">显示</el-radio>
            <el-radio label="1">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="['C'].indexOf(formData.menuType)>-1" label="是否刷新" prop="isRefresh">
          <el-radio-group v-model="formData.isRefresh">
            <el-radio label="0">否</el-radio>
            <el-radio label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandle">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="deptVisible" title="部门选择" :close-on-click-modal="false">
      <el-input
        v-model="filterText"
        class="mb20"
        placeholder="输入关键字进行过滤"
      />
      <div style="max-height:300px;overflow:auto;">
        <el-tree
          ref="tree"
          class="filter-tree"
          :data="filterList"
          default-expand-all
          node-key="menuId"
          show-checkbox
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          :check-on-click-node="true"
          :check-strictly="true"
          @check="checkChange"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deptVisible = false">取 消</el-button>
        <el-button type="primary" @click="filterHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuList, addMenu, editMenu, deleteMenu } from '@/api/system/menu'

// 表单默认值
const defaultFormData = () => {
  return {
    parentId: null, // 上级菜单
    menuType: 'M', // 菜单类型
    menuName: '', // 菜单名称
    url: '', // 请求地址
    target: '', // 打开方式
    perms: '', // 权限标识
    orderNum: '0', // 显示排序
    icon: '', // 图标
    visible: '0', // 菜单状态
    isRefresh: '0' // 是否刷新
  }
}
export default {
  data() {
    return {
      total: 0,
      listLoading: false,
      // 模糊搜索数据
      listQuery: {
        name: ''
      },
      // 部门列表
      list: [],
      // menuId为键值的部门对象
      mapList: {},
      // 弹窗是否显示
      dialogVisible: false,
      menuId: undefined,

      formData: defaultFormData(),
      rules: {
        menuName: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '请输入显示排序', trigger: 'blur' }
        ]
      },
      expandRowKeys: ['100'], // 默认展开
      allRowKeys: [],
      ancestorsInfo: {}, // 部门选择框选中的信息
      deptVisible: false, // 部门选择弹窗是否可见
      filterText: '', // 部门选择搜索框
      filterList: [], // 选择部门列表
      defaultCheckedKeys: [] // 默认选中的部门
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    showTree() {
      this.deptVisible = true
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([this.ancestorsInfo.menuId])
      })
    },
    checkChange(node) {
      this.$refs.tree.setCheckedKeys([node.menuId])
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    filterHandle() {
      console.log(this.$refs.tree.getCheckedNodes())
      this.ancestorsInfo = this.$refs.tree.getCheckedNodes()[0]
      this.deptVisible = false
    },
    expandAll() {
      console.log('this.expandRowKeys.length > 0===', this.expandRowKeys)
      this.expandRowKeys = this.expandRowKeys.length > 0 ? [] : this.allRowKeys
    },
    getList() {
      this.listLoading = true
      getMenuList({}).then(res => {
        this.list = this.composeTree(res)
        this.filterList = this.composeTree(res)
        this.listLoading = false
        this.allRowKeys = res.map(item => (item.menuId + ''))
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
      this.mapList = map
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
    submitHandle() {
      this.$refs.modalRef.validate((valid) => {
        const params = {
          ...this.formData,
          parentId: this.ancestorsInfo.menuId
        }
        if (valid) {
          if (this.menuId) {
            this.edit({
              menuId: this.menuId,
              ...params
            })
          } else {
            this.add(params)
          }
        }
      })
    },
    add(params) {
      addMenu(params).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.dialogVisible = false
          this.getList()
          this.ancestorsInfo = {}
        }
      })
    },
    edit(params) {
      editMenu(params).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          this.dialogVisible = false
          this.getList()
          this.ancestorsInfo = {}
        }
      })
    },
    // 确认删除
    handleDelete(id) {
      deleteMenu({ id }).then(res => {
        if (res) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        }
      })
    },
    showDialog(row, menuId) {
      this.dialogVisible = true
      if (row) {
        this.menuId = row.menuId
        this.formData = {
          parentId: row.parentId, // 上级菜单
          menuType: row.menuType, // 菜单类型
          menuName: row.menuName, // 菜单名称
          url: row.url, // 请求地址
          target: row.target, // 打开方式
          perms: row.perms, // 权限标识
          orderNum: row.orderNum, // 显示排序
          icon: row.icon, // 图标
          visible: row.visible, // 菜单状态
          isRefresh: row.isRefresh // 是否刷新
        }
        this.ancestorsInfo = row.parentId ? this.mapList[row.parentId] : {}
      } else {
        this.menuId = undefined
        this.$nextTick(() => {
          this.ancestorsInfo = menuId ? this.mapList[menuId] : {}
          this.formData = defaultFormData()
          this.$refs.modalRef.resetFields()
        })
      }
    }
  }
}
</script>

