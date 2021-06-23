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
          <el-button type="primary" @click="showDialog(null,'添加')">添加</el-button>
        </el-col>
      </el-row>

      <el-table v-loading="listLoading" :data="list" border>
        <el-table-column label="id" prop="id" />
        <el-table-column label="服务器名称" prop="serverName" />
        <el-table-column label="系统名称" prop="sysName" />
        <el-table-column label="内网IP" prop="internalIp" />
        <el-table-column label="idracIp" prop="idracIp" />
        <el-table-column label="idrac密码" prop="idracPassword" />
        <el-table-column label="万兆口左" prop="opticalModuleLeft" />
        <el-table-column label="万兆口右" prop="opticalModuleRight" />
        <el-table-column label="服务器登录名称" prop="serverLoginPassword" />
        <el-table-column label="快速服务代码" prop="quickServiceCode" />
        <el-table-column label="服务编号" prop="serviceNumber" />
        <el-table-column label="服务器位置" prop="serverLocation" />

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showDialog(scope.row, '复制')">复制</el-button>
            <el-button type="text" @click="showDialog(scope.row, '编辑')">编辑</el-button>
            <el-popconfirm class="ml10" title="确定删除该条数据吗？" @onConfirm="handleDelete">
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination class="mt20" :current-page="pageNo" :page-sizes="[1, 10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>

    <el-dialog :title="dialogTitle+'服务器'" :visible.sync="dialogVisible" width="1000px" label-width="120px" label-position="right">
      <el-form ref="modalRef" label-position="right" label-width="120px" :model="formData">
        <el-form-item label="服务器名称" prop="serverName">
          <el-input v-model="formData.serverName" placeholder="请输入服务器名称" />
        </el-form-item>
        <el-form-item label="系统名称" prop="sysName">
          <el-input v-model="formData.sysName" placeholder="请输入系统名称" />
        </el-form-item>
        <el-form-item label="内网IP" prop="internalIp">
          <el-input v-model="formData.internalIp" placeholder="请输入内网IP" />
        </el-form-item>
        <el-form-item label="idracIP" prop="idracIp">
          <el-input v-model="formData.idracIp" placeholder="请输入idracIP" />
        </el-form-item>
        <el-form-item label="idrac密码" prop="idracPassword">
          <el-input v-model="formData.idracPassword" placeholder="请输入idrac密码" />
        </el-form-item>
        <el-form-item label="万兆口左" prop="opticalModuleLeft">
          <el-input v-model="formData.opticalModuleLeft" placeholder="请输入万兆口左" />
        </el-form-item>
        <el-form-item label="万兆口右" prop="opticalModuleRight">
          <el-input v-model="formData.opticalModuleRight" placeholder="请输入万兆口右" />
        </el-form-item>
        <el-form-item label="服务器登录名称" prop="serverLoginPassword">
          <el-input v-model="formData.serverLoginPassword" placeholder="请输入服务器登录名称" />
        </el-form-item>
        <el-form-item label="快速服务代码" prop="quickServiceCode">
          <el-input v-model="formData.quickServiceCode" placeholder="请输入快速服务代码" />
        </el-form-item>
        <el-form-item label="服务编号" prop="serviceNumber">
          <el-input v-model="formData.serviceNumber" placeholder="请输入服务编号" />
        </el-form-item>
        <el-form-item label="服务器位置" prop="serverLocation">
          <el-input v-model="formData.serverLocation" placeholder="请输入服务器位置" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDcimServerList, addDcimServer } from '@/api/servers'

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
      dialogTitle: '',

      formData: {
        serverName: '',
        sysName: '',
        internalIp: '',
        idracIp: '',
        idracPassword: '',
        opticalModuleLeft: '',
        opticalModuleRight: '',
        serverLoginPassword: '',
        quickServiceCode: '',
        serviceNumber: '',
        serverLocation: ''
      },
      pageNo: 1,
      pageSize: 10,
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getDcimServerList({
        'keyword': '211',
        'pageIndex': this.pageNo,
        'pageSize': this.pageSize,
        'pageSorts': [
          {
            'asc': true,
            'column': ''
          }
        ]
      }).then(res => {
        this.list = res.data.list
        this.total = res.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.getList()
    },
    handleCurrentChange(no) {
      this.pageNo = no
      this.getList()
    },
    // 确认删除
    handleDelete() {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.getList()
    },
    showDialog(row, title) {
      this.dialogTitle = title
      this.dialogVisible = true
      if (row) {
        this.formData = {
          // id:row.id,
          serverName: row.serverName,
          sysName: row.sysName,
          internalIp: row.internalIp,
          idracIp: row.idracIp,
          idracPassword: row.idracPassword,
          opticalModuleLeft: row.opticalModuleLeft,
          opticalModuleRight: row.opticalModuleRight,
          serverLoginPassword: row.serverLoginPassword,
          quickServiceCode: row.quickServiceCode,
          serviceNumber: row.serviceNumber,
          serverLocation: row.serverLocation
        }
        if (title === '编辑') {
          this.formData.id = row.id
        }
      } else {
        this.$nextTick(() => {
          this.$refs.modalRef.resetFields()
        })
      }
    },
    // 点击添加
    handleAdd() {
      console.log('this.formData===', this.formData)
      addDcimServer({
        ...this.formData
      }).then(res => {
        console.log('res====', res)
        this.$message({
          message: res.message,
          type: 'success'
        })
        this.dialogVisible = false
        this.getList()
      })
    }
  }
}
</script>
