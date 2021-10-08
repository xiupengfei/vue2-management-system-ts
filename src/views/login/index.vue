<template>
  <div class="login-container">
    <div class="area1" />
    <div class="area2" />
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          {{ $t('login.title') }} {{ version }}
        </h3>
        <lang-select
          class="set-language"
          placement="right"
        />
      </div>

      <el-form-item prop="username">
        <svg-icon name="user" />
        <el-input
          ref="username"
          v-model="loginForm.username"
          clearable
          name="username"
          type="text"
          autocomplete="on"
          :placeholder="$t('login.username')"
        />
      </el-form-item>

      <el-form-item prop="password">
        <svg-icon name="password" />
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="$t('login.password')"
          name="password"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%; margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >
        {{ $t('login.logIn') }}
      </el-button>
    </el-form>
    <div style="position: absolute; left: 100px; top: 50px">
      <div class="tips">
        <span>{{ $t('login.username') }} : admin </span>
        <span>{{ $t('login.password') }} : {{ $t('login.any') }} </span>
      </div>
      <div class="tips">
        <span>{{ $t('login.username') }} : editor </span>
        <span>{{ $t('login.password') }} : {{ $t('login.any') }} </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Dictionary } from 'vue-router/types/router'
import { Form as ElForm, Input } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import defaultSettings from '@/settings'
import LangSelect from '@/components/LangSelect/index.vue'

@Component({
  name: 'Login',
  components: {
    LangSelect
  }
})
export default class extends Vue {
  private version: string = defaultSettings.version

  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (value.trim() === '') {
      callback(new Error('Please enter the correct user name'))
    } else {
      callback()
    }
  }
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('The password can not be less than 6 digits'))
    } else {
      callback()
    }
  }
  private loginForm = {
    username: 'admin',
    password: '111111'
  }
  private loginRules = {
    username: [{ validator: this.validateUsername, trigger: ['blur', 'change'] }],
    password: [{ validator: this.validatePassword, trigger: ['blur', 'change'] }]
  }
  private passwordType = 'password'
  private loading = false
  private redirect?: string
  private otherQuery: Dictionary<string> = {}

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  mounted() {
    if (this.loginForm.username === '') {
      (this.$refs.username as Input).focus()
    } else if (this.loginForm.password === '') {
      (this.$refs.password as Input).focus()
    }
  }

  private showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      (this.$refs.password as Input).focus()
    })
  }

  private handleLogin() {
    (this.$refs.loginForm as ElForm).validate(async(valid: boolean) => {
      if (valid) {
        this.loading = true
        await UserModule.Login(this.loginForm)
        this.$router.push({
          path: this.redirect || '/',
          query: this.otherQuery
        })
        // Just to simulate the time of the request
        setTimeout(() => {
          this.loading = false
        }, 0.5 * 1000)
      } else {
        return false
      }
    })
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as Dictionary<string>)
  }
}
</script>
<style lang="scss">
.login-container {
  .el-input__inner {
    text-indent: 2em;
  }
}
</style>
<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #454545;
  // background-image: linear-gradient(#1E425A, #224A64, #4E656C, #3D5B60);

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: #3A71A8;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #889aa4;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .login-form {
    position: relative;
    border-radius: 5px;
    background-clip: padding-box;
    margin: 0 auto;
    margin-top: 280px;
    width: 400px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    -webkit-box-shadow: 0 0 25px #cac6c6;
    box-shadow: 0 0 25px #cac6c6;
    .el-form-item__content {
      &>svg {
        position: absolute;
        left: 11px;
        top: 11px;
        z-index: 10;
        color: #889aa4;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 0px;
      font-size: 16px;
      color: #889aa4;
      cursor: pointer;
      user-select: none;
    }
  }

  // 最后需要删除
  .tips {
    font-size: 14px;
    color: teal;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
}
</style>

<style lang="scss">
@keyframes animation1 {
  from { background-position: 0 0; }
  to { background-position: 4000% 0; }
}

@keyframes animation2 {
  from { background-position: 0 0; }
  to { background-position: 30000% 0; }
}
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(/img/login/bg.jpg) no-repeat center;
  background-size: cover;

  .area1 {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url(/img/login/animate2.png) repeat-x 0px 0px;
    background-size: cover;
    animation: animation1 6000s linear infinite;
  }
  .area2 {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url(/img/login/animate1.png) repeat-x 0px 0px;
    background-size: cover;
    animation: animation2 8000s linear infinite;
  }
}
</style>
