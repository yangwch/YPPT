<template>
  <a-layout class="fit">
    <header-lay>
      <template v-slot:content>
        <editor-tools @startPicking="startPicking" @addImg="addImg" />
      </template>
    </header-lay>
   
    <a-layout>
      <a-layout-sider class="sider"></a-layout-sider>
      <a-layout-content class="content">
        <e-card :picking-point="picking" @picked="pickedPoint">
          <template v-for="item in pdata">
            <p-editor
              @resize="(options) => onDragResize(item, options)"
              @drag="(options) => onDragResize(item, options)"
              :key="item.id"
              :x="item.x"
              :y="item.y"
              :w="item.width"
              :h="item.height"
              :value="item.value"
              v-if="item.type === 'p'" />
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
import PImg from '../components/PImg.vue'
import EditorTools from '../components/EditorTools.vue'
import HeaderLay from '../layout/HeaderLay.vue'
import { mapState } from 'vuex'
export default {
  components: {
    ECard,
    PEditor,
    EditorTools,
    PImg,
    HeaderLay
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
    },
    onDragResize (item, options) {
      this.$store.commit('resize', {id: item.id, ...options})
    }
  }
}
</script>
