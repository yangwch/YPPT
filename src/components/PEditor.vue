<template>
  <div
    :class="['p', {placeholder: showPlaceholder}]"
    :style="style"
  >
    <div v-html="currentValue" contenteditable="true"></div>
  </div>
</template>
<style lang="less">
  .p {
    position: absolute;
    outline: none;
    min-width: 20px;
    font-size: 18px;
    color: rgb(103, 107, 111);
    stroke-width: 0px;
    border: 1px solid #ccc;
    padding: 10px 15px;
    &.placeholder:after {
      color: #ccc;
      content: "\8BF7\8F93\5165\5185\5BB9";
      position: absolute;
      left: 15px;
      top: 10px;
      width: 120px;
      z-index: -1;
    }
    div {
      outline: none;
      min-width: 100px;
    }
  }
</style>

<script>
  export default {
    name: 'p-editor',
    directives: {
    },
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
          left: typeof this.x === 'string' ? this.x : this.x + 'px',
          top: typeof this.y === 'string' ? this.y : this.y + 'px'
        }
      }
    },
    data () {
      return {
        showPlaceholder: !this.value,
        currentValue: this.value || ''
      }
    },
    mounted () {
      this.$el.oninput = () => {
        let html = this.$el.innerHTML
        this.showPlaceholder = !html.trim()
        this.$emit('input', html)
      }
    },
    methods: {
      onResize () {
        // console.log(e)
      }
    }
  }
</script>
