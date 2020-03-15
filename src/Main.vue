<template>
  <div id="app">
    <el-container id="container">
      <el-header height="80px">
        <div id="header">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple, time">
                <my-time></my-time>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple" id="title">火警大数据平台</div>
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
            text-color="#fff"
            active-text-color="#ffd04b"
            background-color="#1a3844"
            :router="true"
          >
            <el-menu-item index="/main">
              <i class="el-icon-s-platform"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/main/history">
              <i class="el-icon-document"></i>
              <span slot="title">报警日志</span>
            </el-menu-item>
            <el-menu-item index="/main/hazard">
              <i class="el-icon-s-opportunity"></i>
              <span slot="title">隐患日志</span>
            </el-menu-item>

            <el-submenu index="/main/analysis">
              <template slot="title">
                <i class="el-icon-data-analysis"></i>
                <span slot="title">数据分析</span>
              </template>
              <el-menu-item index="/main/analysis/history">报警日志分析</el-menu-item>
              <el-menu-item index="/main/analysis/hazard">隐患日志分析</el-menu-item>
            </el-submenu>
            <el-submenu index="/main/account">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">账户管理</span>
              </template>
              <el-menu-item index="/main/account/change">修改用户信息</el-menu-item>
              <!-- <el-menu-item index="/main/analysis/hazard"
                >隐患日志分析</el-menu-item
              >-->
            </el-submenu>
            <el-menu-item index="/main/others" disabled>
              <i class="el-icon-setting"></i>
              <span slot="title">其他</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="position: relative;">
          <div id="fire-msg" class="fire-msg" :class="{active: close}">
            <h3
              style="cursor: move; border-bottom:1px solid #ffffff; height: 26px; color: #ffffff;
              padding:5px 0; margin:0 10px"
            >
              <span style="line-height: 26px;">今日报警</span>
              <button
                type="button"
                style="padding: 5px 10px; position: absolute; right: 34px; height: 26px"
                class="el-button el-button--warning"
              >
                <span>消音</span>
              </button>
              <i
                class="el-icon-close"
                style="padding-top: 5px;position: absolute;right: 10px; height: 26px; cursor: pointer"
                @click="closeMsg"
              ></i>
            </h3>

            <div id="fire-bottom">
              <ul class="f_left">
                <li v-for="(item, index) in gridData" :key="index">
                  <h3>
                    <span>{{item.title}}</span>
                    <el-button
                      type="text"
                      size="small"
                      style="padding: 0;margin-left: 0 10px 0 5px;float: right"
                    >
                      <i
                        class="el-icon-s-platform"
                        style="margin: 7px 0; color:#000; font-size: 16px"
                      ></i>
                    </el-button>
                  </h3>
                  <div class="fire-content">
                    <p>{{item.content}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer height="40px"></el-footer>
    </el-container>
  </div>
</template>

<script>
import myTime from '@/components/time/Time'
import mySecTime from '@/components/time/secondTime'
export default {
  data() {
    return {
      close: true,
      time: '',
      yearTime: 0,
      gridData: [],
      dialogTableVisible: false,
      formLabelWidth: '120px'
    }
  },
  components: {
    myTime,
    mySecTime
  },
  methods: {
    exit() {
      this.$http
        .get('/logout/do_logout')
        .then(res => {
          var code = res.data.code.toString()
          var token = res.data.token
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
        })
        .catch(err => {
          this.$message.error('退出登录失败')
          console.log('退出登录失败')
          console.log(err)
        })
    },
    closeMsg() {
      this.close = true
    }
  },
  created() {
    var _this = this
    this.time = new Date()
    this.timer = setInterval(function() {
      _this.$http
        .post('/getMsg', {
          time: _this.time
        })
        .then(res => {
          if (res.data.code.toString() === _this.COMMON.ALERT) {
            console.log(new Date(_this.time))
            console.log('产生新的报警')
            if (!_this.close) {
              _this.gridData = res.data.msg.concat(_this.gridData)
            } else {
              _this.close = false
              _this.gridData = res.data.msg
            }
          } else if (res.data.code.toString() === _this.COMMON.NOALERT) {
            console.log(new Date(_this.time))
            console.log('没有异常警报')
          } else {
            console.log(new Date(_this.time))
            console.log('服务器数据异常')
          }
        })
    }, 500000)
  },
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除定时器
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  display: none;
}
.el-header {
  background-image: radial-gradient(circle, rgb(34, 77, 62), #1a3844);
  text-align: center;
  color: #fff;
  #header {
    #title {
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      color: rgb(238, 245, 245);
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
.el-footer {
  background-image: radial-gradient(circle, rgb(34, 77, 62), #1a3844);
}
.el-aside {
  background-color: #1a3844;
}
.el-main {
  background-color: #021019;
  padding: 10px 0px 0px 10px;
  .fire-msg {
    position: absolute;
    top: 20%;
    left: 25%;
    width: 50%;
    // max-height: 350px;
    margin: 0 auto;
    background-color: #1d3f4d;
    box-sizing: border-box;
    z-index: 9000;
    #fire-bottom {
      margin-top: 5px;
    }
  }
  #fire-msg {
    margin-top: 5px;
  }
  .fire-msg ul {
    overflow: auto;
    height: 300px;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .f_left {
    float: left;
  }
  li {
    background-color: #f0f0f0;
    width: 100%;
    border-radius: 3px;
    color: #fff;
    text-align: left;
    margin-bottom: 10px;
    list-style: none;
    h3 {
      height: 30px;
      background-color: #d8382a;
      text-align: left;
      padding-left: 10px;
      border: 0;
      font-size: 14px;
      line-height: 30px;
      width: 100%;
      border-radius: 3px 3px 0 0;
      box-sizing: border-box;
      span {
        display: inline-block;
        margin-right: 10px;
      }
    }
    .fire-content {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
      overflow: hidden;
      p {
        word-wrap: break-word;
        word-break: normal;
        color: #000;
        margin: 0;
        padding: 10px;
        box-sizing: border-box;
        background-color: #fff;
      }
    }
  }
  #account {
    position: absolute;
    display: hidden;
  }
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
.el-dialog .el-dialog__header {
  padding: 13px 15px !important;
  background-color: #21324c;
  color: #fff !important;
}
</style>
