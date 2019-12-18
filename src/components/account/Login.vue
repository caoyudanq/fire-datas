<!-- 登录模板 -->
<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleFormRef"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
  >
    <h3 class="title">系统登录</h3>
    <el-form-item prop="username">
      <el-input
        type="text"
        v-model="ruleForm.username"
        placeholder="账号"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="ruleForm.password"
        placeholder="密码"
      ></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="remember"
      >记住密码</el-checkbox
    >
    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        style="width:100%;"
        @click.native.prevent="login"
        :loading="logining"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { mapMutations } from 'vuex'
// import { Message } from 'element-ui'
export default {
  data() {
    return {
      logining: false,
      token: 'cyd_123',
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {
    ...mapMutations(['addUserName', 'addPassword']),
    login() {
      console.log(this.ruleForm)
      // this.$http.post('login', this.ruleForm)
      //   .then(res => {
      //     console.log(res)
      //     if (res.data.errno === 0) {
      //       this.$Message.success('登陆成功')
      //       this.$router.push('roomInfo')
      //       // 全局存储token
      //       window.localStorage['token'] = JSON.stringify(res.data.data.token)
      //     } else {
      //       this.$Message.error('登录失败')
      //       this.forgetPassword = true
      //     }
      //   }).catch(err => {
      //     console.log('登录失败')
      //     console.log(err)
      //   })
      // 采用
      // this.$http.post('login', this.ruleForm)
      //   .then(res => {
      //     console.log(res)
      //     if (res.data.code === 2000) {
      //       // 全局存储token
      //       // window.localStorage['token'] = JSON.stringify(res.data.msg)
      //       window.localStorage['token'] = res.data.msg
      //       this.$store.commit('addUserName', this.ruleForm.username)
      //       this.$store.commit('addPassword', this.ruleForm.password)
      //       this.$router.push('/main')
      //     } else {
      //       Message.error('登录失败')
      //       this.forgetPassword = true
      //     }
      //   }).catch(err => {
      //     console.log('登录失败')
      //     console.log(err)
      //   })
      // 待删除
      window.sessionStorage.setItem('token', this.token)
      this.$store.commit('addUserName', this.ruleForm.username)
      this.$store.commit('addPassword', this.ruleForm.password)
      this.$router.push('/main')
      //  ...
    }
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
