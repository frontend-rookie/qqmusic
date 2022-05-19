<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Content"
})
</script>

<style scoped lang="less">
  .content {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 70px;
    right: 0;
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 5px;
    }
    /* 滚动槽 */
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
      border-radius: 10px;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.1);
      -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
    }
    &::-webkit-scrollbar-thumb:window-inactive {
      background: rgba(255, 0, 0, 0.4);
    }

  }
</style>
