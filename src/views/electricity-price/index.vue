<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="listQuery" :model="listQuery" :inline="true">
        <el-form-item label="客户名称">
          <el-input v-model="listQuery.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb20">
        <el-col>
          <el-button type="primary" @click="showDialog">添加</el-button>
        </el-col>
      </el-row>

      <el-table v-loading="listLoading" :data="list" border>
        <el-table-column label="id" prop="id" />
        <el-table-column label="客户号" prop="customerNo" />
        <el-table-column label="客户名称" prop="customerName" />
        <el-table-column label="客户联系方式" prop="customerContactInformation" />
        <el-table-column label="客户等级" prop="customerLevel" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" class="mr10" @click="showDialog(scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除该条数据吗？" @onConfirm="handleDelete">
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination class="mt20" :current-page="1" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>

    <el-dialog title="添加客户" :visible.sync="dialogVisible" width="600px" label-width="120px" label-position="right">
      <el-form ref="modalRef" label-position="right" label-width="100px" :model="formData">
        <el-form-item label="客户号" prop="no">
          <el-input v-model="formData.no" />
        </el-form-item>
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="客户联系方式" prop="phone">
          <el-input v-model="formData.phone" />
        </el-form-item>
        <el-form-item label="客户等级" prop="level">
          <el-input v-model="formData.level" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCustomerList } from '@/api/customer'

export default {
  data() {
    return {
      listLoading: false,
      // 模糊搜索数据
      listQuery: {
        name: ''
      },
      // 用户列表
      list: [],
      // 弹窗是否显示
      dialogVisible: false,

      formData: {
        no: '',
        name: '',
        phone: '',
        level: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getCustomerList().then(res => {
        this.list = res.data.items
        this.listLoading = false
      })
    },
    handleSizeChange() { },
    handleCurrentChange() { },
    // 确认删除
    handleDelete() {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.getList()
    },
    showDialog(row) {
      this.dialogVisible = true
      if (row) {
        this.formData = {
          no: row.customerNo,
          name: row.customerName,
          phone: row.customerContactInformation,
          level: row.customerLevel
        }
      } else {
        this.$nextTick(() => {
          this.$refs.modalRef.resetFields()
        })
      }
    }
  }
}
</script>
