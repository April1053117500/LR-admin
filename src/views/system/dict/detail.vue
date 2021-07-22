<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="listQuery" :model="listQuery" :inline="true">
        <el-form-item label="字典标签">
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
        <el-table-column label="字典编码" prop="dictCode" />
        <el-table-column label="字典标签" prop="dictLabel" />
        <el-table-column label="字典键值" prop="dictValue" />
        <el-table-column label="字典排序" prop="dictSort" />
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
            <el-button type="text" class="mr10" @click="showDialog(scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除该条数据吗？" @onConfirm="handleDelete(scope.row.dictCode)">
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <lr-pagination class="mt20" :total="total" :page-num="pageNum" :page-size="pageSize" @getList="getList" />
      <!-- <el-pagination class="mt20" :current-page="1" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
    </el-card>

    <el-dialog :title="`${dictCode?'编辑':'添加'}类型`" :visible.sync="dialogVisible" width="600px" label-width="120px" label-position="right">
      <el-form ref="modalRef" :model="formData" label-position="right" label-width="100px" :rules="rules">
        <el-form-item label="字典标签" prop="dictLabel">
          <el-input v-model="formData.dictLabel" />
        </el-form-item>
        <el-form-item label="字典键值" prop="dictValue">
          <el-input v-model="formData.dictValue" />
        </el-form-item>
        <el-form-item label="字典类型">
          <el-input v-model="dictType" disabled />
        </el-form-item>
        <el-form-item label="样式属性" prop="cssClass">
          <el-input v-model="formData.cssClass" />
        </el-form-item>
        <el-form-item label="字典排序" prop="dictSort">
          <el-input-number v-model="formData.dictSort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="回显样式" prop="listClass">
          <el-input v-model="formData.listClass" />
        </el-form-item>
        <el-form-item label="系统默认" prop="isDefault">
          <el-radio-group v-model="formData.isDefault">
            <el-radio label="Y">是</el-radio>
            <el-radio label="N">否</el-radio>
          </el-radio-group>
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
import { getDictDataList, addDictData, editDictData, deleteDictData } from '@/api/system/dict'
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
      dictCode: undefined,
      dictType: '',

      formData: this.defaultFormData(),
      rules: {
        dictLabel: [
          { required: true, message: '请输入字典标签', trigger: 'blur' }
        ],
        dictValue: [
          { required: true, message: '请输入字典键值', trigger: 'blur' }
        ],
        dictSort: [
          { required: true, message: '请输入字典排序', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.dictType = this.$route.query.type
    this.dictId = this.$route.query.typeId
    this.getList()
  },
  methods: {
    defaultFormData() {
      return {
        dictLabel: '',
        dictValue: '',
        cssClass: '',
        dictSort: '',
        listClass: '',
        isDefault: 'Y',
        status: '0',
        remark: ''
      }
    },
    getList() {
      this.listLoading = true
      getDictDataList({
        type: this.dictType
      }).then(res => {
        this.list = res
        this.listLoading = false
      })
    },
    submitHandle() {
      this.$refs.modalRef.validate((valid) => {
        if (valid) {
          if (this.dictCode) {
            this.edit({
              dictCode: this.dictCode,
              dictType: this.dictType,
              typeId: this.dictId,
              ...this.formData
            })
          } else {
            this.add({
              dictType: this.dictType,
              typeId: this.dictId,
              ...this.formData
            })
          }
        }
      })
    },
    add(params) {
      addDictData(params).then(res => {
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
      editDictData(params).then(res => {
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
      deleteDictData({ id }).then(res => {
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
        this.dictCode = row.dictCode
        this.formData = {
          dictLabel: row.dictLabel,
          dictValue: row.dictValue,
          cssClass: row.cssClass,
          dictSort: row.dictSort,
          listClass: row.listClass,
          isDefault: row.isDefault,
          status: row.status,
          remark: row.remark
        }
      } else {
        this.dictCode = undefined
        this.$nextTick(() => {
          this.formData = this.defaultFormData()
          this.$refs.modalRef.resetFields()
        })
      }
    }
  }
}
</script>

