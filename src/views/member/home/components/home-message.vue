<template>
  <div class="system-message">
    <div class="title">
      <h3>系统通知</h3>
    </div>
    <div class="contnet">
      <div class="contentItem" v-for="item in list" :key="item.id">
        <div class="itemTitle">
          <span class="sysms">
            {{ item.title }}
          </span>
          <span class="time">{{ item.createdAt }}</span>
        </div>
        <div class="itemContent">
          <p>
            <span>{{ item.mstext }}</span>
            <a href="javascrip:;">快来看看吧>></a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSysMessage } from '@/api/member'
import { ref, nextTick } from 'vue'
export default {
  name: 'SystemMessage',
  setup () {
    let list = ref([])
    getSysMessage().then(res => {
      nextTick(() => {
        list.value = res.data
      })
    })

    console.log(list.value);

    return { list }
  }
}
</script>

<style lang="less" scoped>
.system-message {
  width: 800px;
  min-height: 300px;
  padding: 0 30px;
  background-color: rgb(255, 255, 255);
  .title {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgb(222, 227, 227);
    line-height: 50px;
  }
  .contnet {
    width: 100%;
    min-height: 300px;
    margin-top: 30px;
    // background-color: red;
    .contentItem {
      width: 100%;
      height: 100px;
      // background-color: rgba(211, 245, 245, 0.5);
      border: 1px solid rgb(224, 225, 225);
      margin-bottom: 20px;
      .itemTitle {
        height: 30px;
        .sysms {
          font-size: 16px;
          color: rgb(255, 123, 0);
          font-family: sans-serif;
        }
        .time {
          font-size: 10px;
          margin-left: 10px;
        }
      }
      .itemContent {
        width: 100%;
        height: 60px;
        // background-color: red;
        p {
        //   width: 100px;
          text-indent: 2em;
          a {
          color: rgb(19, 137, 191);
        }
        }
        
      }
    }
  }
}
</style>