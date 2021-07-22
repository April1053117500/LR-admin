<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--部门数据-->
      <!-- <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-input
            placeholder="请输入部门名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
        <el-tree
            ref="tree"
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
        </div>
      </el-col> -->
      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <el-card class="box-card">
          <el-form ref="listQuery" :model="listQuery" :inline="true">
            <el-form-item label="人员名称">
              <el-input v-model="listQuery.name" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="pageNum=1;getList()">搜索</el-button>
            </el-form-item>
          </el-form>

          <!-- <el-row :gutter="10" class="mb20">
            <el-col>
              <el-button type="primary" @click="showDialog(null)">添加</el-button>
            </el-col>
          </el-row> -->

          <el-table v-loading="listLoading" :data="list" border>
            <el-table-column label="用户编号" prop="userId" width="80px" />
            <el-table-column label="用户名称" prop="userName" width="100px" />
            <el-table-column label="登录账号" prop="loginName" />
            <el-table-column label="部门">
              <template slot-scope="scope">
                <span>{{ scope.row.sysDepts?scope.row.sysDepts.map(item=>item.deptName).join(','):'-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="角色">
              <template slot-scope="scope">
                <span>{{ scope.row.sysRoles?scope.row.sysRoles.map(item=>item.roleName).join(','):'-' }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="手机号码" prop="phonenumber" />
            <el-table-column label="状态" prop="status" width="70">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status==0">正常</el-tag>
                <el-tag v-if="scope.row.status==1" type="danger">停用</el-tag>
              </template>
            </el-table-column> -->
            <el-table-column label="创建时间" prop="createTime" />
            <el-table-column label="操作" width="80px">
              <template slot-scope="scope">
                <el-button type="text" @click="showDispatchModal(scope.row)">分配角色</el-button>
                <!-- <el-button type="text" @click="showDialog(scope.row)">编辑</el-button>
                <el-popconfirm title="确定删除该条数据吗？" class="ml10" @onConfirm="handleDelete(scope.row.userId)">
                  <el-button slot="reference" type="text">删除</el-button>
                </el-popconfirm> -->
              </template>
            </el-table-column>
          </el-table>
          <lr-pagination class="mt20" :total="total" :page-num="pageNum" :page-size="pageSize" @getList="getList" />
        </el-card>
      </el-col>
    </el-row>
    <!-- 新增/编辑用户 -->
    <el-dialog :title="`${userId?'编辑':'添加'}人员`" :visible.sync="dialogVisible" width="800px">
      <el-form ref="modalRef" :model="formData" label-position="right" label-width="80px" :rules="rules">
        <el-row>
          <el-col :span="12">

            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="formData.用户名称" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属部门" prop="deptId">
              <el-input v-model="ancestorsInfo.deptName" placeholder="请选择" disabled @click.native="showDeptDialog">
                <el-button slot="append" icon="el-icon-search" />
              </el-input>
              <!-- <el-input v-model="formData.deptId" placeholder="请选择" /> -->
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input v-model="formData.phonenumber" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登录账号" prop="nickName">
              <el-input v-model="formData.nickName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登录密码" prop="password">
              <el-input v-model="formData.password" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别" prop="sex">
              <el-select v-model="formData.sex" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="dict in sexOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="formData.status" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位" prop="postIds">
              <el-select v-model="formData.postIds" multiple placeholder="请选择" style="width:100%">
                <el-option
                  v-for="post in postOptions"
                  :key="post.postId"
                  :label="post.postName"
                  :value="post.postId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" prop="roleIds">
              <el-select v-model="formData.roleIds" multiple placeholder="请选择" style="width:100%">
                <el-option
                  v-for="role in roleOptions"
                  :key="role.roleId"
                  :label="role.roleName"
                  :value="role.roleId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandle">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择部门 -->
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
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dispatchVisible" width="500px" :close-on-click-modal="false">
      <el-form ref="dispatchRef" :model="formData" label-position="right" label-width="60px" :rules="rules">
        <el-form-item label="角色" prop="roleIds" :rules="[{required:true,message:'请选择角色',trigger: 'blur'}]">
          <el-select v-model="formData.roleIds" multiple placeholder="请选择" style="width:100%">
            <el-option
              v-for="role in roleOptions"
              :key="role.roleId"
              :label="role.roleName"
              :value="role.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dispatchVisible = false">取 消</el-button>
        <el-button type="primary" @click="dispatchHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, addUser, editUser, deleteUser, grantRole } from '@/api/system/user'
import { getPostList } from '@/api/system/post'
import { getRoleList } from '@/api/system/role'
import { getDeptList } from '@/api/system/dept'
import { lrPagination } from '@/base-npm/index'
// 默认表单数据
const defaultFormData = () => {
  return {
    roleIds: []
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
      userId: undefined,

      formData: defaultFormData(),
      rules: {
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入登录账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' }
        ],
        email: [
          {
            type: 'email',
            message: "'请输入正确的邮箱地址",
            trigger: ['blur', 'change']
          }
        ],
        phonenumber: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      },

      sexOptions: [], // 性别列表
      statusOptions: [], // 状态列表
      postOptions: [], // 岗位列表
      roleOptions: [], // 角色列表

      ancestorsInfo: {}, // 部门选择框选中的信息
      deptVisible: false, // 部门选择弹窗是否可见
      filterText: '', // 部门选择搜索框
      filterList: [], // 选择部门列表
      defaultCheckedKeys: [], // 默认选中的部门

      dispatchVisible: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getList()
    // this.getDicts({ type: 'sys_user_sex' }).then(res => (this.sexOptions = res))
    // this.getDicts({ type: 'sys_user_status' }).then(res => (this.statusOptions = res))
    // getPostList({ pageNum: 1, pageSize: 99999 }).then(res => (this.postOptions = res.list))
    getRoleList({ pageNum: 1, pageSize: 99999 }).then(res => (this.roleOptions = res.list))
    // getDeptList({}).then(res => (this.filterList = this.composeTree(res)))
  },
  methods: {
    showDispatchModal(row) {
      this.dispatchVisible = true
      this.userId = row.userId
      this.$nextTick(() => {
        this.formData.roleIds = row.roleIds ? row.roleIds : []
      })
    },
    dispatchHandle() {
      this.$refs.dispatchRef.validate((valid) => {
        if (valid) {
          grantRole({ userId: this.userId, roleIds: this.formData.roleIds.join(',') }).then(res => {
            if (res) {
              this.msgSuccess('分配成功')
              this.dispatchVisible = false
              this.getList()
            }
          })
        }
      })
    },
    showDeptDialog() {
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
    getList(params = {}) {
      const { pageNum, pageSize } = params
      this.pageNum = pageNum || this.pageNum
      this.pageSize = pageSize || this.pageSize
      this.listLoading = true
      getUserList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        userName: this.listQuery.name
      }).then(res => {
        this.total = res.total
        this.list = res.list
        this.listLoading = false
      })
    },
    submitHandle() {
      this.$refs.modalRef.validate((valid) => {
        if (valid) {
          if (this.userId) {
            this.edit({
              userId: this.userId,
              ...this.formData
            })
          } else {
            this.add(this.formData)
          }
        }
      })
    },
    add(params) {
      addUser(params).then(res => {
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
      editUser(params).then(res => {
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
      deleteUser({ id }).then(res => {
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
        this.userId = row.userId
        this.formData = {
          postName: row.postName, // 岗位名称
          postCode: row.postCode, // 岗位编码
          postSort: row.postSort, // 岗位顺序
          status: row.status, // 状态
          remark: row.remark // 备注
        }
      } else {
        this.userId = undefined
        this.$nextTick(() => {
          this.formData = defaultFormData()
          this.$refs.modalRef.resetFields()
        })
      }
    }
  }
}
</script>

