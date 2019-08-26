<template>
  <a-layout class="fit">
    <header-lay>
      <template v-slot:content>
        <editor-tools
          @startPicking="startPicking"
          @addImg="addImg"
          @doCommand="doCommand"
        />
      </template>
    </header-lay>
   
    <a-layout>
      <a-layout-sider class="sider sider-list">
        <e-add-page @addCard="addCard"></e-add-page>
        <e-card-list
          :pages="pages"
          :current-page="currentPage"
          @onSwitchCurPage="onSwitchCurPage"
        ></e-card-list>
      </a-layout-sider>
      <a-layout-content class="content">
        <e-card
          :picking-point="picking"
          :data="currentPageData"
          @picked="pickedPoint"
          @selectRect="onSelectRect"
          @resize="onDragResize"
          @drag="onDragResize"
          @dragSelect="onDragSelect"
          @updateSnapshot="updateSnapshot"
          @active="onActive"
          @deactive="onDeactive"
          @input="onInputChange"
        >
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
    &-list {
      overflow: auto;
    }
  }
  .content {
    overflow: auto;
  }
  
</style>
<script>
import ECard from '../components/ECard.vue'
import EditorTools from '../components/EditorTools.vue'
import HeaderLay from '../layout/HeaderLay.vue'
// import ECardViewItem from '../components/ECardViewItem.vue'
import EAddPage from '../components/EAddPage.vue'
import { mapGetters } from 'vuex'
import ECardList from '../components/ECardList.vue'
import { setTimeout } from 'timers';
export default {
  components: {
    ECard,
    // PEditor,
    EditorTools,
    // PImg,
    HeaderLay,
    // ECardViewItem,
    EAddPage,
    ECardList
  },
  computed: {
    ...mapGetters({
      pdata: 'getCardDatas',
      cards: 'getCards',
      // 当前页数据
      currentPageData: 'getCurrentPageData',
      pages: 'getPages',
    }),
    picking () {
      return this.$store.state.pickingPoint
    },
    currentPage () {
      return this.$store.state.currentPage
    }
  },
  data () {
    return { }
  },
  mounted () {
    this.$store.dispatch('getPPTData')
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
    onSwitchCurPage(pageIndex) {
      this.$store.commit('switchCurrentPage', pageIndex)
    },
    onActive (item) {
      console.log('active', item)
      if (item && item.id) {
        this.$store.commit('setActiveCardItem', item.id)
      }
    },
    onDeactive () {
      this.$store.commit('setActiveCardItem', null)
    },
    onSelectRect (rect) {
      // console.log('rect', rect)
      setTimeout(() => {
        this.$store.commit('setSelection', rect)
      }, 30)
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
    },
    doCommand (cmd, val) {
      this.$store.dispatch('doCommand', {cmd, val})
    }
  }
}
</script>
