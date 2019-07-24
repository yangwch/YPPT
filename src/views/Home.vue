<template>
  <div>
    <h1>Home</h1>
    <a-button type="primary">按钮</a-button>
  </div>
</template>
<script>
import Vue from 'vue'
import { Button } from 'ant-design-vue'
Vue.component(Button.name, Button)
export default {
  components: {
  }
}
</script>
