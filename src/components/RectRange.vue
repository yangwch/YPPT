<template>
  <div :class="['rect-box', {drawing: drawing}]" >
    <div class="rect-box-drawing" :style="rectStyle">
    </div>
  </div>
</template>
<script>
export default {
  name: 'RectRange',
  computed: {
    rectStyle () {
      return {
        left: this.rectPos.x + 'px',
        top: this.rectPos.y + 'px',
        width: this.rectPos.w + 'px',
        height: this.rectPos.h + 'px'
      }
    }
  },
  props: {
    startPos: Object,
    drawing: Boolean
  },
  data () {
    return {
      // drawing: false,
      // 开始点
      // startPos: {},
      rectPos: {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      },
      relativePos: {}
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
  watch: {
    drawing (val) {
      if (val) {
        this.getClientRects()
      }
    }
  },
  methods: {
    getClientRects () {
      const rect = this.$el.getClientRects()[0]
      const {x, y} = rect
      this.relativePos = Object.assign({}, this.startPos, {
        x: this.startPos.mouseX - x,
        y: this.startPos.mouseY - y
      })
    },
    // 开始画
    startDrawing (ev) {
      if (ev.target === this.$el || ev.target === this.$refs.card) {
        this.drawing = true
        
        Object.assign(this.startPos, this.getEvPos(ev))
      }
    },
    getEvPos (ev) {
      const mouseX = ev.pageX || ev.touches[0].pageX
      const mouseY = ev.pageY || ev.touches[0].pageY
      let {layerX, layerY} = ev
      return {x: layerX, y: layerY, mouseX, mouseY}
    },
    move (ev) {
      ev.stopPropagation()
      ev.preventDefault()
      if (this.drawing) {
        const {x, y, mouseX, mouseY} = this.relativePos
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
        // this.drawing = false
        this.$emit('up', this.rectPos)
        this.rectPos = { x: 0, y: 0, w: 0, h: 0 }
      }
    }
  }
}
</script>
<style lang="less"  scoped>
  .rect-box {
    background: rgba(0, 0, 0, 0.064);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    &.drawing {
      z-index: 1000000;
    }
    &-drawing {
      position: absolute;
      display: block;
      background-color: #aeadad3a;
    }
  }
</style>
