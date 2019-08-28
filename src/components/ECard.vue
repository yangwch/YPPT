<template>
  <div :class="['card-box', {picking: pickingPoint, iconView: isIconView}]" @mousedown.stop="startDrawing($event)">
    <div
      class="card"
      ref="card"
      :style="data.properties && data.properties.styles"
    >
      <template v-for="(item) in data.components">
        <p-editor
          :active="item.active"
          :selected="item.selected"
          v-if="item.type === COMPONENT_TYPE.TEXT"
          :key="item.id"
          :template="item.template"
          :css="item.css"
          :properties="item.properties"
          @resize="options => $emit('resize', item, options)"
          @drag="options=> $emit('drag', item, options)"
          @dragSelect="options => $emit('dragSelect', options)"
          @updateSnapshot="$emit('updateSnapshot')"
          @active="$emit('active', item)"
          @deactive="$emit('deactive')"
          @input="html => $emit('input', html, item)"
        ></p-editor>
        <p-img
          v-else-if="item.type === COMPONENT_TYPE.IMAGE"
          :key="item.id"
          :template="item.template"
          :css="item.css"
          :properties="item.properties"
          :active="item.active"
          :selected="item.selected"
          @resize="options => $emit('resize', item, options)"
          @drag="options=> $emit('drag', item, options)"
          @dragSelect="options => $emit('dragSelect', options)"
          @updateSnapshot="$emit('updateSnapshot')"
          @active="$emit('active', item)"
          @deactive="$emit('deactive')"
        ></p-img>
      </template>
    </div>
    <rect-range :drawing="drawing" :start-pos="startPos" @up="up"></rect-range>
  </div>
</template>
<script type="text/javascript">
  import RectRange from './RectRange.vue'

  import PEditor from '../components/PEditor.vue'
  import PImg from '../components/PImage.vue'
  import {COMPONENT_TYPE} from './../models/ComponentType'
  export default {
    name: 'ECard',
    components: {
      RectRange,
      PEditor,
      PImg
    },
    props: {
      pickingPoint: {
        type: Boolean,
        default () {
          return false
        }
      },
      data: {
        type: Object,
        default () {
          return {
            components: []
          }
        }
      },
      // 左侧预览
      isIconView: Boolean
    },
    watch: {
      pickingPoint (v) {
        this.detectPickingEvent(v)
      }
    },
    data () {
      return {
        drawing: false,
        // 开始点
        startPos: {},
        // rectPos: { x: 0, y: 0, w: 0, h: 0 },
        // 组件类型
        COMPONENT_TYPE
      }
    },
    methods: {
      detectPickingEvent (flag) {
        if (flag) {
          this.$el.addEventListener('click', this.emitPickingEvent, false)
        } else {
          this.$el.removeEventListener('click', this.emitPickingEvent)
        }
      },
      emitPickingEvent (evt) {
        // console.log(evt)
        let { offsetX, offsetY } = evt
        this.$emit('picked', {
          x: offsetX,
          y: offsetY
        })
      },
      getEvPos (ev) {
        const mouseX = ev.pageX || ev.touches[0].pageX
        const mouseY = ev.pageY || ev.touches[0].pageY
        let {layerX, layerY} = ev
        return {x: layerX, y: layerY, mouseX, mouseY}
      },
      // 开始画
      startDrawing (ev) {
        // console.log(ev)
        const cardDom = this.$refs.card
        if (ev.target === this.$el || ev.target === cardDom) {
          this.drawing = true
          Object.assign(this.startPos, this.getEvPos(ev))
        }
      },
      up (rect) {
        if (this.drawing) {
          this.drawing = false
          const range = this.getDomsRange()
          let relRect = Object.assign({}, rect, {
            x: rect.x - range.left,
            y: rect.y - range.top
          })
          // console.log('rect', relRect)
          this.$emit('selectRect', relRect)
        }
      },
      // 获取el与Card之间的间隙
      getDomsRange () {
        const el = this.$el, card = this.$refs.card
        const rectEl = el.getBoundingClientRect(), rectCard = card.getBoundingClientRect()
        return {
          left: rectCard.left - rectEl.left,
          top: rectCard.top - rectEl.top
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .card-box {
    width: 100%;
    height: 100%;
    min-height: 640px;
    overflow: auto;
    position: relative;
    &.picking {
      cursor: crosshair;
    }
    .card {
      width: 960px;
      height: 540px;
      margin: 0 auto;
      transform-origin: 0px 0px 0px;
      transform: matrix(1, 0, 0, 1, 50, 50);
      word-break: break-all;
      background-color: #F7F7F7;
      box-sizing: content-box;
      outline-color: black;
      box-shadow: 1px 1px 10px #bbb;
      font-family: '-apple-system, BlinkMacSystemFont, "PingFang SC", Helvetica, Tahoma, Arial, "Microsoft YaHei", 微软雅黑, 黑体, Heiti, sans-serif, SimSun, 宋体, serif';
    }
    &.iconView {
      pointer-events: none;
      .card {
        margin: 0;
        transform: scale(0.1333);
      }
    }
  }
</style>
