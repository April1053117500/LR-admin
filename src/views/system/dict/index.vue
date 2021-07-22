<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="listQuery" :model="listQuery" :inline="true">
        <el-form-item label="字典名称">
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
        <el-table-column label="字典主键" prop="dictId" />
        <el-table-column label="字典名称" prop="dictName" />
        <el-table-column label="字典类型" prop="dictType" />
        <el-table-column label="状态" prop="status" width="70">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0">正常</el-tag>
            <el-tag v-if="scope.row.status==1" type="danger">停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showDialog(scope.row)">编辑</el-button>
            <el-button type="text" class="mr10" @click="goDetail(scope.row)">列表</el-button>
            <el-popconfirm title="确定删除该条数据吗？" @onConfirm="handleDelete(scope.row.dictId)">
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <lr-pagination class="mt20" :total="total" :page-num="pageNum" :page-size="pageSize" @getList="getList" />
      <!-- <el-pagination class="mt20" :current-page="1" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
    </el-card>

    <el-dialog :title="`${dictId?'编辑':'添加'}类型`" :visible.sync="dialogVisible" width="600px" label-width="120px" label-position="right">
      <el-form ref="modalRef" :model="formData" label-position="right" label-width="100px" :rules="rules">
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="formData.dictName" />
        </el-form-item>
        <el-form-item label="字典类型" prop="dictType">
          <el-input v-model="formData.dictType" />
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
import { getDictTypeList, addDictType, editDictType, deleteDictType } from '@/api/system/dict'
import { lrPagination } from '@/base-npm/index'

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
      dictId: undefined,

      formData: this.defaultFormData(),
      rules: {
        dictName: [
          { required: true, message: '请输入字典名称', trigger: 'blur' }
        ],
        dictType: [
          { required: true, message: '请输入字典类型', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    defaultFormData() {
      return {
        dictName: '',
        dictType: '',
        status: '0',
        remark: ''
      }
    },
    getList(params = {}) {
      const { pageNum, pageSize } = params
      this.pageNum = pageNum || this.pageNum
      this.pageSize = pageSize || this.pageSize
      this.listLoading = true
      getDictTypeList({
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
          if (this.dictId) {
            this.edit({
              dictId: this.dictId,
              ...this.formData
            })
          } else {
            this.add(this.formData)
          }
        }
      })
    },
    add(params) {
      addDictType(params).then(res => {
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
      editDictType(params).then(res => {
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
      deleteDictType({ id }).then(res => {
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
      console.log()
      this.dialogVisible = true
      if (row) {
        this.dictId = row.dictId
        this.formData = {
          dictName: row.dictName,
          dictType: row.dictType,
          status: row.status,
          remark: row.remark
        }
      } else {
        this.dictId = undefined
        this.$nextTick(() => {
          this.formData = this.defaultFormData()
          this.$refs.modalRef.resetFields()
        })
      }
    },
    goDetail(row) {
      this.$router.push({
        path: '/system/dict/detail',
        query: { type: row.dictType, typeId: row.dictId }
      })
    }
  }
}
</script>

