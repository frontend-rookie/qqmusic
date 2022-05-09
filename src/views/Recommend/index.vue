<template>
  <div class="recommend">
    <RecommendForToday/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import RecommendForToday from "@/views/Recommend/RecommendForToday.vue";

export default defineComponent( {
  name: "index",
  components: {
    RecommendForToday
  }
})
</script>

<style scoped lang="less">
  .recommend {
    position: absolute;
    left: 200px;
    top: 50px;
    bottom: 0;
    right: 0;
}
</style>
