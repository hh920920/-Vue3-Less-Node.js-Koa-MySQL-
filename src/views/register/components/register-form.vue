<template>
  <div class="register-box">
    <div class="toggle"></div>
    <!-- 给Form表单加上 :validation-schema ，才能进行校验 -->
    <Form ref="formCom" class="form" :validation-schema="schema" v-slot="{errors}" autocomplete="off">
      <template v-if="isRegister">
        <!-- 手机号输入框 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field name="mobile" :class="{error: errors.mobile == '手机号格式错误' || errors.mobile == '请输入手机号' , success: errors.mobile == true }" v-model="form.mobile" type="text" placeholder="请输入手机号" />
            <i class="iconfont icon-queren" v-if="/^1[3-9]\d{9}$/.test(form.mobile)" />
          </div>
          <div class="error" v-if="errors.mobile"><i class="iconfont icon-warning" />{{errors.mobile}}</div>
        </div>
        <!-- 验证码输入框 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field name="code" :class="{error: errors.code == '验证码是6个数字' , success: errors.code == 'true' }" v-model="form.code" type="text"  placeholder="请输入验证码" />
            <span class="code" @click="send()">{{ time === 0 ? '发送验证码' : `${time}秒后发送` }}</span>
          </div>
          <div class="error" v-if="errors.code"><i class="iconfont icon-warning" v-if="errors.code != 'true' " /><span v-if="errors.code != 'true' ">{{errors.code}}</span></div>
        </div>
        <!-- 密码输入框 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field name="password" :class="{error: errors.password == '密码是6-24个字符', success: errors.password == 'true' }" v-model="form.password" type="text" placeholder="请输入密码" />
            <i class="iconfont icon-queren" v-if="/^\w{6,24}$/.test(form.password)" />
          </div>
          <div class="error" v-if="errors.password"><i class="iconfont icon-warning" />{{errors.password}}</div>
        </div>
      </template>
      <a href="javascript:;" class="btn" @click="register()">注 册</a>
      <a href="javascript:;" class="btn" @click="goLogin()">已有账号？ 去登录</a>
    </Form>
  </div>
</template>
<script>
import { reactive, ref, onUnmounted } from 'vue'
import Message from '@/components/Message'
import { userAccountLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
// 引入第三方插件 vee-validate 表单验证  
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import { useIntervalFn } from '@vueuse/core'
export default {
  name: 'LoginForm',
  components: {
    Form,
    Field
  },
  setup() {

    // 使用store
    const store = useStore()
    // 使用router
    const router = useRouter()
    // 使用route
    const route = useRoute()

    // 表单信息对象
    const form = reactive({
      mobile: null,    // 账号
      password: null,   // 密码
      code: null,       // 验证码
      // isAgree: true    // 是否同意协议
    })

    // 校验规则
    const mySchema = {
      mobile: schema.mobile,
      password: schema.password,
      code: schema.code
    }


    // 监听 isRegister 重置表单 (还原数据 + 清除校验效果)
    const isRegister = ref(true)
    const formCom = ref(null)
    

    // 账号登录登录函数，（验证表单）  *****  ********************************
    const register = async () => {
      // Form组件提供了一个 validate() 函数来验证整体表单，返回的是一个promise，结果校验合格则是true,否则为false
      let valid = await formCom.value.validate()
      console.info(valid);
      // proxy.$message({ text: '123', type: 'error'})
      // console.log(proxy.$message({ text: '123', type: 'error'}))
      if (valid == 'true') {
        // let { mobile, password, code } = form
        // 请求注册接口
      }

    }


    // 发送短信   ***************************************************

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
      console.info(valid);
      if (valid == true) {
        // 通过
        if (time.value === 0) {
        // 没有倒计时才可以发送
          // await userMobileLoginMsg(form.mobile)
          Message({ type: 'success', text: '发送成功' })
          time.value = 60
          resume()
        }
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formCom.value.setFieldError('mobile', valid )
      }
    }

    // 跳转登录函数
    const goLogin = () => {
      router.push('/login')
    }


    return { form, isRegister, schema: mySchema, formCom, register, goLogin, time, send }
  }
}
</script>
<style lang="less" scoped>
// 账号容器
.register-box {
  .toggle {
    padding: 15px 40px;
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        .icon-user, .icon-lock, .icon-code {
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
          color: green;
          width: 34px;
          height: 34px;
          position: absolute;
          right: 1px;
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
            border-color: rgb(164, 249, 164);
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
          &:hover {
          color: rgb(27, 226, 233);
          }
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
      > .success {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        border-color: rgb(61, 240, 61);
        color: green;
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
      margin-bottom: 10px;
      background: @themeColor;
      &:hover {
        color: rgb(177, 245, 165);
      }
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
}
</style>