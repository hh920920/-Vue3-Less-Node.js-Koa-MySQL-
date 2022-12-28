<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin=true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <!-- 给Form表单加上 :validation-schema ，才能进行校验 -->
    <Form ref="formCom" class="form" :validation-schema="schema" v-slot="{errors}" autocomplete="off">
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field name="account" :class="{error: errors.account}" v-model="form.account" type="text" placeholder="请输入账号" />
          </div>
          <div class="error" v-if="errors.account"><i class="iconfont icon-warning" />{{errors.account}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field name="password" :class="{error: errors.password}" v-model="form.password" type="password" @keyup.enter="login()" placeholder="请输入密码" />
          </div>
          <div class="error" v-if="errors.password"><i class="iconfont icon-warning" />{{errors.password}}</div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field name="mobile" :class="{error: errors.mobile}" v-model="form.mobile" type="text" placeholder="请输入手机号" />
          </div>
          <div class="error" v-if="errors.mobile"><i class="iconfont icon-warning" />{{errors.mobile}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field name="code" :class="{error: errors.code}" v-model="form.code" type="password" placeholder="请输入验证码" />
            <span class="code" @click="send()">{{ time === 0 ? '发送验证码' : `${time}秒后发送` }}</span>
          </div>
          <div class="error" v-if="errors.code"><i class="iconfont icon-warning" />{{errors.code}}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <XxmCheckbox v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login()" >登录</a>
    </Form>
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
import { userAccountLogin, userMobileLogin, userMobileLoginMsg } from '@/api/user'
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
      account: null,    // 账号
      password: null,   // 密码
      mobile: null,     // 手机号
      code: null,       // 验证码
      isAgree: true    // 是否同意协议
    })

    // 校验规则
    const mySchema = {
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree,
    }

    // 监听isMsgLogin 重置表单 (还原数据 + 清除校验效果)
    const formCom = ref(null)
    watch(isMsgLogin, () => {
      // 还原数据
      form.account = null,
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
      //  console.info(formCom.value.validate());
      let valid = await formCom.value.validate()
      console.info(valid);
      // proxy.$message({ text: '123', type: 'error'})
      // console.log(proxy.$message({ text: '123', type: 'error'}))
      if (valid) {
        let { account, password } = form
        // 请求登录接口
        userAccountLogin({ account, password }).then(data => {
          // 1. 成功,存储用户信息到vuex
          store.commit('user/setUser', data.result)
          // 2. 提示
          Message({ type: 'success', text: '登录成功' })
          // 3. 跳转首页
          router.push(route.query.redirectUrl || '/')

        }).catch(e => {
          // 失败 提示失败信息
          if (e.response.data) {
            Message({
              type: 'error', text: e.response.data.message || '登录失败'
            })
          }
        })
      } else {
        // 短信登录
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
        time.value --
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
      router.push('/register')
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
            border-color: rgb(61, 240, 61);
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