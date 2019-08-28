<template>
  <div
    :class="['drr-box', {active: active || selected}]"
    :style="style"
    @click.stop="onActive"
    v-clickoutside="onDeActive"
  >
    <!-- 默认插槽 -->
    <slot />
    <!-- 移动 -->
    <div class="anchor-move" @mousedown.stop.prevent="stickDown('move', $event)">
      <!-- 左侧 -->
      <div
        class="anchor anchor-west"
        @mousedown.stop.prevent="stickDown('west', $event)"
        @mousestart.stop.prevent="stickDown('west', $event)"
      ></div>
      <div
        class="anchor anchor-nw"
        @mousedown.stop.prevent="stickDown('nw', $event)"
        @mousestart.stop.prevent="stickDown('nw', $event)"
      ></div>
      <div
        class="anchor anchor-sw"
        @mousedown.stop.prevent="stickDown('sw', $event)"
        @mousestart.stop.prevent="stickDown('sw', $event)"
      ></div>
      <!-- 右侧 -->
      <div
        class="anchor anchor-east"
        @mousedown.stop.prevent="stickDown('east', $event)"
        @mousestart.stop.prevent="stickDown('east', $event)"
      ></div>
      <div class="anchor anchor-ne"
        @mousedown.stop.prevent="stickDown('ne', $event)"
        @mousestart.stop.prevent="stickDown('ne', $event)"
      ></div>
      <div class="anchor anchor-se"
        @mousedown.stop.prevent="stickDown('se', $event)"
        @mousestart.stop.prevent="stickDown('se', $event)"
      ></div>
      <div
        class="anchor anchor-rotate"
        @mousedown.stop.prevent="stickDown('rotate', $event)"
        @mousestart.stop.prevent="stickDown('rotate', $event)"
      >
        <i class="iconfont icon-rotate"></i>
      </div>
    </div>
  </div>
</template>
<script>
import clickoutside from './../utils/clickoutside'
import { getAngle } from './../utils/rectHelper'
export default {
  name: 'drag-resize-rotate',
  directives: {
    clickoutside
  },
  props: {
    active: Boolean,
    selected: Boolean,
    left: Number,
    top: Number,
    width: Number,
    height: Number,
    rotateDeg: Number,
    zIndex: Number
  },
  computed: {
    style () {
      return {
        left: this.cx + 'px',
        top: this.cy + 'px',
        width: this.cw + 'px',
        height: this.ch + 'px',
        transform: 'rotateZ(' + this.cdeg + 'deg)',
        zIndex: this.zIndex
      }
    }
  },
  data () {
    return {
      cx: this.left,
      cy: this.top,
      cw: this.width,
      ch: this.height,
      cdeg: this.rotateDeg,
      // 是否重置左右大小
      resizeW: false,
      resizeE: false,
      resizeSW: false,
      resizeNW: false,
      resizeNE: false,
      resizeSE: false,
      // 旋转
      rotate: false,
      // 移动
      moving: false,
      // 开始点
      stickStartPos: {}
    }
  },
  watch: {
  },
  mounted() {
    document.documentElement.addEventListener('mousemove', this.move)
    document.documentElement.addEventListener('mouseup', this.up)
    document.documentElement.addEventListener('mouseleave', this.up)
    document.documentElement.addEventListener('click', this.onDeActive)
  },
  beforeDestroy() {
    document.documentElement.removeEventListener('mousemove', this.move)
    document.documentElement.removeEventListener('mouseup', this.up)
    document.documentElement.removeEventListener('mouseleave', this.up)
    document.documentElement.removeEventListener('click', this.onDeActive)
  },
  methods: {
    stickDown (stick, ev) {
      console.log({stick})
      this.resizeW = stick === 'west'
      this.resizeE = stick === 'east'
      this.moving = stick === 'move'
      this.resizeNW = stick === 'nw'
      this.resizeSW = stick === 'sw'
      this.resizeNE = stick === 'ne'
      this.resizeSE = stick === 'se'
      this.rotate = stick === 'rotate'
      if (this.selected) {
        this.$emit('updateSnapshot')
      }
      this.stickStartPos.mouseX = ev.pageX || ev.touches[0].pageX
      this.stickStartPos.mouseY = ev.pageY || ev.touches[0].pageY
      this.stickStartPos.cx = this.left
      this.stickStartPos.cy = this.top
      this.stickStartPos.width = this.width
      this.stickStartPos.height = this.height
    },
    move (ev) {
      if (!this.resizeW && !this.resizeE && !this.moving && !this.resizeNW && !this.resizeSW && !this.resizeNW && !this.resizeNE && !this.resizeSE && !this.rotate) { return }
      ev.stopPropagation()
      ev.preventDefault()
      const x = ev.pageX || (ev.touches && ev.touches[0].pageX)
      const y = ev.pageY || (ev.touches && ev.touches[0].pageY)
      if (typeof x !== 'number') { return }
      let { mouseX, mouseY, cx, cy, width, height } = this.stickStartPos
      const rx = x - mouseX
      const ry = y - mouseY
      // 右侧拖动
      if (this.resizeE && rx !== 0) {
        let widthf = this.cw = width + rx
        this.$emit('resize', { width: widthf })
      } else if (this.resizeW && rx !== 0) {
        // 左侧拖动
        let widthf = this.cw = width - rx
        let left = this.cx = cx + rx
        this.$emit('resize', { x: left, width: widthf })
      } else if (this.moving) {
        // 移动
        if (!this.selected) {
          const xf = this.cx = cx + rx
          const yf = this.cy = cy + ry
          this.$emit('drag', { x: xf, y: yf })
        } else {
          this.$emit('dragSelect', { rx, ry })
        }
      } else if (this.resizeNW) {
        const xf = this.cx = cx + rx
        const yf = this.cy = cy + ry
        const widthf = this.cw = width - rx
        const heightf = this.ch = height - ry
        this.$emit('resize', { x: xf, y: yf, width: widthf, height: heightf })
      } else if (this.resizeSW) {
        const xf = this.cx = cx + rx
        const widthf = this.cw = width - rx
        const heightf = this.ch = height + ry
        this.$emit('resize', { x: xf, width: widthf, height: heightf })
      } else if (this.resizeNE) {
        const yf = this.cy = cy + ry
        const heightf = this.ch = height - ry
        const widthf = this.cw = width + rx
        this.$emit('resize', { y: yf, height: heightf, width: widthf })
      } else if (this.resizeSE) {
        const widthf = this.cw = width + rx
        const heightf = this.ch = height + ry
        this.$emit('resize', { width: widthf, height: heightf })
      } else if (this.rotate) {
        const deg = this.cdeg = getAngle(cx, cy, x, y) - 90
        this.$emit('resize', { rotate: deg })
      }
    },
    up () {
      this.resizeW = false
      this.resizeE = false
      this.moving = false
      this.resizeNW = false
      this.resizeSW = false
      this.resizeNE = false
      this.resizeSE = false
      this.rotate = false
    },
    onDeActive () {
      this.active && this.$emit('deactive')
    },
    onActive () {
      !this.active && this.$emit('active')
    }
  },
}
</script>
<style lang="less" scoped>
  // 操作符左右边距
  @anleft: -5px;
  @anright: -5px;
  @antop: -4px;
  // 白框
  .anchorBox() {
    content: "";
    position: absolute;
    background: #fff;
    border: 1px solid #7d7d7d;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.16);
    height: 8px;
    width: 8px;
  }
  .drr-box {
    position: absolute;
    cursor: move;
    outline: none;
    min-width: 20px;
    font-size: 18px;
    color: rgb(103, 107, 111);
    stroke-width: 0px;
    border: 1px solid rgba(0, 0, 0, 0);
    box-sizing: border-box;
    &:hover {
      border: 1px solid rgb(107, 153, 224);
    }
    // 激活时显示重置大小
    &.active {
      border: 1px solid rgb(107, 153, 224);
      .anchor {
        display: block;
      }
    }
    // 移动
    .anchor-move {
      position: absolute;
      cursor: move;
      z-index: -1;
      top: 0px;
      left: 0;
      bottom: 0px;
      right: 0;
      width: 100%;
    }
    .anchor {
      display: none;
      box-sizing: content-box;
      position: absolute;
      width: 8px;
      height: 8px;
      z-index: 10000;
      &-west {
        left: @anleft;
        cursor: w-resize;
        top: 50%;
        transform: translateY(-50%);
        &:before {
          .anchorBox();
        }
      }
      &-east {
        right: @anright;
        cursor: e-resize;
        top: 50%;
        transform: translateY(-50%);
        &:before {
          .anchorBox()
        }
      }
      &-nw {
        left: @anleft;
        top: @antop;
        cursor: nwse-resize;
        &:before {
          .anchorBox();
        }
      }
      &-sw {
        bottom: @antop;
        left: @anleft;
        cursor: nesw-resize;
        &:before {
          .anchorBox();
        }
      }
      &-ne {
        top: @antop;
        right: @anright;
        cursor: nesw-resize;
        &:before {
          .anchorBox();
        }
      }
      &-se {
        bottom: @antop;
        right: @anright;
        cursor: nwse-resize;
        &:before {
          .anchorBox();
        }
      }
      &-rotate {
        right: -35px;
        top: -25px;
        font-size: 12px;
        width: 27px;
        height: 27px;
      }
    }
  }
</style>
