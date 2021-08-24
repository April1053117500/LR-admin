<template>
  <div>
    <div class="header header-shadow">
      <div class="header-bg" />
      <div class="header-wrapper">
        <img :src="imgSrc" alt="">
      </div>

    </div>
    <div class="wrapper">
      <div class="container">
        <div class="content">
          <div class="box" @click="goRouter(1)">
            <div class="box-top">
              <div class="title"><i class="el-icon-s-custom" /> 后台管理</div>
            </div>
            <div class="box-middle">
              <div class="item">
                <span class="point">•</span>
                <span>人员管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>角色管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>部门管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>岗位管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>菜单管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>字典管理</span>
              </div>
            </div>
            <div class="box-bottom">
              <div class="moreLink" href="#">前往登录</div>
            </div>
          </div>
          <div class="box" @click="goRouter(2)">
            <div class="box-top">
              <div class="title"><i class="el-icon-s-custom" /> 访客系统（外部）</div>
            </div>
            <div class="box-middle">
              <div class="item">
                <span class="point">•</span>
                <span>人员管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>角色管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>部门管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>岗位管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>菜单管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>字典管理</span>
              </div>
            </div>
            <div class="box-bottom">
              <div class="moreLink" href="#">前往登录</div>
            </div>
          </div>
          <div class="box" @click="goRouter(3)">
            <div class="box-top">
              <div class="title"><i class="el-icon-s-custom" /> 访客系统（内部）</div>
            </div>
            <div class="box-middle">
              <div class="item">
                <span class="point">•</span>
                <span>人员管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>角色管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>部门管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>岗位管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>菜单管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>字典管理</span>
              </div>
            </div>
            <div class="box-bottom">
              <div class="moreLink" href="#">前往登录</div>
            </div>
          </div>
          <div class="box" @click="goRouter(4)">
            <div class="box-top">
              <div class="title"><i class="el-icon-s-custom" /> 账务系统</div>
            </div>
            <div class="box-middle">
              <div class="item">
                <span class="point">•</span>
                <span>人员管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>角色管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>部门管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>岗位管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>菜单管理</span>
              </div>
              <div class="item">
                <span class="point">•</span>
                <span>字典管理</span>
              </div>
            </div>
            <div class="box-bottom">
              <div class="moreLink" href="#">前往登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: require('@/assets/common/logo.png')
    }
  },
  methods: {
    goRouter(flag) {
      if (flag === 1) {
        window.location.href = 'http://10.30.31.51:9527'
      } else if (flag === 2) {
        window.location.href = 'http://10.30.31.51:9528'
      } else if (flag === 3) {
        window.location.href = 'http://10.30.31.51:9529'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 850px) and (max-width: 1280px) {
  .container {
      width: 850px;
  }
  .header-wrapper{
    width: 850px;
  }
}
.header{
    position: fixed;
    -webkit-justify-content: center;
    justify-content: center;
    height: 80px;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100%;
}
.header-shadow {
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 6%);
    .header-bg{
      background-color: #fff;
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .header-wrapper{
      height: 80px;
      display: -webkit-flex;
      display: flex;
      -webkit-align-items: center;
      align-items: center;
      -webkit-flex: 1 1;
      flex: 1 1;
      position: relative;
      padding: 0 32px;
      max-width: 1280px;
      margin: 0 auto;
      img{
        height: 80px;
      }
    }
}
.wrapper{
  min-height: 20px;
  height: 778px;
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
  background-image: linear-gradient(to bottom, #E1EDFF 0%,white 100%);
  background-clip: padding-box;
  background-size: auto;
  background-repeat: repeat;
  background-attachment: scroll;
  background-position: 0% 0%;
}
.container{
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 120px;
  position: relative;
}
.content{
  min-height: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.box{
    width: 375px;
    // height: 343px;
    box-shadow: 0 2px 24px rgb(28 76 186 / 8%);
    border-radius: 8px;
    background-color: #fff;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    margin-bottom: 40px;
    cursor: pointer;
}
.box-top {
    height: 32px;
    margin: 40px;
    display: -webkit-flex;
    display: flex;
    .title {
      font-size: 24px;
      font-weight: 600;
      line-height: 32px;
      color: #1f2329;
      display: flex;
      align-items: center;
      i{
        color: #4954e6;
        margin-right: 10px;
      }
  }
}
.box-middle {
    margin: 0 40px 40px;
    -webkit-flex: 1 1;
    flex: 1 1;
    .item {
      line-height: 24px;
      font-size: 16px;
      display: -webkit-flex;
      display: flex;
      color: #1f2329;
      margin-bottom: 8px;
      -webkit-align-items: center;
      align-items: center;
      .point {
        margin-right: 8px;
      }
    }
}
.box-bottom {
  border-top: 1px solid #eff0f1;
  padding: 13px 0 13px 40px;
  text-align: left;
  .moreLink {
    color: #3370ff;
    cursor: pointer;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
  }
}
</style>
