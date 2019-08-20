<template>
  <div :class="['card-box', {picking: pickingPoint}]" @mousedown.stop="startDrawing($event)">
    <div class="card" ref="card">
      <slot></slot>
    </div>
    <rect-range :x="rectPos.x" :y="rectPos.y" :w="rectPos.w" :h="rectPos.h"></rect-range>
  </div>
</template>
<script type="text/javascript">
  import RectRange from './RectRange.vue'
  export default {
    name: 'ECard',
    components: {
      RectRange
    },
    props: {
      pickingPoint: {
        type: Boolean,
        default () {
          return false
        }
      }
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
        rectPos: { x: 0, y: 0, w: 0, h: 0 }
      }
    },
    mounted () {
      document.documentElement.addEventListener('mousemove', this.move)
      document.documentElement.addEventListener('mouseup', this.up)
      document.documentElement.addEventListener('mouseleave', this.up)
    },
    beforeDestroy () {
      document.documentElement.removeEventListener('mousemove', this.move)
      document.documentElement.removeEventListener('mouseup', this.up)
      document.documentElement.removeEventListener('mouseleave', this.up)
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
        if (ev.target === this.$el || ev.target === this.$refs.card) {
          this.drawing = true
          
          Object.assign(this.startPos, this.getEvPos(ev))
        }
      },
      move (ev) {
        if (this.drawing) {
          const {x, y, mouseX, mouseY} = this.startPos
          const {x: ex, y: ey, mouseX: emouseX, mouseY: emouseY} = this.getEvPos(ev)
          const rx = emouseX - mouseX, ry = emouseY - mouseY,
            minX = ex > x ? x : ex, minY = ey > y ? y : ey
          Object.assign(this.rectPos, {
            x: minX,
            y: minY,
            w: Math.abs(rx),
            h: Math.abs(ry)
          })
          // console.log('rect', this.rectPos)
        }
      },
      up (ev) {
        ev.stopPropagation()
        if (this.drawing) {
          this.drawing = false
          this.$emit('selectRect', this.rectPos)
          this.rectPos = { x: 0, y: 0, w: 0, h: 0 }
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
      transform-origin: 0px 0px 0px;
      transform: matrix(1, 0, 0, 1, 50, 50);
      word-break: break-all;
      background-color: #F7F7F7;
      box-sizing: content-box;
      outline-color: black;
      box-shadow: 1px 1px 10px #bbb;
      font-family: '-apple-system, BlinkMacSystemFont, "PingFang SC", Helvetica, Tahoma, Arial, "Microsoft YaHei", 微软雅黑, 黑体, Heiti, sans-serif, SimSun, 宋体, serif';
    }
  }
</style>
