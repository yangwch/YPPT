<template>
  <div>
    <e-card-view-item
      v-for="(item, index) in pages"
      :index="index + 1"
      :active="item.active"
      :selected="item.selected"
      :key="item.id"
      @click="onSwitchCurPage(index)"
    >
      <e-card :data="item" isIconView></e-card>
    </e-card-view-item>
  </div>
</template>

<script>
import ECardViewItem from './ECardViewItem.vue'
import ECard from './ECard.vue'
export default {
  name: 'ECardList',
  props: {
    pages: Array,
    currentPage: Number
  },
  components: {
    ECardViewItem,
    ECard
  },
  mounted () {
    document.addEventListener('keydown', this.onKeyPress)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.onKeyPress)
  },
  methods: {
    onSwitchCurPage (index) {
      this.$emit('onSwitchCurPage', index)
    },
    onKeyPress (ev) {
      let key = ev.key
      const ARROWUP = 'ArrowUp', ARROWDOWN = 'ArrowDown'
      if ([ARROWUP, ARROWDOWN].indexOf(key) >= 0) {
        let currentPage = this.currentPage
        if (ARROWUP === key && currentPage > 0) {
          this.onSwitchCurPage(--currentPage)
        } else if (ARROWDOWN === key && currentPage < this.pages.length - 1) {
          this.onSwitchCurPage(++currentPage)
        }
      }

    }
  }
}
</script>
