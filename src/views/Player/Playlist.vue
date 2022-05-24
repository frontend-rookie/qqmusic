<template>
  <teleport to="body">
    <div class="playlist">
      <!--    用于右侧展开的歌单-->
      <!--    Control组件的子组件-->
<!--      右侧播放队列 , 左侧为透明遮罩层-->
      <ul class="right_inner_wrapper">

      </ul>
    </div>
  </teleport>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from "vue";
export default defineComponent({
  name: "Playlist",
  setup() {

  }
})
</script>

<style scoped lang="less">

</style>
