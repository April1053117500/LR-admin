<template>
  <div class="member-list">
    <el-input placeholder="搜索成员" prefix-icon="el-icon-search" class="member-list-search" />
    <ul class="member-list-group">
      <li v-for="i in 20" :key="i" class="member-list-item">
        <span class="avatar-default" :style="'background:'+colorList[i%7]"><div>张三</div></span>
        <div class="avatar-name">张三</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorList: ['#9a7ef4', '#56abfb', '#5dcfff', '#868af6', '#fb7fb7', '#73d897', '#fa8888']
    }
  }
}
</script>
<style lang="scss" scoped>
.member-list {
    display: block;
    overflow: auto;
    flex: 1 1 auto;
    padding: 2px 0;
}
.member-list-search{
  margin-bottom:10px
}
.member-list-item {
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.avatar-default{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    line-height: 24px;
    font-size: 12px;
    vertical-align: middle;
    color: #fff;
    div{
      transform: scale(0.9);
    }
}
.avatar-name {
    margin-left: 5px;
    display: inline-block;
    max-width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
}
</style>
