<template>
  <div :class="['p-btn', {'no-border': noBorder}]">
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
    min-width: 50px;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0);
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
  }
}
</script>
