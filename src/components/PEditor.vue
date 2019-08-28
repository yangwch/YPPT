<template>
  <drr
    :left="css.left"
    :top="css.top"
    :width="css.width"
    :height="css.height"
    :z-index="css.zIndex"
    :selected="selected"
    :active="active"
    :rotate-deg="css.rotate"
    @resize="data => $emit('resize', data)"
    @drag="data => $emit('drag', data)"
    @active="onActive"
    @deactive="onDeActive"
    @dragSelect="data => $emit('dragSelect', data)"
  >
    <div ref="paragraph" v-html="currentValue" class="paragraph" contenteditable="true" @focus="onActive"></div>
    <!-- 操作区域 拖动 -->
    <!-- <div class="anchor-move"
      @mousedown.stop.prevent="stickDown('move', $event)"></div>
    <div class="anchor anchor-west"
      @mousedown.stop.prevent="stickDown('west', $event)"
      @mousestart.stop.prevent="stickDown('west', $event)"
      ></div>
    <div class="anchor anchor-east"
      @mousedown.stop.prevent="stickDown('east', $event)"
      @mousestart.stop.prevent="stickDown('east', $event)"
      ></div> -->
  </drr>
</template>
<style lang="less">
  .placeholder:after {
    color: #ccc;
    content: "\8BF7\8F93\5165\5185\5BB9";
    position: absolute;
    left: 15px;
    top: 10px;
    width: 120px;
    z-index: -1;
  }
  .paragraph {
    outline: none;
    min-width: 100px;
    cursor: text;
    margin: 1px 5px;
    position: relative;
    z-index: 2;
  }
</style>

<script>
  import Drr from './Drr.vue'
  export default {
    name: 'p-editor',
    components: {
      Drr
    },
    props: {
      active: Boolean,
      selected: Boolean,
      // 属性
      template: String,
      css: Object,
      properties: Object
    },
    computed: {
      style() {
        let cssObj = {...this.css}
        Object.keys(cssObj).forEach(key => {
          if (['top', 'left', 'width'].indexOf(key) >= 0) {
            cssObj[key] += 'px'
          }
        })
        return cssObj
      }
    },
    data () {
      return {
        showPlaceholder: !this.template,
        currentValue: this.template || '',
        cx: this.css.left,
        cy: this.css.top,
        cw: this.css.width,
        // 是否重置左右大小
        resizeW: false,
        resizeE: false,
        // 移动
        moving: false,
        // 开始点
        stickStartPos: {}
      }
    },
    mounted () {
      let paragraph = this.$refs.paragraph
      paragraph.oninput = () => {
        let html = paragraph.innerText
        this.showPlaceholder = !html.trim()
        this.$emit('input', paragraph.innerHTML)
      }
    },
    beforeDestroy () {
    },
    methods: {
      onActive () {
        this.$emit('active')
      },
      onDeActive () {
        this.$emit('deactive')
      }
    }
  }
</script>
