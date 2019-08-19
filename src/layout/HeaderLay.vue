<template>
  <a-layout class="tools">
    <!-- <a-layout-sider class="sider">
      <slot name="left" />
    </a-layout-sider> -->
    <a-layout-content class="tools-content">
      <slot name="content" />
    </a-layout-content>
    <a-layout-sider class="sider">
      <slot name="right" />
    </a-layout-sider>
  </a-layout>
</template>
<style lang="less">
  .tools {
    height: 50px;
    flex-grow: 0;
    background-color: #f7f7f7;
    text-align: center;
    display: flex;
    align-items: center;
    justify-items: center;
    border-bottom: 1px solid #ddd;
    &-content {
      // height: 100%;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      border-top: 0;
      background-color: #f7f7f7;
    }

    .sider {
      border-top: 0;
      background-color: #f7f7f7;
    }
  }
</style>
