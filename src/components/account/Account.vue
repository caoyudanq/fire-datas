<!-- 账户管理 -->
<template>
  <div id="wrap">
    <div id="user">管理员： {{user}}</div>
    <!-- <el-divider></el-divider> -->
    <div id="account">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="设置密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <!-- <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age" size="mini"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" size="mini">提交</el-button>
          <el-button @click="resetForm('ruleForm')" size="mini">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
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
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.user = this.$store.state.user.userName
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
          this.$http
            .post('/changePass', {
              newPassWorld: this.pass
            })
            .then(res => {
              var code = res.data.code.toString()
              var token = res.data.msg
              if (code === this.COMMON.SUCCESS) {
                // 全局存储token
                window.localStorage.setItem('token', token)
                // this.$store.commit('addUserName', this.ruleForm.username)
                this.$store.commit('addPassword', this.ruleForm.pass)
                this.$router.push('/login')
              } else if (code === this.COMMON.NOUSER) {
                this.$message.error('用户信息不存在')
              } else if (code === this.COMMON.NOUSERNAME) {
                this.$message.error('用户名不存在')
              } else if (code === this.COMMON.PASSWRONG) {
                this.$message.error('密码错误')
              } else {
                this.$message.error('登录失败')
                console.log('修改密码失败')
              }
            })
        } else {
          this.$message.error('修改密码失败')
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang='scss' scoped>
#wrap {
  background-color: white;
  height: 100%;
  padding-left: 35%;
  padding-right: 35%;
  #user {
    padding: 20px 0 10px 10px;
    font-size: 16px;
  }
}
</style>
