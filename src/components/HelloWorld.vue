<template>
  <div class="hello">
    <ppt-editor :width="833" :height="500"></ppt-editor>
  </div>
</template>

<script>
import {pptEditor} from 'ppteditor-vue'
export default {
  name: 'HelloWorld',
  components: {
    pptEditor
  },
  props: {
    msg: String
  }
}
</script>
