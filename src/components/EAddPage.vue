<template>
  <div class="button-container">
    <a-dropdown-button @click="handleButtonClick">
      添加页面
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="1"><a-icon type="user" />1st menu item</a-menu-item>
        <a-menu-item key="2"><a-icon type="user" />2nd menu item</a-menu-item>
        <a-menu-item key="3"><a-icon type="user" />3rd item</a-menu-item>
      </a-menu>
    </a-dropdown-button>
  </div>
</template>
<style lang="less" scoped>
  .button-container {
    height: 65px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    border-bottom: 1px solid #fff;
  }
</style>
<script>
export default {
  name: 'EAddPage',
  methods: {
    handleButtonClick () {
      this.$emit('addCard')
    },
    handleMenuClick () {

    }
  }
}
</script>
