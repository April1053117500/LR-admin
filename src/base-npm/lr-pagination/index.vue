<template>
  <el-pagination
    :current-page="pageNum"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
export default {
  props: {
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.$emit('getList', { pageSize })
    },
    handleCurrentChange(pageNum) {
      this.$emit('getList', { pageNum })
    }
  }
}
</script>
