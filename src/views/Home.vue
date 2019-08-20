<template>
  <a-layout class="fit">
    <header-lay>
      <template v-slot:content>
        <editor-tools @startPicking="startPicking" @addImg="addImg" />
      </template>
    </header-lay>
   
    <a-layout>
      <a-layout-sider class="sider">
        <e-add-page @addCard="addCard"></e-add-page>
        <!-- <e-card-view-item index="1" active></e-card-view-item> -->
        <e-card-view-item
          v-for="(item, index) in cards"
          :index="index + 1"
          :active="item.active"
          :key="item.id"
          @click="onSelectCard(item)"  
        ></e-card-view-item>
      </a-layout-sider>
      <a-layout-content class="content">
        <e-card
          :picking-point="picking"
          @picked="pickedPoint"
          @selectRect="onSelectRect"
        >
          <template v-for="item in pdata">
            <p-editor
              @resize="(options) => onDragResize(item, options)"
              @drag="(options) => onDragResize(item, options)"
              @dragSelect="onDragSelect"
              @updateSnapshot="updateSnapshot"
              @active="onActive(item)"
              @deactive="onDeactive"
              @input="html => onInputChange(html, item)"
              :key="item.id"
              :x="item.x"
              :y="item.y"
              :w="item.width"
              :h="item.height"
              :value="item.value"
              :active="item.active"
              :selected="item.selected"
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
    border-right: 1px solid #ddd;
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
import ECardViewItem from '../components/ECardViewItem.vue'
import EAddPage from '../components/EAddPage.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    ECard,
    PEditor,
    EditorTools,
    PImg,
    HeaderLay,
    ECardViewItem,
    EAddPage
  },
  computed: {
    ...mapGetters({
      pdata: 'getCardDatas',
      cards: 'getCards'
    }),
    picking () {
      return this.$store.state.pickingPoint
    }
  },
  data () {
    return { }
  },
  methods: {
    startPicking () {
      this.$store.commit('startPicking')
    },
    pickedPoint (position) {
      this.$store.dispatch('addParagraph', position)
    },
    addImg (imgData) {
      this.$store.commit('addImg', imgData)
    },
    onDragResize (item, options) {
      this.$store.commit('resize', {id: item.id, ...options})
    },
    onSelectCard(item) {
      this.$store.commit('setActiveCard', item.id)
    },
    onActive (item) {
      this.$store.commit('setActiveCardItem', item.id)
    },
    onDeactive () {
      this.$store.commit('setActiveCardItem', null)
    },
    onSelectRect (rect) {
      this.$store.commit('setSelection', rect)
    },
    onDragSelect ({rx, ry}) {
      this.$store.commit('setSelectionLoc', {rx, ry})
    },
    // 更新快照，用于选中时更新位置、大小
    updateSnapshot () {
      this.$store.commit('updateSnapshot')
    },
    addCard () {
      this.$store.dispatch('addCard')
    },
    onInputChange (html, item) {
      this.$store.commit('updateInput', {value: html, id: item.id})
    }
  }
}
</script>
