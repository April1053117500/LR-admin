<template>
  <div class="dashboard-container">
    <el-aside class="dashboard-aside" width="330px">
      <el-card :class="['idc', activeIdc==='SH'?'':'gray']" @click.native="activeIdc='SH'">
        <img :src="bgImg">
        <div class="box">上海IDC</div>
      </el-card>
      <el-card :class="['idc', activeIdc==='SZ'?'':'gray']" @click.native="activeIdc='SZ'">
        <img :src="bgImg">
        <div class="box">深圳IDC</div>
      </el-card>
      <el-card :class="['idc', activeIdc==='HF'?'':'gray']" @click.native="activeIdc='HF'">
        <img :src="bgImg">
        <div class="box">合肥IDC</div>
      </el-card>
    </el-aside>

    <el-divider direction="vertical" style="height:100vh" />

    <el-main class="dashboard-main">
      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <raddar-chart />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <bar-chart />
          </div>
        </el-col>
      </el-row>

      <el-divider />

      <el-row :gutter="32" class="mt20">
        <el-col v-for="index in 16" :key="index" :xs="8" :sm="2" :lg="4">
          <div class="build">
            {{ index }}栋
          </div>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

export default {
  name: 'Dashboard',
  components: {
    RaddarChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      bgImg: require('../../assets/dashboard/1.png'),
      activeIdc: 'SH'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    display: flex;
  }
  &-aside {
    // border-right: 1px solid #ddd;
    padding-right: 30px;
    height: 100vh;
    .idc{
      position: relative;
      cursor: pointer;
      height: 180px;
      margin-bottom:20px;
      color: #fff;
      font-size: 30px;
      img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: all .2s linear;
        transform: scale(1.1);
        z-index: 1;
      }
      .box{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        padding: 20px;
      }
      &.gray{
        filter: grayscale(1) opacity(0.8);
        img{
          transform: scale(1);
          filter: blur(1px);
        }
      }
    }
  }
  &-main{
    .build{
      height: 80px;
      background: #5ab1ef;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      border-radius: 10px;
      margin-top: 30px;
      cursor: pointer;
    }
  }
}
</style>
