<template>
  <div>
    <van-nav-bar title="用户登录"
                 left-text="返回"
                 left-arrow
                 @click-left='goBack' />
    <div class="register-panel">

      <van-field v-model="username"
                 label="用户名"
                 icon="clear"
                 placeholder='请输入用户名'
                 required
                 @click-icon="username =''"
                 :error-message="userNameErrorMsg" />
      <van-field v-model="password"
                 type="password"
                 label="密码"
                 placeholder="请输入密码"
                 required
                 :error-message="passwordErrorMsg" />
      <div class="register-button">
        <van-button type="primary"
                    @click="LoginAction"
                    :loading="openLoading"
                    size="large">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      username: '',
      password: '',
      openLoading: false, // 是否开启用户的Loading
      userNameErrorMsg: '', // 当用户出现错误时的提示信息
      passwordErrorMsg: '' // 当密码出现错误时的提示信息
    }
  },
  // created () {
  //   if (localStorage.userInfo) {
  //     Toast.success('您已经登录')
  //     this.$router.push('/')
  //   }
  // },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    axiosLoginUser () {
      this.openLoading = true
      axios({
        url: url.login,
        method: 'post',
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(response => {
          new Promise((resolve, reject) => {
            localStorage.userInfo = { userName: this.userName }
            setTimeout(() => {
              resolve()
            }, 500)
          }).then(() => {
            console.log(response)
            if (response.data.code === 200 || response.data.message) {
              Toast.success('登录成功')
              this.$router.push('/')
            } else {
              console.log(response.data.message)
              Toast.fail('登录失败:' + response.data.message)
              this.openLoading = false
            }
          }).catch(err => {
            Toast.fail('登录状态保存失败')
            console.log(err)
          })
        })
    },

    checkForm () {
      let isOk = true
      if (this.username.length < 5) {
        this.userNameErrorMsg = '用户名不能少于5位'
        isOk = false
      } else {
        this.userNameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    },
    LoginAction () {
      this.checkForm() && this.axiosLoginUser()
    }
  }

}

</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>
