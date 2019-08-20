<template>
  <div class="drawing-rect" :style="rectStyle">

  </div>
</template>
<script>
export default {
  name: 'RectRange',
  props: {
    x: Number,
    y: Number,
    w: Number,
    h: Number
  },
  computed: {
    rectStyle () {
      return {
        left: this.x + 'px',
        top: this.y + 'px',
        width: this.w + 'px',
        height: this.h + 'px'
      }
    }
  }
}
</script>
<style scoped>
  .drawing-rect {
    position: absolute;
    display: block;
    background-color: #aeadad3a;
  }
</style>
