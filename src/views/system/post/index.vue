<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="listQuery" :model="listQuery" :inline="true">
        <el-form-item label="岗位名称">
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
        <el-table-column label="岗位编号" prop="postId" />
        <el-table-column label="岗位编码" prop="postCode" />
        <el-table-column label="岗位名称" prop="postName" />
        <el-table-column label="岗位排序" prop="postSort" />
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
            <el-popconfirm title="确定删除该条数据吗？" class="ml10" @onConfirm="handleDelete(scope.row.postId)">
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <lr-pagination class="mt20" :total="total" :page-num="pageNum" :page-size="pageSize" @getList="getList" />
      <!-- <el-pagination class="mt20" :current-page="1" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
    </el-card>

    <el-dialog :title="`${postId?'编辑':'添加'}岗位`" :visible.sync="dialogVisible" width="600px" label-width="120px" label-position="right">
      <el-form ref="modalRef" :model="formData" label-position="right" label-width="100px" :rules="rules">
        <el-form-item label="岗位名称" prop="postName">
          <el-input v-model="formData.postName" />
        </el-form-item>
        <el-form-item label="岗位编码" prop="postCode">
          <el-input v-model="formData.postCode" />
        </el-form-item>
        <el-form-item label="岗位顺序" prop="postSort">
          <el-input-number v-model="formData.postSort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio label="0">正常</el-radio>
            <el-radio label="1">停用</el-radio>
          </el-radio-group>
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
import { getPostList, addPost, editPost, deletePost } from '@/api/system/post'
import { lrPagination } from '@/base-npm/index'
// 默认表单数据
const defaultFormData = () => {
  return {
    postName: '', // 岗位名称
    postCode: '', // 岗位编码
    postSort: '', // 岗位顺序
    status: '0', // 状态
    remark: '' // 备注
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
        postName: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' }
        ],
        postCode: [
          { required: true, message: '请输入岗位编码', trigger: 'blur' }
        ],
        postSort: [
          { required: true, message: '请输入岗位顺序', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(params = {}) {
      const { pageNum, pageSize } = params
      this.pageNum = pageNum || this.pageNum
      this.pageSize = pageSize || this.pageSize
      this.listLoading = true
      getPostList({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.total = res.total
        this.list = res.list
        this.listLoading = false
      })
    },
    submitHandle() {
      this.$refs.modalRef.validate((valid) => {
        if (valid) {
          if (this.postId) {
            this.edit({
              postId: this.postId,
              ...this.formData
            })
          } else {
            this.add(this.formData)
          }
        }
      })
    },
    add(params) {
      addPost(params).then(res => {
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
      editPost(params).then(res => {
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
      deletePost({ id }).then(res => {
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
        this.postId = row.postId
        this.formData = {
          postName: row.postName, // 岗位名称
          postCode: row.postCode, // 岗位编码
          postSort: row.postSort, // 岗位顺序
          status: row.status, // 状态
          remark: row.remark // 备注
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

