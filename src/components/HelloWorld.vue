<template>
  <div class="hello">
    <!-- <ppt-editor :width="833" :height="500"></ppt-editor> -->
    <div style="width: 100px;height: 100px; border: 1px solid red"><resize-observer @notify="handleResize" />
    </div>
    
  </div>
</template>
<style type="text/css">
  .resizable {
    overflow: hidden;
    background: green;
    height: 200px;
    width: 200px;
    vertical-align: middle;
    display: table-cell;
  }
</style>
<script>
// import {pptEditor} from 'ppteditor-vue'
import Vue from 'vue'
import { ResizeObserver } from 'vue-resize'

Vue.component('resize-observer', ResizeObserver)
export default {
  name: 'HelloWorld',
  components: {
    // pptEditor
  },
  directives: {
    // resize
  },
  props: {
    msg: String
  },
  methods: {
    handleResize () {
      // console.log('resized', e)
    }
  }
}
</script>
