<template>
  <a-layout class="fit">
    <a-layout-header class="header">
      <h1>Home</h1>
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="sider">Sider</a-layout-sider>
      <a-layout-content class="content">
        <e-card>
          <p-editor v-for="item in pdata" :key="item.id" :left="item.left" :right="item.right" v-model="item.value" />
        </e-card>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<style lang="less" scoped>
  .fit {
    width: 100%;
    height: 100%;
  }
  .header {
    text-align: center;
    border: solid 1px #e5e5e5;
    background-color: #f7f7f7;
  }
  .sider {
    border-top: 0;
    background-color: #f7f7f7;
  }
  .content {
    overflow: auto;
  }
</style>
<script>
import ECard from '../components/ECard.vue'
import PEditor from '../components/PEditor.vue'
export default {
  components: {
    ECard,
    PEditor
  },
  data () {
    return {
      pdata: [
        {
          id: 1,
          left: '100px',
          top: '100px',
          value: '一段文字'
        },
        {
          id: 2,
          left: '200px',
          top: '200px',
          value: ''
        }
      ]
    }
  }
}
</script>
