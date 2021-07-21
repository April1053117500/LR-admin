<template>
  <div class="app-container">
    <el-row :gutter="20">

      <el-col :span="6" :xs="24">
        <el-card class="mb20">
          <div slot="header">个人信息</div>
          <div class="box-center">
            <!-- <pan-thumb image="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" :height="'100px'" :width="'100px'" :hoverable="false">
							<div>Hello</div>
							root
						</pan-thumb> -->
            <div>
              <div class="avatar-img">{{ userInfo.userName }}</div>
              <div class="avatar-tip">hello,{{ userInfo.userName }}</div>
            </div>
          </div>
          <div class="user-profile">
            <span class="user-bio">
              <i class="el-icon-user" />用户名：
            </span>
            {{ userInfo.userName || '暂无' }}
          </div>
          <div class="user-profile">
            <span class="user-bio">
              <i class="el-icon-user" />性别：
            </span>
            {{ userInfo.sex || '暂无' }}
          </div>
          <div class="user-profile">
            <span class="user-bio">
              <i class="el-icon-user" />登录账号：
            </span>
            {{ userInfo.loginName || '暂无' }}
          </div>
          <div class="user-profile">
            <span class="user-bio">
              <i class="el-icon-user" />邮箱：
            </span>
            {{ userInfo.email || '暂无' }}
          </div>
          <div class="user-profile">
            <span class="user-bio">
              <i class="el-icon-user" />创建者：
            </span>
            {{ userInfo.createBy || '暂无' }}
          </div>
          <div class="user-profile">
            <span class="user-bio">
              <i class="el-icon-user" />角色：
            </span>
            {{ userInfo.createBy || '暂无' }}
          </div>
        </el-card>
      </el-col>

      <el-col :span="18" :xs="24">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="登录日志" name="preferences">
              <el-table
                :data="tableData"
                style="width: 100%"
              >
                <el-table-column
                  type="selection"
                  width="55"
                />
                <el-table-column
                  prop="date"
                  label="日期"
                  width="180"
                />
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="180"
                />
                <el-table-column
                  prop="address"
                  label="地址"
                />
              </el-table>
              <div style="margin-top: 20px">
                <el-button type="danger">删除所选项</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="change_password">
              <el-form>
                <el-form-item label="旧密码">
                  <el-input />
                </el-form-item>
                <el-form-item label="新密码">
                  <el-input />
                </el-form-item>
                <el-form-item label="确认新密码">
                  <el-input />
                </el-form-item>
              </el-form>
              <div style="margin-top: 20px">
                <el-button type="primary">确认修改</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="API TOKEN" name="api_token">
              <div style="margin-top: 20px">
                <el-button type="primary"><i class="el-icon-plus" style="margin-right:10px" />Add a token</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="USER KEY" name="user_key">
              <div style="margin-top: 20px">
                <el-button type="primary"><i class="el-icon-plus" style="margin-right:10px" />Create a User Key</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<script>

export default {
  name: 'Profile',
  data() {
    return {
      userInfo: {},
      activeTab: 'preferences',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      this.userInfo = await this.$store.dispatch('user/getInfo')
      console.log('this.userInfo===', this.userInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 20px auto 40px;
  display: table;
  .avatar-img{
    width: 80px;
    height: 80px;
    line-height: 80px;
    border-radius: 50%;
    background:#409eff;
    text-align: center;
    color: #fff;
    font-size: 20px;
    margin-bottom: 10px;
  }
}
.user-profile{
	margin-bottom: 20px;
}
.user-bio{
	i{
		margin-right: 10px;
	}
    margin-top: 20px;
    color: #606266;
		font-weight: 600;
}
</style>
