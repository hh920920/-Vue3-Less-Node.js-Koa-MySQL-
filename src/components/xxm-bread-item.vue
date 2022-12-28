<template>
  <div class="xxm-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>
<script>
export default {
  name: 'XxmBreadItem',
  props: {
    to: {
      type: [String, Object],
      default: ''
    }
  },
  setup () {
  }
}
</script>
