<template>
  <drr
    :x="x"
    :y="y"
    :w="w"
    :h="h"
    :angle="angle || 0"
    :aspectRatio="true"
    @change="itemChange"
>
    <img :src="src" style="width: 100%; height: 100%" />
</drr>
</template>
<script>
import drr from '@minogin/vue-drag-resize-rotate'
export default {
  props: {
    x: Number,
    y: Number,
    w: Number,
    h: Number,
    angle: Number,
    src: String
  },
  components: {
    drr
  },
  methods: {
    itemChange () {

    }
  }
}
</script>