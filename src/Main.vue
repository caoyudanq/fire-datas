<template>
  <div id="app1">
    <el-container id="container">
      <el-header>
        <div class="header">
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="grid-content bg-purple" id="logo">
                logo
              </div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple" id="title">
                火警物联网
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple" id="user">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <i class="el-icon-user-solid"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click="changeUserInfo">查看用户信息</el-dropdown-item>
                    <el-dropdown-item>修改用户信息</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <div id="exit">
                  <el-button size="mini" @click="exit">退出</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            text-color="#fff"
            active-text-color="#ffd04b"
            background-color="#0f334b"
            router="true"
          >
            <el-menu-item index="/main">
              <i class="el-icon-s-platform"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/main/history">
              <i class="el-icon-document"></i>
              <span slot="title">报警日志</span>
            </el-menu-item>
            <el-menu-item index="/main/analysis" disabled>
              <i class="el-icon-data-analysis"></i>
              <span slot="title">数据分析</span>
            </el-menu-item>
            <el-menu-item index="/main/hazard">
              <i class="el-icon-s-opportunity"></i>
              <span slot="title">隐患日志</span>
            </el-menu-item>
            <el-menu-item index="/main/others" disabled>
              <i class="el-icon-setting"></i>
              <span slot="title">其他</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import myMap from '@/components/map/Map'
import global_ from './util/Global'
export default {
  data() {
    const item = {}
    return {
      tableData: Array(20).fill(item)
    }
  },
  components: {
    myMap
  },
  methods: {
    changeUserInfo() {
    },
    exit() {
      this.$http.get('/logout/do_logout')
        .then(res => {
          var code = res.data.code.toString()
          var token = res.data.token
          console.log('logout.res.data=======')
          console.log(res.data)
          console.log('code=======' + code)
          console.log('token======' + token)
          if (code === global_.SUCCESS) {
            // 全局存储token
            window.localStorage.clear()
            this.$cookies.remove('token')
            this.$store.commit('addUserName', '')
            this.$store.commit('addPassword', '')
            this.$router.push('/login')
          } else {
            this.$message.error('退出登录失败')
          }
        }).catch(err => {
          console.log('退出登录失败')
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #0f334b;
  text-align: center;
  color: #fff;
  #title,
  #logo {
    line-height: 60px;
  }
  #user {
    padding: 0 0 0 50px;
    line-height: 60px;
    #userIcon {
      margin-top: 24px;
    }
    #exit {
      display: inline;
      color: #606266;
      font-size: 12px;
      margin-left: 10px;
      .el-button {
        color: rgb(165, 165, 165);
        background-color: #0f334b;
        border-color: #0f334b;
      }
      .el-button:hover {
        color: rgb(196, 195, 195);
        background-color: #0f334b;
        border-color: #0f334b;
      }
    }
  }
}
.el-aside {
  background-color: #0f334b;
}
.el-main {
  background-color: #021019;
  padding: 10px 0px 0px 10px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu {
  list-style: none;
  position: relative;
  color: #fff;
  margin: 0;
  padding-left: 0;
  border: 0px;
}
.el-menu-vertical-demo .el-menu {
  background-color: #0f334b !important;
}
.el-menu-item-group__title {
  line-height: normal;
  font-size: 12px;
  color: #909399;
}
#app1 {
  height: 100%;
  width: 100%;
  #container {
    height: 100%;
  }
}
</style>
