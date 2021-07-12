<template>
  <el-card shadow="never" class="mb20">
    <div slot="header" class="clearfix">
      <span>设备清单（{{ equipmentList.length }}件）</span>
    </div>
    <el-table
      v-if="equipmentList.length>0"
      border
      :data="equipmentList"
      style="width: 100%"
      class="mb20"
    >
      <el-table-column
        prop="deviceType"
        label="设备类型"
        width="180"
      />
      <el-table-column
        prop="quantity"
        label="数量"
      />
      <el-table-column
        prop="sn"
        label="设备序列号"
      />
      <el-table-column
        prop="name"
        label="设备名称"
      />
      <el-table-column
        prop="deviceModel"
        label="设备型号"
      />
      <el-table-column v-if="!isDisabled" label="操作">
        <template slot-scope="scope">
          <el-button class="mr20" type="text" @click="showDialog(scope.$index)">编辑</el-button>
          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="deleteHandle(scope.$index)"
          >
            <el-button slot="reference" type="text">删除</el-button>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <el-button v-if="!isDisabled" type="primary" plain icon="el-icon-plus" style="width:100%" @click="showDialog()">添加设备</el-button>
    <el-dialog :title="`${equipmentIndex>-1?'编辑':'添加'}设备`" :visible.sync="visible">
      <el-form ref="form" :model="equipmentInfo" :rules="rules" :label-width="formLabelWidth" label-position="right">
        <el-form-item label="设备类型" prop="deviceType">
          <el-input v-model="equipmentInfo.deviceType" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input-number v-model="equipmentInfo.quantity" :min="1" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="设备序列号" prop="sn">
          <el-input v-model="equipmentInfo.sn" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="equipmentInfo.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="设备型号" prop="deviceModel">
          <el-input v-model="equipmentInfo.deviceModel" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandle">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>

</template>
<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    visitDevices: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      formLabelWidth: '100px',
      visible: false,
      equipmentIndex: undefined,
      equipmentInfo: this.defaultEquipmentInfo(),
      equipmentList: [],
      rules: {
        name: [
          { required: true, message: '请填写设备名称', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: '请填写数量', trigger: 'blur' }
        ],
        sn: [
          { required: true, message: '请填写设备序列号', trigger: 'blur' }
        ],
        deviceType: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ],
        deviceModel: [
          { required: true, message: '请填写设备型号', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visitDevices(newVal, oldVal) {
      this.equipmentList = JSON.parse(JSON.stringify(newVal))
    }
  },
  methods: {
    defaultEquipmentInfo() {
      return {
        deviceType: '',
        quantity: '',
        sn: '',
        name: '',
        deviceModel: ''
      }
    },
    showDialog(index) {
      this.visible = true
      this.equipmentIndex = index
      if (index > -1) {
        this.equipmentInfo = this.equipmentList[index]
      } else {
        this.equipmentInfo = this.defaultEquipmentInfo()
      }
    },
    submitHandle() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.equipmentIndex > -1) {
            this.equipmentList.splice(this.equipmentIndex, 1, this.equipmentInfo)
          } else {
            this.equipmentList.push({ ...this.equipmentInfo })
          }

          this.visible = false
        }
      })
    },
    deleteHandle(index) {
      this.equipmentList.splice(index, 1)
    }
  }
}
</script>
<style scoped>

</style>
