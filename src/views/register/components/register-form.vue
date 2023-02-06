<template>
  <div class="register-box">
    <div class="toggle"></div>
    <!-- 给Form表单加上 :validation-schema ，才能进行校验 -->
    <Form ref="formCom" class="form" :validation-schema="schema" v-slot="{errors}" autocomplete="off">
      <template v-if="isRegister">
        <!-- 邮箱输入框 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-youxiang"></i>
            <Field name="email" :class="{error: errors.email == '邮箱格式错误' || errors.email == '请输入邮箱帐号' , success: (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{3,4})$/).test(form.email) }" v-model="form.email" type="text" placeholder="请输入邮箱帐号" />
            <i class="iconfont icon-queren" v-if="/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{3,4})$/.test(form.email)" />
          </div>
          <div class="error" v-if="errors.email"><i class="iconfont icon-warning-circle" />{{errors.email}}</div>
        </div>
        <!-- 用户名输入框 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-yonghu"></i>
            <Field name="user_name" :class="{error: errors.user_name == '请输入用户名' || errors.user_name == '字母开头且6-20个字符', success: (/^[a-zA-Z]\w{5,19}$/).test(form.user_name) }" v-model="form.user_name" type="text" placeholder="请输入用户名" />
            <i class="iconfont icon-queren" v-if="/^[a-zA-Z]\w{5,19}$/.test(form.user_name)" />
          </div>
          <div class="error" v-if="errors.user_name"><i class="iconfont icon-warning-circle" />{{errors.user_name}}</div>
        </div>
        <!-- 密码输入框 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-mima"></i>
            <Field name="password" :class="{error: errors.password == '请输入密码' || errors.password == '密码是6-24个字符', success: (/^\w{6,24}$/).test(form.password) }" v-model="form.password" type="password" placeholder="请输入密码" />
            <i class="iconfont icon-queren" v-if="/^\w{6,24}$/.test(form.password)" />
          </div>
          <div class="error" v-if="errors.password"><i class="iconfont icon-warning-circle" />{{errors.password}}</div>
        </div>
        <!-- 确认密码输入框 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-mima"></i>
            <Field name="confirmPw" :class="{error: errors.confirmPw == '请输入确认密码' || errors.confirmPw == '密码是6-24个字符' ||  errors.confirmPw == '两次密码不一致', success: (/^\w{6,24}$/).test(form.confirmPw) }" v-model="form.confirmPw" type="password" placeholder="请输入确认密码" />
            <i class="iconfont icon-queren" v-if="/^\w{6,24}$/.test(form.confirmPw)" />
          </div>
          <div class="error" v-if="errors.confirmPw"><i class="iconfont icon-warning-circle" />{{errors.confirmPw}}</div>
        </div>
      </template>
      <a href="javascript:;" class="btn" @click="register()">注 册</a>
      <div class="action">
        <a href="javascript:;" @click="goLogin()">已有账号？ 去登录 <i class="iconfont icon-youjiantou"></i></a>
      </div> <!-- <a href="javascript:;" class="btn" @click="goLogin()">已有账号？ 去登录</a> -->
    </Form>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import Message from '@/components/Message'
import { userEmailRegister } from '@/api/user'
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
      email: null,      // 邮箱账号
      user_name: null,  // 用户名
      password: null,   // 密码
      confirmPw: null,  // 确认密码
    })

    // 校验规则
    const mySchema = {
      email: schema.email,
      password: schema.password,
      user_name: schema.user_name,
      confirmPw: schema.confirmPw
    }

    // 监听 isRegister 重置表单 (还原数据 + 清除校验效果)
    const isRegister = ref(true)
    // watch(isMsgLogin, () => {
    //   // 重置数据
    //   form.email = null
    //   form.uuser_name = null
    //   form.password = null
    //   form.confirmPw = null
    //   // 如果是没有销毁Field组件，之前的校验结果是不会清除  例如：v-show切换的
    //   // Form组件提供了一个 resetForm 函数清除校验结果
    //   formCom.value.resetForm()
    // })

    const formCom = ref(null)

    // 账号登录登录函数，（验证表单）  *****  ********************************
    const register = async () => {
      // Form组件提供了一个 validate() 函数来验证整体表单，返回的是一个promise，结果校验合格则是true,否则为false
      let { valid } = await formCom.value.validate()

      if (valid == true) {
        let { email, user_name, confirmPw } = form
        // 请求注册接口
        const res = await userEmailRegister({ email, user_name, password: confirmPw })
        if (res) {
          switch (res.code) {
            case 0:          // 成功下发激活链接
              Message({ type: 'success', text: res.message })
              break
            case '10003':    // 用户已注册
              Message({ type: 'error', text: res.message })
              break
            case '10004':    // 用户未激活
              Message({ type: 'warn', text: res.message })
              break
          }
        }
      }

    }

    // 跳转登录函数
    const goLogin = () => {
      router.push('/user/login')
    }


    return { form, isRegister, schema: mySchema, formCom, register, goLogin }
  }
}
</script>
<style lang="less" scoped>
// 账号容器
.register-box {
  .toggle {
    margin-top: 15px;
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        .icon-youxiang,
        .icon-yonghu,
        .icon-mima {
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
  .action {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    a {
      color: rgb(90, 89, 89);
      font-size: 16px;
      // margin-left: 10px;
      &:hover {
        color: @themeColor;
      }
    }
  }
}
</style>