<template>
  <el-card shadow="never" class="mb20">
    <div slot="header" class="clearfix">
      <span>车辆信息（{{ carList.length }}辆）</span>
    </div>
    <el-table
      v-if="carList.length>0"
      border
      :data="carList"
      style="width: 100%"
      class="mb20"
    >
      <el-table-column
        prop="carNo"
        label="车牌号码"
        width="180"
      />
      <el-table-column
        prop="carType"
        label="车辆类型"
        width="180"
      />
      <el-table-column
        prop="carContacts"
        label="联系人"
      />
      <el-table-column
        prop="contactsPhone"
        label="电话"
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
    <el-button v-if="!isDisabled" type="primary" plain icon="el-icon-plus" style="width:100%" @click="showDialog()">添加车辆</el-button>
    <el-dialog :title="`${carIndex>-1?'编辑':'添加'}车辆`" :visible.sync="visible">
      <el-form ref="form" :model="carInfo" :rules="rules" label-position="right" :label-width="formLabelWidth">
        <el-form-item label="车牌号码" prop="carNo">
          <el-input v-model="carInfo.carNo" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="车辆类型" prop="carType">
          <el-select v-model="carInfo.carType" placeholder="请选择" style="width:100%">
            <el-option value="轿车">轿车</el-option>
            <el-option value="汽车">汽车</el-option>
            <el-option value="货车">货车</el-option>
            <el-option value="挂车">挂车</el-option>
            <el-option value="客车">客车</el-option>
            <el-option value="摩托车">摩托车</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人" prop="carContacts">
          <el-input v-model="carInfo.carContacts" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手机号" prop="contactsPhone">
          <el-input v-model="carInfo.contactsPhone" placeholder="请输入" />
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
    visitCars: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      formLabelWidth: '80px',
      visible: false,
      carIndex: undefined,
      carInfo: this.defaultCarInfo(),
      carList: [],
      rules: {
        carNo: [
          { required: true, message: '请填写车牌号码', trigger: 'blur' }
        ],
        carType: [
          { required: true, message: '请填写车辆类型', trigger: 'blur' }
        ],
        carContacts: [
          { required: true, message: '请填写联系人姓名', trigger: 'blur' }
        ],
        contactsPhone: [
          { required: true, message: '请填写联系人电话', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visitCars(newVal, oldVal) {
      this.carList = JSON.parse(JSON.stringify(newVal))
    }
  },
  methods: {
    defaultCarInfo() {
      return {
        carNo: '',
        carType: '',
        carContacts: '',
        contactsPhone: ''
      }
    },
    showDialog(index) {
      this.visible = true
      this.carIndex = index
      if (index > -1) {
        this.carInfo = this.carList[index]
      } else {
        this.carInfo = this.defaultCarInfo()
      }
    },
    submitHandle() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.carIndex > -1) {
            this.carList.splice(this.carIndex, 1, this.carInfo)
          } else {
            this.carList.push({ ...this.carInfo })
          }

          this.visible = false
        }
      })
    },
    deleteHandle(index) {
      this.carList.splice(index, 1)
    }
  }
}
</script>
<style scoped>

</style>
