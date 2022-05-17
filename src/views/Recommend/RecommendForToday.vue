<template>
  <div class="recommend_for_today">
<!--    今日推荐组件-->
    <div class="title">推荐</div>
    <div class="recommend_for_today_content_wrapper">
<!--      每日30首-->
      <div class="recommend_30_days_wrapper">
        <div class="recommend_30_days_content">
          <!--        鼠标悬停遮罩层-->
          <div class="play_mask">
            <div class="play_button">
              <img src="../../assets/Recommend/play.png" alt="" class="play_button" draggable="false">
            </div>
          </div>
          <img class="daily" :src="daily30Data.dir_pic_url2" alt="" onerror="this.src= 'https://y.qq.com/mediastyle/global/img/playlist_300.png?max_age=2592000' " />
        </div>
        <div class="recommend_30_days_title">每日30首</div>
      </div>
    </div>
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
        // console.log(res.data);
        this.daily30Data = res.data.data;
      },


    })
    onBeforeMount(async () => {
      await dailyRecommend.getDaily30();
    })

    return {
      ...toRefs(dailyRecommend)
    }
  }
})
</script>

<style scoped lang="less">
  .recommend_for_today {
    padding: 25px;

    .title {
      font-size: 30px;
      font-weight: bolder;
      color: #000;
    }

    .recommend_for_today_content_wrapper {
      //display: flex;
      margin-top: 15px;
      .recommend_30_days_wrapper {
        width: 250px;
        height: 270px;

        .recommend_30_days_content {
          width: 250px;
          height: 250px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          transition: .5s;
          top: 0;

          img.daily {
            width: 250px;
            height: 250px;
          }

          .play_mask {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.5);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: .5s;
            cursor: pointer;
            user-select: none;

            .play_button {
              width: 50px;
              height: 50px;
            }
          }

          &:hover {
            transition-property: top;
            top: -10px;

            .play_mask {
              opacity: 1;
            }
          }

          }


        .recommend_30_days_title {
          margin-top: 6px;
          font-size: 14px;
          text-align: center;
        }
      }
    }

  }
</style>
