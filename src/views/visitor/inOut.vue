<template>
  <div class="app-container">
    <template v-if="visitNo">
      <BasicInfo :basic-info="basicInfo" :is-disabled="true" />
      <VisitorList ref="visitorRef" :visit-users="visitUsers" :record-id="recordId" @refresh="fetchData" />
      <CarList ref="carRef" :visit-cars="visitCars" :is-disabled="true" />
      <EquipmentList ref="equipmentRef" :visit-devices="visitDevices" :is-disabled="true" />
      <ReasonList v-model="reason" :is-disabled="true" />
      <Remark v-model="remark" :is-disabled="true" />
    </template>
    <template v-else>
      <h3 style="margin-bottom:60px">出入申请查询</h3>
      <MDinput v-model="keywords" name="keywords" placeholder="请输入编号，按Enter键进行查询" @keyup.enter.native="enterHandle">编号</MDinput>
    </template>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import BasicInfo from './components/basicInfo'
import VisitorList from './components/visitorList'
import CarList from './components/carList'
import EquipmentList from './components/equipmentList'
import ReasonList from './components/reasonList'
import Remark from './components/remark'
import { checkVisitRecord } from '@/api/inOut'
import { getLocationTree } from '@/api/space'

export default {
  components: {
    MDinput,
    BasicInfo,
    VisitorList,
    CarList,
    EquipmentList,
    ReasonList,
    Remark
  },
  data() {
    return {
      loading: '',
      keywords: '',
      recordId: 0, // 记录id
      visitNo: '', // 访客编号
      total: 0, // 查询结果条数
      basicInfo: {},
      visitUsers: [],
      visitCars: [],
      visitDevices: [],
      reason: [],
      remark: ''
    }
  },
  created() {
    this.visitNo = this.$route.params.visitNo
    this.visitNo && this.fetchData()

    // getLocationTree({ level: 0 }).then(res => {
    //   console.log('res====', res)
    // })
  },
  methods: {
    enterHandle() {
      this.loading = this.$loading({
        lock: true,
        text: '查询中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.5)'
      })
      this.fetchData()
    },
    fetchData() {
      checkVisitRecord({
        visitNo: this.visitNo || this.keywords
      }).then(res => {
        this.loading && this.loading.close()
        if (res.code === 200) {
          if (this.visitNo) {
            this.recordId = res.data.id
            this.basicInfo = {
              visitNo: res.data.visitNo,
              visitStatus: res.data.visitStatus,
              visitorCompany: res.data.visitorCompany,
              visitLocation: res.data.visitLocation[0],
              visitComeDate: res.data.visitComeDate,
              visitLeaveDate: res.data.visitLeaveDate,
              visitUserName: res.data.visitUserName,
              visitUserPhone: res.data.visitUserPhone,
              visitUserPhoneCode: res.data.visitUserPhoneCode
            }
            this.visitUsers = res.data.visitUsers || []
            this.visitCars = res.data.visitCars || []
            this.visitDevices = res.data.visitDevices || []
            this.reason = res.data.visitReason ? res.data.visitReason.split(',') : []
            this.remark = res.data.remarks
          } else {
            this.$router.push(`/visitor/inOut/index/${res.data.visitNo}`)
          }
        }
      })
    }
  }
}
</script>

<style>
.el-card__header{
  background: #EBEEF5;
}
</style>
