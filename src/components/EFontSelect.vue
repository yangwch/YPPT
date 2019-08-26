<template>
  <a-dropdown :trigger="['click']">
    <a class="ant-dropdown-link current-value" href="javascript:;">
      <span v-text="currentValue"></span> <a-icon type="caret-down" />
    </a>
    <a-menu slot="overlay">
      <a-menu-item v-for="(item, i) in FONTS" :key="i" @mousedown.prevent @click="onSelectItem(item)">
        {{item}}
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>
<script>
import { FONTS } from './../config/index'
export default {
  props: {
    value: [String]
  },
  data () {
    return {
      currentValue: this.value || '默认字体',
      FONTS
    }
  },
  methods: {
    onSelectItem (val) {
      this.currentValue = val
      this.$emit('input', 'fontName', val)
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