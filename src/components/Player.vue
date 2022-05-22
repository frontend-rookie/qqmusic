<template>
  <div class="player">
    <audio :src="songUrl"
           ref="audio"
           @timeupdate="handleTimeUpdate"></audio>
    <!--      顶部显示播放进度的播放条-->
    <div class="top_player_bar" ref="outerBar">
      <div class="inner_player_bar" ref="innerBar"></div>
<!--      随进度条移动的球球-->
      <div class="play_ball"
           ref="ball" @mousedown="" @mousemove="" @mouseup=""></div>
    </div>
    <div class="player_main">
<!--    播放条左侧图片和歌曲信息-->
      <div class="left_img">
        <div class="img_wrapper">
          <img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${songInfo.album?.mid}.jpg`" alt="" draggable="false">
          <div class="img_mask"></div>
        </div>
        <div class="song_info">
          <div class="song_inner_info" ref="songOuterContainer">
            <div class="name" ref="songInnerContainer">
              <span class="song_name">{{songInfo.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span class="singer" v-for="item in songInfo.singer">{{item.name}}&nbsp;&nbsp;</span>
            </div>
          </div>
          <div class="buttons">
            <div class="like_button" title="喜欢"></div>
            <div class="download_button" title="下载"></div>
            <div class="add_button" title="添加到"></div>
            <div class="comment_button" title="评论"></div>
            <div class="mv_button" title="mv" v-if="songInfo.mv?.vid"></div>
          </div>
        </div>
      </div>
      <div class="control"><Control :songInfo="songInfo"/></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, toRefs, watch, ref, computed, onMounted} from "vue";
import axios from "axios";
import store from "@/store";
// import playlist from "@/views/SearchDetail/Playlist.vue";
import Control from "@/views/Player/Control.vue";
export default defineComponent({
  name: "Player",
  components: {
    Control
  },
  setup() {
    // 当前播放的歌曲的mid
    let songMid = computed(() => store.state.player.songMid)
    // audio Dom元素
    let audio = ref()
    // 歌名外部容器
    let songOuterContainer = ref()
    // 歌名内部容器
    let songInnerContainer = ref()
    // 歌名滚动的定时器
    let songNameScrollTimer:ReturnType<typeof setTimeout>;
    const player = reactive({
      // 单前的songmid
      // songMid: store.state.player.songMid,
      // 获取的音乐播放链接
      songUrl: ``,
      /**
       * 获取音乐的播放链接
       * */
      async getMusicUrl() {
        const {data} = await axios({
          // url: `/api/song/urls`,
          url: `/api/song/urls`,
          method: `get`,
          params: {
            id: songMid.value,
            // cookie: store.state.userInfo.cookie
          }
        })
        console.log(data);
        this.songUrl = data.data[songMid.value]
      },

      // 歌曲的信息
      songInfo: {},

      /**
       * 获取歌曲的详细信息
       * */
      async getSongInfo(){
        const {data} = await axios({
          url: `/api/song`,
          method: `get`,
          params: {
            songmid: songMid.value
          }
        })
        console.log(data);
        this.songInfo = data.data.track_info
      },


      /**
       * 歌名过长进行左右滚动
       * */
      songNameScroll() {
        clearInterval(songNameScrollTimer)
        // Todo: 记得把这里的注释打开
        // songOuterContainer.value.scrollLeft = 0
        // // console.log(`歌名滚动`)
        // // console.log(`外部容器`,songOuterContainer.value.clientWidth)
        // // console.log(`内部容器`,songInnerContainer.value.clientWidth);
        // // 0: 表示向后滚动 1: 表示向前滚动
        // let scrollDirection = 0;
        // songNameScrollTimer = setInterval(() => {
        //   // 容器的宽度之差
        //   let subtract = songInnerContainer.value.clientWidth - songOuterContainer.value.clientWidth
        //   // console.log(`已进入定时器`);
        //   // console.log(subtract);
        //   if(subtract !== 0) {
        //     // console.log(`subtract !== 0`);
        //     if(!scrollDirection) {
        //       // 向后滚动
        //       songOuterContainer.value.scrollLeft += 1
        //       if(songOuterContainer.value.scrollLeft >= subtract) scrollDirection = 1
        //     } else {
        //       // 向前滚动
        //       songOuterContainer.value.scrollLeft -= 1
        //       if(songOuterContainer.value.scrollLeft <= 0) scrollDirection = 0
        //     }
        //   }
        // },200)
      }

    })

    /**
     * 当songmid改变时，即切歌时，改变播放音乐的url，换歌
     * */
    watch(songMid,async (newValue) => {
      // console.log(111)
      audio.value.pause()
      await player.getMusicUrl()
      await player.getSongInfo()
      audio.value.play()

      player.songNameScroll()
    })

    /**
     * @brief 播放进度条功能
     * @date 2022..05.21
     * @author redLeaf
     * */
    // 内部进度条
    let innerBar = ref()
    // 外部进度条
    let outerBar = ref()
    // 进度小球
    let ball = ref()
    const playBar = reactive({

      /**
       * 随着播放更新进度条
       * */
      updateBar() {
        // console.log(audio.value.currentTime);
        // 更新进度条的宽度
        innerBar.value.style.width = `${audio.value.currentTime / audio.value.duration * outerBar.value.clientWidth}px`
        // 更新进度小球的位置
        ball.value.style.left = `${audio.value.currentTime / audio.value.duration * outerBar.value.clientWidth - 5}px`
      },

      /**
       * @brief 拖拽进度小球来改变进度
       * @date 2022.05.22
       * @author redLeaf
       * */
      // 鼠标是否按下小球
      isBallMouseDown: false,
      /**
       * 处理鼠标按下小球的事件
       * */
      handleBallMouseDown(event:any):void {
        this.isBallMouseDown = true


      },

      /**
       * 处理时间更新事件
       * */
      handleTimeUpdate():void {
        this.updateBar()
      }
    })

    onBeforeMount(async () => {
      // await player.setCoolie()
      await player.getMusicUrl()
      await player.getSongInfo()

      player.songNameScroll();
    })

    return {
      ...toRefs(player),
      audio,
      songMid,
      songOuterContainer,
      songInnerContainer,
      innerBar,
      outerBar,
      ball,
      ...toRefs(playBar)
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

.player {
  position: absolute;
  left: 200px;
  bottom: 0;
  right: 0;
  height: 70px;
  //overflow: hidden;
  user-select: none;

  .top_player_bar {
    position: absolute;
    //display: flex;
    //flex-direction: row;
    //flex-wrap: nowrap;
    left: 0;
    top: 0;
    width: 100%;
    height: 3px;
    background: #eee;
    //color: #31c27c;
    border-radius: 3px;
    z-index: 1;
    &:hover {
      .play_ball {
        opacity: 1;
        cursor: pointer;
      }
    }
    .inner_player_bar {
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background: #00bcd4;
      border-radius: 5px;
    }

    .play_ball {
      opacity: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      position: relative;
      top: -3px;
      left: -5px;
      background: #31c27c;
    }
  }

  .player_main {
    position: absolute;
    left: 0;
    top: 3px;
    right: 0;
    bottom: 0;
    min-width: 800px;
    display: flex;

    .left_img {
      width: 25%;
      height: 100%;
      padding-left: 20px;
      display: flex;
      align-items: center;
      //justify-content: center;
      flex-direction: row;

      .img_wrapper {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        position: relative;

        .img_mask {
          opacity: 0;
          position: absolute;
          left: 0;
          bottom: 0;
          top: 0;
          right: 0;
          background: rgba(0,0,0,0.5) url("../assets/Player/up_white.png") no-repeat center center;
          background-size: 30px 30px;
          cursor: pointer;
          border-radius: 10px;
          &:hover{
            opacity: 1;
          }
        }
      }

      img {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        display: block;
      }

      .song_info {
        padding-left: 10px;
        flex-direction: column;
        //align-items: center;
        overflow: hidden;
        width: 80%;

        .song_inner_info{
          width: auto;
          display: flex;
          overflow-x: scroll;
          overflow-y: hidden;
          &::-webkit-scrollbar {
            display: none; /* Chrome Safari */
          }
          .name {
            white-space: nowrap;
            text-align: left;
            //position: relative;

            .song_name {
              width: 14px;
            }

            .singer {
              width: 13px;
              color: #aaa;
            }
          }
        }

        .buttons {
          display: flex;

          div {
            widtH: 16px;
            height: 16px;
            margin: 5px;
            cursor: pointer;

            &.like_button {
              background-image: url("../assets/Player/like_gray.png");
              background-size: 16px 16px;

              &:hover {
                background-image: url("../assets/Player/like_red.png");
              }
            }

            &.download_button {
              background-image: url("../assets/Player/download_gray.png");
              background-size: 16px 16px;

              &:hover {
                background-image: url("../assets/Player/download_green.png");
              }
            }

            &.add_button {
              background-image: url("../assets/Player/add_gray.png");
              background-size: 16px 16px;

              &:hover {
                background-image: url("../assets/Player/add_green.png");
              }
            }

            &.comment_button {
              background-image: url("../assets/Player/comment_gray.png");
              background-size: 16px 16px;

              &:hover {
                background-image: url("../assets/Player/comment_green.png");
              }
            }

            &.mv_button {
              background-image: url("../assets/Player/video.png");
              background-size: 16px 16px;

              &:hover {
                background-image: url("../assets/Player/video_green.png");
              }
            }

          }
        }
      }
    }

    .control {
      width: 100%;
    }
  }
}
</style>
