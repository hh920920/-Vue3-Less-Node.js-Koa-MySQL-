<template>
  <XxmBread>
    <XxmBreadItem to="/">首页</XxmBreadItem>
    <XxmBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</XxmBreadItem>
    <transition name="fade-right" mode="out-in">
        <XxmBreadItem v-if="category.sub" :key="category.sub.id">{{category.sub.name}}</XxmBreadItem>
    </transition>
  </XxmBread>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'SubBread',
  setup() {
    // 注意：setup中this不是当前vue实例

    // 1. 获取二级分类的ID，在地址在路由中
    // route ===> this.$route
    const route = useRoute()
    // 2. 获取vuex中的类目数据
    const store = useStore()
    // 3. 通过计算属性得到，二级类目的名称和ID，一级类目的名称和ID
    const category = computed(() => {
      const obj = {}
      store.state.category.list.forEach(top => {
        top.children && top.children.forEach(sub => {
          if (sub.children_id === parseInt(route.params.id)) {
            // 设置二级类目
            obj.sub = {id: sub.children_id, name: sub.name}
            // 设置一级类目
            obj.top = {id: top.children_id, name: top.name}
          }
        })
      })
      
      return obj
    })

    return {
        category
    }
  }
}
</script>