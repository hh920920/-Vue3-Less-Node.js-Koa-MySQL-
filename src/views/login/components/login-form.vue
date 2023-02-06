<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-youxiang"></i> 邮箱账号登录
      </a>
      <a @click="isMsgLogin=true" href="javascript:;" v-else>
        <i class="iconfont icon-shouji"></i> 短信验证登录
      </a>
    </div>
    <!-- 给Form表单加上 :validation-schema ，才能进行校验 -->
    <Form ref="formCom" class="form" :validation-schema="schema" v-slot="{errors}" autocomplete="off">
      <!-- 1、邮箱账号登录 -->
      <template v-if="!isMsgLogin">
        <!-- 1.1、邮箱账号框 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-youxiang"></i>
            <Field name="email" :class="{error: errors.email == '邮箱格式错误' || errors.email == '请输入邮箱帐号' , success: (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{3,4})$/).test(form.email) }" v-model="form.email" type="text" placeholder="请输入邮箱帐号" />
            <i class="iconfont icon-queren" v-if="/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{3,4})$/.test(form.email)" />
          </div>
          <div class="error" v-if="errors.email"><i class="iconfont icon-warning-circle" />{{errors.email}}</div>
        </div>
        <!-- 1.2、密码框 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-mima"></i>
            <Field name="password" :class="{error: errors.password == '请输入密码' || errors.password == '密码是6-24个字符', success: (/^\w{6,24}$/).test(form.password) }" v-model="form.password" type="password" placeholder="请输入密码" />
            <i class="iconfont icon-queren" v-if="/^\w{6,24}$/.test(form.password)" />
          </div>
          <div class="error" v-if="errors.password"><i class="iconfont icon-warning-circle" />{{errors.password}}</div>
        </div>
      </template>
      <!-- 2、短信验证登录 -->
      <template v-else>
        <!-- 2.1、手机号输入框 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-shouji"></i>
            <Field name="mobile" :class="{error: errors.mobile}" v-model="form.mobile" type="text" placeholder="请输入手机号" />
          </div>
          <div class="error" v-if="errors.mobile"><i class="iconfont icon-warning" />{{errors.mobile}}</div>
        </div>
        <!-- 2.2、验证码输入框 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-yanzhengma"></i>
            <Field name="code" :class="{error: errors.code}" v-model="form.code" type="password" placeholder="请输入验证码" />
            <span class="code" @click="send()">{{ time === 0 ? '发送验证码' : `${time}秒后发送` }}</span>
          </div>
          <div class="error" v-if="errors.code"><i class="iconfont icon-warning" />{{errors.code}}</div>
        </div>
      </template>
      <!-- 3、勾选同意协议 -->
      <div class="form-item">
        <div class="agree">
          <XxmCheckbox v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="!form.isAgree"><i class="iconfont icon-warning-circle" />请勾选同意用户协议</div>
      </div>
      <a href="javascript:;" class="btn" @click="login()">登录</a>
    </Form>
    <!-- 前去登录 -->
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;" @click="register()">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { onUnmounted, reactive, ref, watch } from 'vue'
import Message from '@/components/Message'
import { userEmailLogin, userMobileLoginMsg } from '@/api/user'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
// 引入第三方插件 vee-validate 表单验证  
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
export default {
  name: 'LoginForm',
  components: {
    Form,
    Field
  },
  setup() {
    // 是否短信登录
    const isMsgLogin = ref(false)
    // 表单信息对象
    const form = reactive({
      email: null,    // 邮箱账号
      password: null,   // 密码
      mobile: null,     // 手机号
      code: null,       // 验证码
      isAgree: true     // 是否同意协议
    })

    // 校验规则
    const mySchema = {
      email: schema.email,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code
    }

    // 监听isMsgLogin 重置表单 (还原数据 + 清除校验效果)
    const formCom = ref(null)
    watch(isMsgLogin, () => {
      // 还原数据
      form.email = null,
        form.password = null,
        form.mobile = null,
        form.code = null,
        form.isAgree = true
      // 如果是没有Field组件，之前的校验结果不会清除
      // Form组件提供了一个resetForm()函数来清除校验结果
      formCom.value.resetForm()
    })

    // 通过 getCurrentInstance 方法获取当前组件实例，从而获取 route 和 router 等
    // const { proxy } = getCurrentInstance()

    // 使用store
    const store = useStore()
    // 使用router
    const router = useRouter()
    // 使用route
    const route = useRoute()

    // 账号登录登录函数，（验证表单）  *************************************
    const login = async () => {
      // Form组件提供了一个 validate() 函数来验证整体表单，返回的是一个promise，结果校验合格则是true,否则为false
      let { valid } = await formCom.value.validate()
      if (valid && form.isAgree) {
        const { email, password } = form
        const res = await userEmailLogin({ email, password })
        // 弹出提示
        switch (res.code) {
          case 0:          // 登录成功
            Message({ type: 'success', text: res.message })
            break
          case '10007':    // 密码错误
            Message({ type: 'warn', text: res.message })
            break
          case '10004':    // 用户不存在
            Message({ type: 'error', text: res.message })
            break
        }

        if (res.code === 0) {
          // 保存token 和 数据
          localStorage.setItem('xxm-pc-access_t', res.data.access_token)
          localStorage.setItem('xxm-pc-refresh_t', res.data.refresh_token)
          store.commit('user/setUser', res.data)
          // 跳转首页
          setTimeout(() => {
            router.push('/')
          }, 1500)
        }
      }
    }

    // 短信登录   ***************************************************

    // pause 暂停 resume 开始
    // useIntervalFn(回调函数,执行间隔,是否立即开启)
    const time = ref(0)
    const { pause, resume } = useIntervalFn(() => {
      if (time.value <= 0) {
        time.value = 0
        pause()
      }
      if (time.value > 0) {
        time.value--
      }
    }, 1000, false)
    onUnmounted(() => {
      pause()
    })

    // 1. 发送验证码
    // 1.1 绑定发送验证码按钮点击事件
    // 1.2 校验手机号，如果成功才去发送短信（定义API），请求成功开启60s的倒计时，不能再次点击，倒计时结束恢复
    // 1.3 如果失败，失败的校验样式显示出来
    const send = async () => {
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        // 通过
        if (time.value === 0) {
          console.info('发送');
          // 没有倒计时才可以发送
          await userMobileLoginMsg(form.mobile)
          Message({ type: 'success', text: '发送成功' })
          time.value = 60
          resume()
        }
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formCom.value.setFieldError('mobile', valid)
      }
    }

    // 注册跳转函数
    const register = () => {
      router.push('/user/register')
    }


    return { isMsgLogin, schema: mySchema, form, formCom, login, send, time, register }
  }
}
</script>
<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @themeColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        .icon-queren {
          color: @themeColor;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 85%;
          &.error {
            border-color: @priceColor;
          }
          &.success {
            border-color: @themeColor;
          }
          &.active,
          &:focus {
            border-color: @themeColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @themeColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
        &:hover {
          color: @themeColor;
        }
      }
    }
  }
}
</style>