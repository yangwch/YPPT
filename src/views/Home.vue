<template>
  <a-layout class="fit">
    <!-- <a-layout-header> -->
    <a-layout class="tools">
      <a-layout-sider class="sider"></a-layout-sider>
      <a-layout-content>
        <editor-tools @startPicking="startPicking" @addImg="addImg" />
      </a-layout-content>
      <a-layout-sider class="sider">
        sider
      </a-layout-sider>
    </a-layout>
    <!-- </a-layout-header> -->
   
    <a-layout>
      <a-layout-sider class="sider"></a-layout-sider>
      <a-layout-content class="content">
        <e-card :picking-point="picking" @picked="pickedPoint">
          <template v-for="item in pdata">
            <p-editor :key="item.id" :x="item.x" :y="item.y" :w="item.width" :h="item.height" :value="item.value" v-if="item.type === 'p'" />
            <p-img :key="item.id"  :x="item.x" :y="item.y" :w="item.width" :h="item.height" :src="item.src" v-else-if="item.type === 'img'" />
          </template>
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
    overflow: hidden;
  }
  .sider {
    border-top: 0;
    background-color: #f7f7f7;
  }
  .content {
    overflow: auto;
  }
  .tools {
    height: 48px;
    background-color: #f7f7f7;
    text-align: center;
    display: flex;
    align-items: center;
    justify-items: center;
  }
</style>
<script>
import ECard from '../components/ECard.vue'
import PEditor from '../components/PEditor.vue'
import PImg from '../components/PImg.vue'
import EditorTools from '../components/EditorTools.vue'
import { mapState } from 'vuex'
export default {
  components: {
    ECard,
    PEditor,
    EditorTools,
    PImg
  },
  computed: {
    ...mapState({
      pdata: state => state.datas,
      picking: state => state.pickingPoint
    })
  },
  data () {
    return { }
  },
  methods: {
    startPicking () {
      this.$store.commit('startPicking')
    },
    pickedPoint (position) {
      this.$store.commit('addInputBlock', position)
    },
    addImg (imgData) {
      this.$store.commit('addImg', imgData)
    }
  }
}
</script>
