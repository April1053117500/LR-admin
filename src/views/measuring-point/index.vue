<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="listQuery" :model="listQuery" :inline="true">
        <el-form-item label="计量点编号">
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
        <!-- <el-table-column label="id" prop="id" /> -->
        <el-table-column label="计量点编号" prop="cabinetNo" />
        <el-table-column label="位置信息" prop="powerRate" />
        <el-table-column label="计量点类型" prop="cabinetType" />
        <el-table-column label="位置类型" prop="cabinetCapacity" />
        <el-table-column label="抄表次数" prop="pduId" />
        <el-table-column label="参考类型" prop="pduId" />
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button type="text" class="mr10" @click="showDialog2(scope.row)">抄表</el-button>
            <el-button type="text" class="mr10" @click="showDialog2(scope.row)">查看记录</el-button>
            <el-button type="text" class="mr10" @click="showDialog(scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除该条数据吗？" @onConfirm="handleDelete">
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination class="mt20" :current-page="1" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>

    <el-dialog title="添加计量点" :visible.sync="dialogVisible" width="600px" label-width="120px" label-position="right">
      <el-form ref="modalRef" label-position="right" label-width="100px" :model="formData">
        <el-form-item label="计量点编号" prop="cabinetNo">
          <el-input v-model="formData.cabinetNo" />
        </el-form-item>
        <el-form-item label="位置信息" prop="powerRate">
          <el-input v-model="formData.powerRate" />
        </el-form-item>
        <el-form-item label="计量点类型" prop="cabinetType">
          <el-input v-model="formData.cabinetType" />
        </el-form-item>
        <el-form-item label="位置类型" prop="cabinetCapacity">
          <el-input v-model="formData.cabinetCapacity" />
        </el-form-item>
        <el-form-item label="抄表次数" prop="pduId">
          <el-input v-model="formData.pduId" />
        </el-form-item>
        <el-form-item label="参考类型" prop="pduId">
          <el-input v-model="formData.pduId" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增抄表记录" :visible.sync="dialogVisible2" width="1000px" label-width="120px" label-position="right">
      <el-form ref="modalRef" label-position="right" label-width="100px" :model="formData">
        <el-form-item label="电表编号" prop="cabinetNo">
          <el-input v-model="formData.cabinetNo" />
        </el-form-item>
        <el-form-item label="电表类型" prop="powerRate">
          <el-radio-group v-model="formData.powerRate">
            <el-radio label="主要" />
            <el-radio label="参考" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="md" prop="cabinetType" class="custom">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-input v-model="formData.cabinetType">
                <template slot="prepend">峰</template>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="formData.cabinetType">
                <template slot="prepend">平1</template>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="formData.cabinetType">
                <template slot="prepend">平2</template>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="formData.cabinetType">
                <template slot="prepend">谷</template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="电量（kwh）" prop="cabinetType" class="custom">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-input v-model="formData.cabinetType">
                <template slot="prepend">峰</template>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="formData.cabinetType">
                <template slot="prepend">平1</template>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="formData.cabinetType">
                <template slot="prepend">平2</template>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="formData.cabinetType">
                <template slot="prepend">谷</template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="LR侧抄录人" prop="cabinetCapacity">
          <el-popover
            placement="right"
            width="280"
            trigger="click"
            popper-class="custom-popover"
          >
            <person-selection />
            <i slot="reference" class="el-icon-user custom-icon borderd" />
          </el-popover>
        </el-form-item>
        <el-form-item label="腾讯侧负责人" prop="pduId">
          <i class="el-icon-user custom-icon borderd" @click="memberVisible=true" />
        </el-form-item>
        <el-form-item label="附件" prop="pduId">
          <el-upload>
            <i class="el-icon-upload custom-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <member-selection :member-visible="memberVisible" @close="memberVisible= false" />
  </div>
</template>

<script>
import PersonSelection from '@/components/PersonSelection'
import MemberSelection from '@/components/MemberSelection'
import { getCabinetList } from '@/api/customer'

export default {
  components: {
    PersonSelection,
    MemberSelection
  },
  data() {
    return {
      listLoading: false,
      // 模糊搜索数据
      listQuery: {
        name: ''
      },
      // 用户列表
      list: [],
      // 新增计量点弹窗
      dialogVisible: false,
      // 新增抄表记录弹窗
      dialogVisible2: false,
      // 成员选择框
      memberVisible: false,

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
    },
    showDialog2() {
      this.dialogVisible2 = true
    }
  }
}
</script>

<style lang="scss">
.custom.el-form-item{
  .el-form-item__content{
    overflow: hidden;
  }
}
.el-form-item{
  .el-form-item__content{
    .custom-icon{
      font-size: 18px;
      padding: 6px;
      cursor: pointer;
      &.borderd{
        border: 1px solid #DCDFE6;
         border-radius: 50%;
      }
    }
  }
}
.custom-popover{
  padding: 20px 30px;
  height: 300px;
  overflow: auto;
}
</style>
