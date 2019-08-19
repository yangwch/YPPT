<template>
  <div
    :class="['p', {placeholder: showPlaceholder}]"
    :style="style"
  >
    <div v-html="currentValue" class="paragraph" contenteditable="true"></div>
    <!-- 操作区域 拖动 -->
    <div class="anchor-move"
      @mousedown.stop.prevent="stickDown('move', $event)"></div>
    <div class="anchor anchor-west"
      @mousedown.stop.prevent="stickDown('west', $event)"
      ></div>
    <div class="anchor anchor-east"
      @mousedown.stop.prevent="stickDown('east', $event)"
      @mousestart.stop.prevent="stickDown('east', $event)"
      ></div>
  </div>
</template>
<style lang="less">
  .p {
    position: absolute;
    cursor: move;
    outline: none;
    min-width: 20px;
    font-size: 18px;
    color: rgb(103, 107, 111);
    stroke-width: 0px;
    border: 1px solid rgb(107, 153, 224);
    box-sizing: border-box;
    &.placeholder:after {
      color: #ccc;
      content: "\8BF7\8F93\5165\5185\5BB9";
      position: absolute;
      left: 15px;
      top: 10px;
      width: 120px;
      z-index: -1;
    }
    div.paragraph {
      outline: none;
      min-width: 100px;
      cursor: text;
      margin: 10px 15px;
      position: relative;
      z-index: 2;
    }
    // 重置大小
    .anchor-move {
      position: absolute;
      cursor: move;
      z-index: 1;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
    .anchor {
      box-sizing: content-box;
      position: absolute;
      top: 50%;
      width: 6px;
      height: 6px;
      transform: translateY(-50%);
      background: #41464b;
      border: 2px solid #fff;
      border-radius: 10px;
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.25);
      &-west {
        left: -5px;
        cursor: w-resize;
      }
      &-east {
        right: -5px;
        cursor: e-resize;
      }
    }
  }
</style>

<script>
  export default {
    name: 'p-editor',
    components: {},
    props: {
      value: {
        type: String,
        default () {
          return ''
        }
      },
      x: [String, Number],
      y: [String, Number],
      w: [Number]
    },
    computed: {
      style() {
        return {
          left: typeof this.cx === 'string' ? this.cx : this.cx + 'px',
          top: typeof this.cy === 'string' ? this.cy : this.cy + 'px',
          width: typeof this.cw === 'string' ? this.cw : this.cw + 'px'
        }
      }
    },
    data () {
      return {
        showPlaceholder: !this.value,
        currentValue: this.value || '',
        cx: this.x,
        cy: this.y,
        cw: this.w,
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
      this.$el.oninput = () => {
        let html = this.$el.innerHTML
        this.showPlaceholder = !html.trim()
        this.$emit('input', html)
      }

      document.documentElement.addEventListener('mousemove', this.move);
      document.documentElement.addEventListener('mouseup', this.up);
      document.documentElement.addEventListener('mouseleave', this.up);
    },
    beforeDestroy () {
      document.documentElement.removeEventListener('mousemove', this.move);
      document.documentElement.removeEventListener('mouseup', this.up);
      document.documentElement.removeEventListener('mouseleave', this.up);
    },
    methods: {
      onResize () {
        // console.log(e)
      },
      stickDown (stick, ev) {
        this.resizeW = stick === 'west'
        this.resizeE = stick === 'east'
        this.moving = stick === 'move'
        this.stickStartPos.mouseX = ev.pageX || ev.touches[0].pageX
        this.stickStartPos.mouseY = ev.pageY || ev.touches[0].pageY
        this.stickStartPos.cx = this.cx
        this.stickStartPos.cy = this.cy
        this.stickStartPos.width = this.cw
      },
      move (ev) {
        ev.stopPropagation()
        if (!this.resizeW && !this.resizeE && !this.moving) {
          return
        }
        const x = ev.pageX || (ev.touches && ev.touches[0].pageX)
        const y = ev.pageY || (ev.touches && ev.touches[0].pageY)
        if (typeof x !== 'number') {
          return
        }
        let { mouseX, mouseY, cx, cy, width } = this.stickStartPos
        let rx = x - mouseX
        // console.log('move', [x, y, rx])
        if (this.resizeE && rx !== 0) {
          let widthf = this.cw = width + rx
          this.$emit('resize', {
            width: widthf
          })
        } else if (this.resizeW && rx !== 0) {
          let widthf = this.cw = width - rx
          let left = this.cx = cx + rx
          this.$emit('resize', {
            x: left,
            width: widthf
          })
        } else if (this.moving) {
          let ry = y - mouseY
          // console.log('moving', { x, y, rx, ry })
          const xf = this.cx = cx + rx
          const yf = this.cy = cy + ry
          this.$emit('drag', {
            x: xf,
            y: yf
          })
        }
      },
      up () {
        this.resizeW = false
        this.resizeE = false
        this.moving = false
      }
    }
  }
</script>
