<template>
  <div :class="['p-btn', {'no-border': noBorder}]" @mousedown="onMouseDown($event)" @click.stop.prevent="$emit('click', $event)">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
  .p-btn {
    line-height: 100%;
    display: inline-block;
    margin-left: 10px;
    font-size: 18px;
    text-align: center;
    min-width: 40px;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 2px;
    &:hover {
      border: 1px solid #ccc;
    }
    &.no-border:hover {
      border: 1px solid rgba(0, 0, 0, 0);
    }
  }
</style>
<script>
export default {
  props: {
    noBorder: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {
    onMouseDown (ev) {
      ev && ev.preventDefault && ev.preventDefault()
    }
  }
}
</script>
