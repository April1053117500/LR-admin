<template>
  <el-card shadow="never" class="mb20">
    <div slot="header" class="clearfix">
      <span>基本信息</span>
    </div>
    <el-form ref="basicForm" :model="basicForm" :rules="rules" status-icon label-width="120px" class="demo-ruleForm">
      <el-row :gutter="50">
        <el-col :span="24">
          <el-form-item label="编号" prop="visitNo">
            <el-input v-model="basicForm.visitNo" type="text" placeholder="填写后系统自动生成" disabled />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="状态" prop="visitStatus">
            <el-select v-model="basicForm.visitStatus" placeholder="请选择" style="width:100%" disabled>
              <el-option :value="1" label="预约">预约</el-option>
              <el-option :value="2" label="进行中">进行中</el-option>
              <el-option :value="3" label="完结">完结</el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="预约人公司" prop="visitorCompany">
            <el-input v-model="basicForm.visitorCompany" type="text" placeholder="请输入" :disabled="isDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="访问区域" prop="visitLocation">
            <el-input v-model="basicForm.visitLocation" type="text" placeholder="请输入" :disabled="isDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预约到场时间" prop="visitComeDate">
            <el-date-picker
              v-model="basicForm.visitComeDate"
              style="width:100%"
              type="datetime"
              placeholder="选择到场日期时间"
              default-time="12:00:00"
              :disabled="isDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预约离场时间" prop="visitLeaveDate">
            <el-date-picker
              v-model="basicForm.visitLeaveDate"
              style="width:100%"
              type="datetime"
              placeholder="选择离场日期时间"
              default-time="12:00:00"
              :disabled="isDisabled"
            />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
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
    basicInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      basicForm: {
        visitNo: '',
        visitStatus: 1,
        visitorCompany: '',
        visitLocation: '',
        visitComeDate: '',
        visitLeaveDate: ''
      },
      rules: {
        visitorCompany: [
          { required: true, message: '请填写公司名称', trigger: 'blur' }
        ],
        visitLocation: [
          { required: true, message: '请填写访问区域', trigger: 'blur' }
        ],
        visitComeDate: [
          { required: true, message: '请填写预约到场时间', trigger: 'blur' }
        ],
        visitLeaveDate: [
          { required: true, message: '请填写预约离场时间', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    basicInfo(newVal) {
      this.basicForm = JSON.parse(JSON.stringify(newVal))
    }
  }
}
</script>

