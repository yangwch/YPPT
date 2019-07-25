<template>
  <div class="p" contenteditable="true" placeholder="请输入内容" :style="style" v-html="currentValue"></div>
</template>
<style type="text/css">
  .p {
    position: absolute;
    outline: none;
    min-width: 20px;
    font-size: 18px;
    color: rgb(103, 107, 111);
    stroke-width: 0px;
    border: 1px solid #ccc;
    .placeholder {
      color: #ccc;
    }
  }
</style>

<script>
  export default {
    name: 'p-editor',
    props: {
      value: {
        type: String,
        default () {
          return ''
        }
      },
      left: [String, Number],
      top: [String, Number]
    },
    computed: {
      style() {
        return {
          left: this.left,
          top: this.top
        }
      }
    },
    data () {
      return {
        currentValue: this.value || ''
      }
    },
    watch: {
      currentValue () {
        this.$emit('input', this.currentValue)
      }
    },
    mounted () {
      this.$el.oninput = () => this.currentValue = this.$el.innerHTML
    }
  }
</script>
