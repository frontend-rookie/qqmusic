<template>
  <div class="video">
     视频暂时缺少接口
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, onBeforeMount} from "vue";
import axios from "axios";
import router from "@/router";

export default defineComponent({
  name: "Video",
  setup() {
    /**
     * @brief 搜索的视频功能
     * @date 2022.05.18
     * @author redLeaf
     *
     * Todo ： 缺少接口， 或者我不知道要用什么接口， 得不到视频数据
     *
     * */
    const video = reactive({
      // 专辑数据
      albumArr: [],
      /**
       * 获取搜索的视频信息
       * */
      async getVideoInfo() {
        let res = await axios({
          url: "/api/search",
          method: "get",
          params: {
            key: router.currentRoute.value.query.keyword,
            pageNo: 1,
            t: 12
          }
        })
        // console.log(res.data);
      }
    })

    onBeforeMount(async () => {
      // await video.getVideoInfo();
    })

    return {
      ...toRefs(video)
    }
  }
})
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.video {
  padding-top: 30px;
  font-size: 30px;
}
</style>
