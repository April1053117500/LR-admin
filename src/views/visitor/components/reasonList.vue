<template>
  <el-card shadow="never" class="mb20">
    <div slot="header" class="clearfix">
      <span>访问事由</span>
    </div>
    <el-checkbox-group v-model="reason" :disabled="isDisabled">
      <el-checkbox label="参观" />
      <el-checkbox label="线路安装" />
      <el-checkbox label="审计" />
      <el-checkbox label="设备维护" />
      <el-checkbox label="设备进出" />
      <el-checkbox label="磁带运送" />
      <el-checkbox label="其他" />
    </el-checkbox-group>
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
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    reason: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
<style scoped>

</style>
