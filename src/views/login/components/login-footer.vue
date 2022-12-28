<template>
  <footer class="login-footer">
    <div class="container">
      <p>
        <a href="javascript:;">关于我们</a>
        <a href="javascript:;">帮助中心</a>
        <a href="javascript:;">售后服务</a>
        <a href="javascript:;">配送与验收</a>
        <a href="javascript:;">商务合作</a>
        <a href="javascript:;">搜索推荐</a>
        <a href="javascript:;">友情链接</a>
      </p>
      <p>CopyRight &copy; 小熊猫</p>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'LoginFooter'
}
</script>
<style lang="less" scoped>
.login-footer {
  padding: 30px 0 50px;
  background: #fff;
  p {
    text-align: center;
    color: #999;
    padding-top: 20px;
    a {
      line-height: 1;
      color: #999;
      display: inline-block;
      padding: 0 10px;
      &:hover {
        color: @themeColor;
      }
      //   为之后的所有a标签添加左边框
      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}
</style>