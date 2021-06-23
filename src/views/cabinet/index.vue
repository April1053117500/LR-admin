<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="listQuery" :model="listQuery" :inline="true">
        <el-form-item label="机柜编号">
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
        <el-table-column label="机柜编号" prop="cabinetNo" />
        <el-table-column label="额定功率" prop="powerRate" />
        <el-table-column label="机柜类型" prop="cabinetType" />
        <el-table-column label="机柜容量" prop="cabinetCapacity" />
        <el-table-column label="pduId" prop="pduId" />
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

    <el-dialog title="添加机柜" :visible.sync="dialogVisible" width="600px" label-width="120px" label-position="right">
      <el-form ref="modalRef" label-position="right" label-width="100px" :model="formData">
        <el-form-item label="机柜编号" prop="cabinetNo">
          <el-input v-model="formData.cabinetNo" />
        </el-form-item>
        <el-form-item label="额定功率" prop="powerRate">
          <el-input v-model="formData.powerRate" />
        </el-form-item>
        <el-form-item label="机柜类型" prop="cabinetType">
          <el-input v-model="formData.cabinetType" />
        </el-form-item>
        <el-form-item label="机柜容量" prop="cabinetCapacity">
          <el-input v-model="formData.cabinetCapacity" />
        </el-form-item>
        <el-form-item label="pduId" prop="pduId">
          <el-input v-model="formData.pduId" />
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
import { getCabinetList } from '@/api/customer'

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
        cabinetNo: '',
        powerRate: '',
        cabinetType: '',
        cabinetCapacity: '',
        pduId: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getCabinetList().then(res => {
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
          cabinetNo: row.cabinetNo,
          powerRate: row.powerRate,
          cabinetType: row.cabinetType,
          cabinetCapacity: row.cabinetCapacity,
          pduId: row.pduId
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
