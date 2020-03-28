<!-- 登录模板 -->
<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
  >
    <h3 class="title">用户注册</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="ruleForm.username" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="ruleForm.pass" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm')">注册</el-button>
    </el-form-item>
    <div id="footer" style="position:relative;padding-bottom:20px">
      <el-button
        type="text"
        style="position:absolute;right:0;padding:0;"
        @click.native.prevent="login"
      >登录</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      user: 'cyd',
      ruleForm: {
        username: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          },
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    ...mapMutations(['addUserName', 'addPassword']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post('/signUp', this.ruleForm).then(res => {
            var code = res.data.code.toString()
            if (code === this.COMMON.SUCCESS) {
              this.$message('注册成功！跳转至登录界面')
              console.log('username=' + this.ruleForm.username)
              this.$router
                .push({ name: 'login', params: this.ruleForm.username })
                .catch(err => {
                  console.log(err)
                })
            } else if (code === this.COMMON.USEREXIST) {
              this.$message.error('用户已存在')
            } else {
              this.$message.error('注册失败')
              console.log('注册失败')
            }
          })
        } else {
          this.$message.error('注册失败')
          console.log('error submit!!')
          return false
        }
      })
    },
    login() {
      this.$router.push('/login')
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
