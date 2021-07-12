<template>
  <el-card shadow="never" class="mb20">
    <div slot="header" class="clearfix">
      <span>备注</span>
    </div>
    <el-input v-model="reason" :disabled="isDisabled" type="textarea" :rows="6" placeholder="请输入" />
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
      type: String,
      default: ''
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
