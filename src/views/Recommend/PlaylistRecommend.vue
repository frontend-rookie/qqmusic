<template>
  <div class="recommend-playlist-container">
    <div class="title">你的歌单补给站</div>
    <ul class="playlist_wrapper">
      <li class="playlist_item" v-for="(item, index) in playlistArray" :key="item.content_id">
        <div class="playlist_top_wrapper">
          <!--        鼠标悬停遮罩层-->
          <div class="play_mask">
            <div class="play_button">
              <img src="../../assets/Recommend/play.png" alt="" class="play_button" draggable="false">
            </div>
          </div>
          <img class="daily" :src="item.cover" alt="" onerror="this.src= 'https://y.qq.com/mediastyle/global/img/playlist_300.png?max_age=2592000' "/>
          <div class="play_count">
            {{formatPlayCount(item.listen_num)}}
          </div>
        </div>
        <div class="playlist_title">
          {{item.title}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, toRefs} from "vue";
import axios from "axios";

export default defineComponent<any>({
  name: "PlaylistRecommend",
  setup() {
    /**
     * @date 2022.05.13
     * @brief 推荐歌单功能
     * @author redLeaf
     * */
    const recommendPlaylist = reactive({
      playlistArray: [],
      async getRecommendPlaylist() {
        let res = await axios({
          url: `/api/recommend/playlist/u`,
          method: "get",
        })
        this.playlistArray = res.data.data.list;
        console.log(`推荐歌单`, res.data.data.list);
      },
      /**
       * 处理播放量数据
       * */
      formatPlayCount(count: number) {
        if (count < 10000) {
          return count;
        } else if (count < 100000000) {
          return (count / 10000).toFixed(1) + "万";
        } else {
          return (count / 100000000).toFixed(1) + "亿";
        }
      }
    })

    onBeforeMount(async () => {
      await recommendPlaylist.getRecommendPlaylist();
    })
    return {
      ...toRefs(recommendPlaylist),
    };
  }
})
</script>

<style lang="less" scoped>
  .recommend-playlist-container {
    padding: 25px;

    .title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .playlist_wrapper{
      display: flex;
      flex-wrap: wrap;
      //justify-content: space-between;
      margin-bottom: 20px;
      list-style: none;
      min-width: 800px;
      padding-left: 20px;

      .playlist_item {
        width: 250px;
        height: 270px;
        margin: 5px 5px 20px;

        .playlist_top_wrapper {
          width: 250px;
          height: 250px;
          position: relative;
          top: 0;
          transition: .5s;
          transition-property: top;
          border-radius: 25px;
          overflow: hidden;

          img.daily {
            width: 250px;
            height: 250px;

          }

          .play_count {
            //width: 50px;
            height:20px;
            font-size: 14px;
            color: #fff;
            position: absolute;
            right: 10px;
            bottom: 10px;
            border-radius: 30px;
            padding: 5px 5px 5px 30px;
            background: #000 url("../../assets/Recommend/earPhone.png") no-repeat 5px center;
            background-size: 20px 20px;
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
        .playlist_title {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 14px;
        }
      }
    }
  }
</style>
