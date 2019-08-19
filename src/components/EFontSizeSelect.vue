<template>
  <a-dropdown :trigger="['click']">
    <a class="ant-dropdown-link current-value" href="javascript:;">
      <span v-text="currentValue"></span> <a-icon type="caret-down" />
    </a>
    <a-menu slot="overlay">
      <a-menu-item v-for="(item, i) in FONT_SIZES" :key="i" @click="onSelectItem(item)">
        {{item + 'px'}}
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>
<script>
import { FONT_SIZES } from './../config/index'
export default {
  props: {
    value: [String, Number]
  },
  data () {
    return {
      currentValue: this.value || '12',
      FONT_SIZES
    }
  },
  methods: {
    onSelectItem (item) {
      this.currentValue = item
      this.$emit('input', item)
    }
  }
}
</script>
<style lang="less" scoped>
  .current-value {
    font-size: 16px;
    color: #2c3e50;
    span {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
</style>