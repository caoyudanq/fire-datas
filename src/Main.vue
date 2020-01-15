<template>
  <div id="app">
    <el-container id="container">
      <el-header
      height="80px">
        <div id="header">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple, time">
                <my-time></my-time>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple" id="title">
                火警大数据平台
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple, time">
                <my-sec-time></my-sec-time>
              </div>
            </el-col>
            <el-col :span="1">
              <div class="grid-content bg-purple, time">
                  <el-button size="mini" @click="exit">退出</el-button>
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
            text-color = "#fff"
            active-text-color="#ffd04b"
            background-color="#1a3844"
            :router = "true"
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
    <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import myTime from '@/components/time/Time'
import mySecTime from '@/components/time/secondTime'
export default {
  data() {
    return {
      yearTime: 0
    }
  },
  components: {
    myTime,
    mySecTime
  },
  methods: {
    changeUserInfo() {
    },
    exit() {
      this.$http.get('/logout/do_logout')
        .then(res => {
          var code = res.data.data.code.toString()
          var token = res.data.data.token
          console.log('logout.res.data=======')
          console.log(res.data)
          console.log('code=======' + code)
          console.log('token======' + token)
          if (code === this.COMMON.SUCCESS) {
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
          this.$message.error('退出登录失败')
          console.log('退出登录失败')
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-image: radial-gradient(circle, rgb(34, 77, 62), #1a3844);
  text-align: center;
  color: #fff;
  #header {
    #title {
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      color:rgb(238, 245, 245);
      font-size: 24px;
      line-height: 80px;
    }
    .time {
      padding-top: 50px;
    }
     .el-button {
        color: rgb(165, 165, 165);
        background-color: #093235;
        border-color: #0f334b;
      }
      .el-button:hover {
        color: rgb(196, 195, 195);
        background-color: #122a33;
        border-color: #0d2636;
      }
  }
}
.el-aside {
  background-color: #1a3844;
}
.el-main {
  background-color: #021019;
  padding: 10px 0px 0px 10px;
}
.el-menu {
  border: 0px;
}
#app {
  width: 100%;
  #container {
    height: 100%;
  }
}
</style>
