<template>
  <el-card shadow="never" class="mb20">
    <div slot="header" class="clearfix">
      <span>人员信息（{{ userList.length }}人）</span>
      <!-- <el-button style="float: right;" type="danger" size="mini" icon="el-icon-delete" />
      <el-button class="mr10" style="float: right;" type="primary" size="mini" icon="el-icon-plus" /> -->
    </div>
    <el-table
      v-if="userList.length>0"
      border
      :data="userList"
      style="width: 100%"
      class="mb20"
    >
      <!-- <el-table-column
        type="selection"
        width="55"
      /> -->
      <el-table-column
        prop="name"
        label="姓名"
      />
      <el-table-column
        prop="phone"
        label="手机号"
      />
      <el-table-column
        prop="company"
        label="公司"
      />
      <el-table-column
        prop="idType"
        label="证件类型"
      >
        <template slot-scope="scope">
          {{ scope.row.idType | idTypeText }}
        </template>
      </el-table-column>
      <el-table-column
        prop="idNo"
        label="证件号码"
      />
      <el-table-column
        prop="visitComeDate"
        label="实际到场时间"
      >
        <template slot-scope="scope">
          {{ scope.row.visitComeDate | timeFilter }}
        </template>
      </el-table-column>
      <el-table-column
        prop="visitLeaveDate"
        label="实际离场时间"
      >
        <template slot-scope="scope">
          {{ scope.row.visitLeaveDate | timeFilter }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button class="mr20" type="text" @click="showActualDialog(scope.$index)">核对</el-button>
          <!-- <el-button class="mr20" type="text" @click="showDialog(scope.$index)">编辑</el-button>
          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="deleteUser(scope.$index)"
          >
            <el-button slot="reference" type="text">删除</el-button>
          </el-popconfirm> -->
        </template>
      </el-table-column>
    </el-table>
    <el-button v-if="false" type="primary" plain icon="el-icon-plus" style="width:100%" @click="showDialog()">添加成员</el-button>
    <el-dialog :title="`${userIndex>-1?'编辑':'添加'}成员`" :visible.sync="visible">
      <el-form ref="form" :model="userInfo" :rules="rules" label-width="80px" label-position="right">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userInfo.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userInfo.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="公司名称" prop="company">
          <el-input v-model="userInfo.company" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="证件类型" prop="idType">
          <el-select v-model="userInfo.idType" placeholder="请选择" style="width:100%">
            <el-option :value="1" label="身份证">身份证</el-option>
            <el-option :value="2" label="护照">护照</el-option>
            <el-option :value="3" label="驾照">驾照</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="idNo">
          <el-input v-model="userInfo.idNo" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandle">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="核对" :visible.sync="actualVisible">
      <el-form ref="actualForm" :model="actualInfo" label-width="120px" label-position="right">
        <el-form-item
          label="实际到场时间"
          prop="actualComeDate"
          :rules="[
            {required:true, message: '选择实际到场日期时间', trigger: 'blur'}
          ]"
        >
          <el-date-picker
            v-model="actualInfo.actualComeDate"
            style="width:100%"
            type="datetime"
            placeholder="选择实际到场日期时间"
            default-time="12:00:00"
            :disabled="isDisabled"
          />
        </el-form-item>
        <el-form-item label="实际离场时间" prop="actualLeaveDate">
          <el-date-picker
            v-model="actualInfo.actualLeaveDate"
            style="width:100%"
            type="datetime"
            placeholder="选择实际离场日期时间"
            default-time="12:00:00"
            :disabled="isDisabled"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="actualVisible = false">取 消</el-button>
        <el-button type="primary" @click="actualSubmitHandle">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>

</template>
<script>
import dayjs from 'dayjs'
import { comeVisitRecord } from '@/api/inOut'
export default {
  filters: {
    idTypeText(val) {
      const idTypeList = { 1: '身份证', 2: '护照', 3: '驾照' }
      return idTypeList[val]
    },
    timeFilter(time) {
      return time ? dayjs(time).format('YYYY-MM-DD hh:mm') : '-'
    }
  },
  props: {
    isDisabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    visitUsers: {
      type: Array,
      default() {
        return []
      }
    },
    recordId: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      visible: false,
      userIndex: undefined,
      userInfo: this.defaultUserInfo(),
      userList: [],
      rules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写手机号', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请填写公司名称', trigger: 'blur' }
        ],
        idType: [
          { required: true, message: '请选择证件类型', trigger: 'blur' }
        ],
        idNo: [
          { required: true, message: '请填写证件号码', trigger: 'blur' }
        ]
      },
      actualInfo: {
        actualComeDate: undefined,
        actualLeaveDate: undefined
      },
      actualVisible: false

    }
  },
  watch: {
    visitUsers(newVal, oldVal) {
      this.userList = JSON.parse(JSON.stringify(newVal))
    }
  },
  methods: {
    defaultUserInfo() {
      return {
        name: '',
        phone: '',
        company: '',
        idType: 1,
        idNo: ''
      }
    },
    showDialog(index) {
      this.visible = true
      this.userIndex = index
      if (index > -1) {
        this.userInfo = this.userList[index]
      } else {
        this.userInfo = this.defaultUserInfo()
      }
    },
    submitHandle() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.userIndex > -1) {
            this.userList.splice(this.userIndex, 1, this.userInfo)
          } else {
            this.userList.push({ ...this.userInfo })
          }

          this.visible = false
        }
      })
    },
    deleteUser(index) {
      this.userList.splice(index, 1)
    },

    showActualDialog(index) {
      this.actualVisible = true
      this.actualIndex = index
      this.actualInfo = {
        actualComeDate: this.userList[index].actualComeDate,
        actualLeaveDate: this.userList[index].actualLeaveDate
      }
    },
    actualSubmitHandle() {
      this.$refs.actualForm.validate((valid) => {
        if (valid) {
          comeVisitRecord({
            id: this.recordId,
            visitUsers: [{
              id: this.userList[this.actualIndex].id,
              actualComeDate: dayjs(this.actualInfo.actualComeDate).format('YYYY-MM-DD hh:mm'),
              actualLeaveDate: dayjs(this.actualInfo.actualLeaveDate).format('YYYY-MM-DD hh:mm')
            }]
          }).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '核对成功'
              })
              this.actualVisible = false
              this.$emit('refresh')
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped>

</style>
