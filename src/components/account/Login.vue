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
      <el-input type="text" v-model="ruleForm.username" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        style="width:100%;"
        @click.native.prevent="login('ruleFormRef')"
        :loading="logining"
      >登录</el-button>
    </el-form-item>
    <div id="footer" style="position:relative">
      <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
      <el-button type="text" style="position:absolute;right:0;padding:0" @click="signUp">注册</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      logining: false,
      token: 'cyd_123',
      ruleForm: {
        username: '',
        password: ''
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
  created() {
    if (typeof this.$route.params.username !== 'undefined') {
      console.log(this.$router.params)
      this.ruleForm.username = this.$router.params.username
    }
    console.log('wwwwwww')
    console.log(this.$route.params)
    console.log(this.$route)
  },
  methods: {
    ...mapMutations(['addUserName', 'addPassword']),
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
          this.$http
            .get(
              '/login/do_login?username=' +
                this.ruleForm.username +
                '&password=' +
                this.ruleForm.password
            )
            .then(res => {
              var code = res.data.code.toString()
              var token = res.data.message
              // console.log('login.res.data=======')
              // console.log(res.data)
              // console.log('code=======' + code)
              // console.log('token======' + token)
              if (code === this.COMMON.SUCCESS) {
                // 全局存储token
                window.localStorage.setItem('token', token)
                this.$store.commit('addUserName', this.ruleForm.username)
                this.$store.commit('addPassword', this.ruleForm.password)
                this.$router.push('/main')
              } else if (code === this.COMMON.NOUSER) {
                this.$message.error('用户信息不存在')
              } else if (code === this.COMMON.NOUSERNAME) {
                this.$message.error('用户名不存在')
              } else if (code === this.COMMON.PASSWRONG) {
                this.$message.error('密码错误')
              } else {
                this.$message.error('登录失败')
                console.log('登陆失败')
              }
            })
            .catch(err => {
              console.log('登录失败')
              console.log(err)
            })
        } else {
          this.$message.error('登录失败')
          console.log('error submit!!')
          return false
        }
      })
    },
    signUp() {
      this.$router.push('/signUp')
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
