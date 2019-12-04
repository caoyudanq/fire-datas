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
    <el-form-item prop="account">
      <el-input
        type="text"
        v-model="ruleForm.account"
        placeholder="账号"
      ></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input
        type="password"
        v-model="ruleForm.checkPass"
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
export default {
  data() {
    return {
      logining: false,
      token: 'user_cyd',
      ruleForm: {
        account: 'admin',
        checkPass: '123456'
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {
    getData() {
      this.$http.get(`/api/seller`).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      })
    },
    login() {
      alert('登陆成功')
      console.log(this.ruleForm)
      window.sessionStorage.setItem('token', this.token)
      this.$http.post('login', this.ruleForm)
      this.$router.push('/main')
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
