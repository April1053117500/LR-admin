<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="listQuery" :model="listQuery" :inline="true">
        <el-form-item label="部门名称">
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

      <el-table ref="tableRef" v-loading="listLoading" :data="list" border row-key="deptId" :expand-row-keys="expandRowKeys">
        <el-table-column label="部门名称" prop="deptName" />
        <el-table-column label="排序" prop="orderNum" />
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
            <el-button type="text" class="mr10" @click="showDialog(null, scope.row.deptId)">新增</el-button>
            <el-popconfirm title="确定删除该条数据吗？" @onConfirm="handleDelete(scope.row.deptId)">
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- <lr-pagination class="mt20" :total="total" :page-num="pageNum" :page-size="pageSize" @getList="getList" /> -->
    </el-card>

    <el-dialog :title="`${deptId?'编辑':'添加'}部门`" :visible.sync="dialogVisible" width="600px" label-width="120px" label-position="right" :close-on-click-modal="false">
      <el-form ref="modalRef" :model="formData" label-position="right" label-width="100px" :rules="rules">
        <el-form-item label="上级部门">
          <el-input v-model="ancestorsInfo.deptName" placeholder="请选择" disabled @click.native="showTree">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="formData.deptName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="显示排序" prop="orderNum">
          <el-input-number v-model="formData.orderNum" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="负责人" prop="leader">
          <el-input v-model="formData.leader" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="部门状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio label="0">正常</el-radio>
            <el-radio label="1">停用</el-radio>
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
          node-key="deptId"
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
import { getDeptList, addDept, editDept, deleteDept } from '@/api/system/dept'

export default {
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 999999,
      listLoading: false,
      // 模糊搜索数据
      listQuery: {
        name: ''
      },
      // 部门列表
      list: [],
      // deptId为键值的部门对象
      mapList: {},
      // 弹窗是否显示
      dialogVisible: false,
      deptId: undefined,

      formData: this.defaultFormData(),
      rules: {
        deptName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
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
        this.$refs.tree.setCheckedKeys([this.ancestorsInfo.deptId])
      })
    },
    checkChange(node) {
      this.$refs.tree.setCheckedKeys([node.deptId])
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
    // 表单默认值
    defaultFormData() {
      return {
        ancestors: '', // 上级部门
        deptName: '', // 部门名称
        orderNum: '', // 显示排序
        leader: '', // 负责人
        phone: '', // 联系电话
        email: '', // 邮箱
        status: '0' // 部门状态
      }
    },
    getList(params = {}) {
      const { pageNum, pageSize } = params
      this.pageNum = pageNum || this.pageNum
      this.pageSize = pageSize || this.pageSize
      this.listLoading = true
      getDeptList({}).then(res => {
        this.list = this.composeTree(res)
        this.filterList = this.composeTree(res)
        this.listLoading = false
        this.allRowKeys = res.map(item => (item.deptId + ''))
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
        map[item.deptId] = item
      })
      this.mapList = map
      data.forEach(item => {
        item.id = item.deptId
        item.label = item.deptName
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
          parentId: this.ancestorsInfo.deptId,
          ancestors: `${this.ancestorsInfo.ancestors},${this.ancestorsInfo.deptId}`
        }
        if (valid) {
          if (this.deptId) {
            this.edit({
              deptId: this.deptId,
              ...params
            })
          } else {
            this.add(params)
          }
        }
      })
    },
    add(params) {
      addDept(params).then(res => {
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
      editDept(params).then(res => {
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
      deleteDept({ id }).then(res => {
        if (res) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        }
      })
    },
    showDialog(row, deptId) {
      this.dialogVisible = true
      if (row) {
        this.deptId = row.deptId
        this.formData = {
          ancestors: row.ancestors, // 上级部门
          deptName: row.deptName, // 部门名称
          orderNum: row.orderNum, // 显示排序
          leader: row.leader, // 负责人
          phone: row.phone, // 联系电话
          email: row.email, // 邮箱
          status: row.status // 部门状态
        }
        this.ancestorsInfo = row.parentId ? this.mapList[row.parentId] : {}
      } else {
        this.deptId = undefined
        this.$nextTick(() => {
          this.ancestorsInfo = deptId ? this.mapList[deptId] : {}
          this.formData = this.defaultFormData()
          this.$refs.modalRef.resetFields()
        })
      }
    },
    goDetail(row) {
      this.$router.push({
        path: '/system/dict/detail',
        query: { type: row.dictType }
      })
    }
  }
}
</script>

