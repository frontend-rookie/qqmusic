<template>
  <div class="recommend_for_today">
<!--    今日推荐组件-->

  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, toRefs} from "vue";
import axios from "axios";
import store from "@/store";

export default defineComponent({
  name: "RecommendForToday",
  setup() {
    /**
     * @brief 今日推荐
     * @date 2022.05.09
     * @author redLeaf
     * */

    let dailyRecommend = reactive({
      // 每日30首的数据
      daily30Data: reactive({daily30Data: {}}),

      /**
       * 获取每日30首歌单的数据
       * */
      async getDaily30() {
        let res = await axios({
          url: `/api//recommend/daily`,
          method: `get`
        })
        console.log(res.data);
        this.daily30Data = res.data.data;
      },

      /**
       * 获取新歌推荐
       *  TODO： 不知道调用那个接口，这里接口调用是错误的
       * */
      async getNewSongsRecommend() {
        let res = await axios({
          url: `/api/new/songs`,
          method: `get`
        })
        console.log(`新歌推荐`, res.data);
      }
    })
    onBeforeMount(async () => {
      await dailyRecommend.getDaily30();
      await dailyRecommend.getNewSongsRecommend();
    })

    return {
      ...toRefs(dailyRecommend)
    }
  }
})
</script>

<style scoped lang="less">

</style>
