<!-- 账户管理 -->
<template>
  <div id="wrap">
    <!-- <div id="user">管理员： {{user}}</div> -->
    <!-- <el-divider></el-divider> -->
    <div id="account">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="positon: relative"
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
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            size="mini"
            style="position: absolute; left:0px"
          >提交</el-button>
          <el-button
            @click="resetForm('ruleForm')"
            size="mini"
            style="position: absolute; right:0px"
          >重置</el-button>
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
              newPassWord: this.pass
            })
            .then(res => {
              var code = res.data.code.toString()
              // var token = res.data.msg
              if (code === this.COMMON.SUCCESS) {
                // 全局存储token
                // window.localStorage.setItem('token', token)
                // this.$store.commit('addPassword', this.ruleForm.pass)
                window.localStorage.clear()
                this.$cookies.remove('token')
                this.$store.commit('addUserName', '')
                this.$store.commit('addPassword', '')
                this.$message('密码修改成功，跳转至登录界面！')
                this.$router.push('/login')
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
  padding-top: 10%;
  #user {
    padding: 20px 0 10px 10px;
    font-size: 16px;
  }
}
</style>
