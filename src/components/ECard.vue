<template>
  <div :class="['card-box', {picking: pickingPoint}]">
    <div class="card">
      <slot></slot>
    </div>
  </div>
  
</template>
<script type="text/javascript">
  export default {
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
