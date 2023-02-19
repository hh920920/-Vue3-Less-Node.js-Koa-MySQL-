<template>
  <div class="user-info">
    <div class="title">
      <router-link to="/user/info"><span :class="{ active: activeName === 'userinfo' }">基本信息</span></router-link>
      <router-link to="/user/set"><span :class="{ active: activeName === 'userset' }">安全设置</span></router-link>
    </div>
    <div class="info-editor">
      <div class="user-image">
        <div class="avatar">
          <img :src="userInfo.picture" />
        </div>

      </div>
      <!-- 用户名 -->
      <div class="info_set">
        <div class="editors">
          <span><b>名称:</b></span>
          <span v-if="isEditor.nameEditor === false">{{ userInfo.user_name }}</span>
          <template v-else>
            <el-input size="small" v-model="newData.newName" placeholder="Please input" />
          </template>
        </div>
        <a href="javascript:;" v-if="isEditor.nameEditor === false" @click="isEditor.nameEditor = true">设置</a>
        <div v-else>
          <a href="javascript:;" @click="cancelName()">取消</a>
          <a href="javascript:;" @click="saveName()">保存</a>
        </div>
      </div>
      <!-- 用户性别  -->
      <div class="info_set">
        <div class="editors">
          <span><b>性别:</b></span>
          <span v-if="isEditor.sexEditor === false">{{ userInfo.sex }}</span>
          <div class="name_editor" v-else>
            <el-radio-group v-model="newData.newSex" class="ml-4">
              <el-radio label="1" size="large">男</el-radio>
              <el-radio label="2" size="large">女</el-radio>
            </el-radio-group>
          </div>
        </div>
        <a href="javascript:;" v-if="isEditor.sexEditor === false" @click="isEditor.sexEditor = true">设置</a>
        <div v-else>
          <a href="javascript:;" @click="cancelSex()">取消</a>
          <a href="javascript:;" @click="saveSex()">保存</a>
        </div>
      </div>
      <!-- 用户生日  -->
      <div class="info_set">
        <div class="editors">
          <span><b>生日:</b></span>
          <span v-if="isEditor.birthdayEditor === false">{{ userInfo.birthday }}</span>
          <div class="bir_editor" v-else>
            <el-date-picker v-model="newData.newBirthday" type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD" placeholder="Pick a day" />
          </div>
        </div>
        <a href="javascript:;" v-if="isEditor.birthdayEditor === false" @click="isEditor.birthdayEditor = true">设置</a>
        <div v-else>
          <a href="javascript:;" @click="cancelBirthday()">取消</a>
          <a href="javascript:;" @click="saveBirthday()">保存</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { updateBirthday, updateName, updateSex } from '@/api/member'
import { genFileId } from 'element-plus'
import { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
export default {
  name: 'UserInfo',

  setup() {

    const activeName = ref('userinfo')

    const newData = reactive({
      newName: '',
      newSex: '1',
      newBirthday: ''
    })
    const isEditor = reactive({
      nameEditor: false,
      sexEditor: false,
      birthdayEditor: false
    })

    const store = useStore()
    const userInfo = computed(() => {
      return store.state.user.profile
    })

    // 修改用户名
    const cancelName = () => {
      isEditor.nameEditor = false
      newData.newName = ''
    }
    const saveName = () => {
      updateName({ user_name: newData.newName }).then(res => {
        if (res.code === 0) {
          store.commit('user/updateName', newData.newName)
          newData.newName = ''
          isEditor.nameEditor = false
        }
      })
    }
 
    // 修改用户性别
    const cancelSex = () => {
      isEditor.sexEditor = false
      newData.newSex = '1'
    }
    const saveSex = () => {
      let sex = newData.newSex == 1 ? '男' : '女'
      updateSex({ sex: newData.newSex }).then(res => {
        if (res.code === 0) {
          store.commit('user/updateSex', sex)
          newData.newSex = ''
          isEditor.sexEditor = false
        }
      })
    }

    // 修改用户生日
    const cancelBirthday = () => {
      isEditor.birthdayEditor = false
      newData.newBirthday = ''
    }
    const saveBirthday = () => {
    //   console.log(newData.newBirthday);
        updateBirthday({ birthday: newData.newBirthday }).then(res => {
          if (res.code === 0) {
            store.commit('user/updateBirthday', newData.newBirthday)
            newData.newBirthday = ''
            isEditor.birthdayEditor = false
          }
        })
    }


    return {
      activeName,
      userInfo,
      newData,
      isEditor,
      cancelName,
      saveName,
      cancelSex,
      saveSex,
      cancelBirthday,
      saveBirthday
    }
  }
}
</script>
<style lang="less" scoped>
.active {
  color: green;
  &:before {
    content: "";
    height: 1.5px;
    background-color: rgb(105, 210, 76);
    width: 100%;
    position: absolute;
    left: 0;
    bottom: -9px;
  }
}
.user-info {
  min-width: 300px;
  min-height: 300px;
  padding: 0 20px;
  background-color: rgb(255, 255, 255);
  .title {
    width: 600px;
    height: 47px;
    border-bottom: 2px solid rgb(203, 200, 200);
    span {
      line-height: 60px;
      margin-right: 50px;
      cursor: pointer;
      position: relative;
    }
  }
  .info-editor {
    width: 560px;
    min-height: 200px;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: rgba(240, 238, 238, 0.3);
    .user-image {
      width: 300px;
      height: 100px;
      margin: auto;
      margin-bottom: 40px;
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 60px;
        text-align: center;
        line-height: 00px;
        cursor: pointer;
      }
    }
    .info_set {
      width: 100%;
      height: 50px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .editors {
        width: 300px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        .el-input--small {
          width: 150px;
          height: 30px;
        }
        .el-radio-group {
          margin-left: 60px;
        }
        .bir_editor {
          width: 150px;
          margin-left: 50px;
        }
        span {
          width: 100px;
          height: 100%;
          justify-content: space-around;
        }
        .name_editor {
          width: 200px;
          height: 35px;
          margin-left: 30px;
          line-height: 20px;
          //   background-color: blue;
        }
      }
      a {
        color: #00cc36;
        margin-left: 10px;
      }
    }
  }
}
</style>