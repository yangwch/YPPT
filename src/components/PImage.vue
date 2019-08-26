<template>
  <div :class="['image-container', {active: active || selected}]" :style="style" v-html="this.template" @click.stop="onClick"></div>
</template>
<script>
// import drr from '@minogin/vue-drag-resize-rotate'
import { composeStyle } from './../utils/rectHelper'
export default {
  props: {
    template: String,
    css: {
      type: Object,
      default () {
        return {}
      }
    },
    properties: {
      type: Object,
      default () {
        return {}
      }
    },
    active: Boolean,
    selected: Boolean
  },
  components: {
    // drr
  },
  computed: {
    style () {
      return composeStyle(this.css)
    }
  },
  mounted () {
    this.resetImgStyle()
  },
  watch: {
    properties () {
      this.$nextTick(this.resetImgStyle)
    }
  },
  methods: {
    resetImgStyle() {
      let img = this.$el.getElementsByTagName('img')[0]
      let imgStyles = this.properties.imgStyles
      if (img && imgStyles) {
        Object.keys(imgStyles).forEach(key => {
          img.style[key] = imgStyles[key]
        })
      }
    },
    onClick () {
      this.$emit('click')
    }
  }
}
</script>
<style lang="less" scoped>
  .image-container {
    position: absolute;
    &.active, &:hover {
      border: 1px solid rgb(107, 153, 224);
      margin-top: -1px;
      margin-left: -1px;
    }
  }
</style>
