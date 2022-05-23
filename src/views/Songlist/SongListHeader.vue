<template>
  <div class="song_list_header">
    <div class="left_img">
      <img :src="playlistDetail.logo" alt="" draggable="false">
    </div>
    <div class="right_info">
      <div class="playlist_name">{{playlistDetail?.dissname}}</div>
      <div class="author_info">
        <div class="author_head"><img :src="playlistDetail?.headurl" alt="" draggable="false"></div>
        <div class="author_name">{{playlistDetail?.nick}}</div>
      </div>
      <div class="author_white">{{playlistDetail.desc ? playlistDetail.desc : '作者没有写任何东西'}}</div>
      <div class="control_buttons_wrapper">
        <div class="play_all_button">播放全部</div>
        <div class="download_button">下载</div>
        <div class="share_button">分享</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, toRefs} from "vue";
import Player from "@/components/Player.vue";

export default defineComponent({
  name: `SongListHeader`,
  components: {Player},
  props: {
    // 歌单详情
    playlistDetail: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, content) {
    const {playlistDetail} = toRefs(props)
    return {

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

.song_list_header {
  width: 100%;
  min-width: 800px;
  height: 200px;
  padding-left: 30px;
  display: flex;
  align-items: center;
   .left_img {
     width: 160px;
     height: 160px;
     border-radius: 10px;
     overflow: hidden;

     img {
       width: 100%;
       height: 100%;
     }
   }

   .right_info {
     height: 160px;
     margin-left: 20px;
     display: flex;
     flex-direction: column;

     .playlist_name {
       font-size: 35px;
       font-weight: bold;
       font-family: "楷体", serif;
     }

     .author_info {
       display: flex;
       align-items: center;
       height: 30px;
       margin-top: 5px;
       margin-bottom: 5px;

       .author_head {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
         margin-right: 10px;

          img {
            width: 30px;
            height: 30px;
            cursor: pointer;
          }
        }

       .author_name {
         color: #aaa;
         cursor: pointer;
         &:hover {
           color: #31c27c;
         }
       }

     }

     .author_white {
       color: #aaa;
       font-size: 14px;
     }

     .control_buttons_wrapper {
       margin-top: 15px;
       height: 40px;
       user-select: none;
       display: flex;
       flex-direction: row;
       div.play_all_button, .download_button, .share_button {
         cursor: pointer;
         display: flex;
         align-items: center;
         width: 120px;
         height: 30px;
         line-height: 30px;
         padding-left: 37px;
         border-radius: 15px;
         font-size: 16px;
         //font-weight: bolder;
         color: #fff;
         background: #31c27c url("../../assets/Playlist/play_white.png") no-repeat 15px center;
         background-size: 20px 20px;
         margin: 10px;
       }

       .download_button, .share_button {
         color: #212121;
         background: #ddd url("../../assets/Playlist/download.png") no-repeat 15px center;
         background-size: 20px 20px;

         &:hover {
           background-color: #bbb;
         }
       }

       .share_button {
          background: #ddd url("../../assets/Playlist/share.png") no-repeat 15px center;
          background-size: 20px 20px;
       }
     }
   }
 }
</style>
