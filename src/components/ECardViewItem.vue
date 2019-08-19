<template>
  <div :class="['view-item', {active: active}]">
    <div class="view-item-index" v-text="index">
    </div>
    <div class="view-item-box">
      <div class="">

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ECardViewItem',
  props: {
    active: Boolean,
    index: [Number, String]
  }
}
</script>
<style lang="less" scoped>
  .view-item {
    display: flex;
    padding: 5px 20px 5px 0;
    box-sizing: border-box;
    flex: 1 0 auto;
    cursor: pointer;
    background-color: transparent;
    margin-top: 5px;
    &.active {
    background-color: rgba(65, 70, 75, 0.05);
    }
    &-index {
      flex: none;
      width: 20px;
      text-align: center;
      align-self: center;
      font-size: 10px;
      color: #333;
      opacity: 0.4;
    }
    &-box {
      flex: 1;
      height: 72px;
      overflow: hidden;
      outline: 1px solid #A0A2A5;
      user-select: none;
      background: #fff;
      &.active {
        outline: 1px solid transparent;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
</style>