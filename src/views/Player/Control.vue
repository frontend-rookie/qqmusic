<template>
  <div class="control">
<!--    播放条中心控制按钮-->
    <div class="center_control_buttons">
      <div class="play_way circle" v-if="playMode === 0" @click="changePlayMode"></div>
      <div class="play_way random" v-if="playMode === 1" @click="changePlayMode"></div>
      <div class="play_way only" v-if="playMode === 2" @click="changePlayMode"></div>
      <div class="last_song"></div>
      <div class="play_pause_button" v-if="!isSongPlaying" @click="handlePlayPauseButtonClick"></div>
      <div class="play_button" v-if="isSongPlaying" @click="handlePlayPauseButtonClick"></div>
      <div class="next_song"></div>
      <div class="volume"></div>
    </div>
    <div class="right_song_info">
      <span class="time_info">{{handleTime(songHavePlayedTime)}} / {{handleTime(songInfo?.interval)}}</span>
      <div class="playlist_icon"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from "vue";


export default defineComponent({
  name: "Control",
  // ts-ignore
  props: {
    // 播放歌曲的信息
    songInfo: {
      type: Object,
      default: []
    },
    songHavePlayedTime: {
      type: Number,
      default: 0
    },
    isSongPlaying: {
      type: Boolean,
      default: false
    },
    playMode: {
      type: Number,
      default: 0
    }
  },
  setup(props, content) {
    const {songInfo, songHavePlayedTime, isSongPlaying, playMode} = toRefs(props)

    const control = reactive({
      /**
       * 处理播放时间
       * */
      handleTime(time:string | number):string {
        time = Number(time)
        const min = Math.floor(time / 60)
        const sec = Math.floor(time % 60)
        return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
      },
      /**
       * 处理播放暂停按钮的点击事件
       * */
      handlePlayPauseButtonClick() {
        content.emit('handlePlayPauseClick')
      },

      /*
      * 改变播放方式
      * */
      changePlayMode() {
        content.emit('changePlayMode')
      }

    })
    return {
      ...toRefs(control),
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

.control {
  width: 100%;
  height: 100%;
  display: flex;

  .center_control_buttons {
    width: 66.6%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .play_way {
      width: 20px;
      height: 20px;
      background: url("../../assets/Player/Control/circle_gray.png") no-repeat;
      background-size: 20px 20px;
      cursor: pointer;
      margin: 5px;
      &:hover {
        background: url("../../assets/Player/Control/circle_green.png") no-repeat;
        background-size: 20px 20px;
      }
    }

    .random {
      background: url("../../assets/Player/Control/random_gray.png") no-repeat;
      background-size: 20px 20px;
      &:hover {
        background: url("../../assets/Player/Control/random_green.png") no-repeat;
        background-size: 20px 20px;
      }
    }

    .only {
      background: url("../../assets/Player/Control/only_gray.png") no-repeat;
      background-size: 20px 20px;
      &:hover {
        background: url("../../assets/Player/Control/only_green.png") no-repeat;
        background-size: 20px 20px;
      }
    }

    .last_song {
      width: 30px;
      height: 30px;
      background: url("../../assets/Player/Control/last_gray.png") no-repeat;
      background-size: 30px 30px;
      cursor: pointer;
      margin: 5px;
      &:hover {
        background: url("../../assets/Player/Control/last_green.png") no-repeat;
        background-size: 30px 30px;
      }
    }

    .play_pause_button, .play_button {
      width: 35px;
      height: 35px;
      background: #31c27c url("../../assets/Player/Control/play_white.png") no-repeat center center;
      background-size: 15px 15px;
      border-radius: 50%;
      cursor: pointer;
      margin: 5px;
    }

    .play_button {
      background: #31c27c url("../../assets/Player/Control/pause_white.png") no-repeat center center;
      background-size: 15px 15px;
    }

    .next_song {
      width: 30px;
      height: 30px;
      background: url("../../assets/Player/Control/next_gray.png") no-repeat;
      background-size: 30px 30px;
      cursor: pointer;
      margin: 5px;
      &:hover {
        background: url("../../assets/Player/Control/next_green.png") no-repeat;
        background-size: 30px 30px;
      }
    }

    .volume {
      width: 20px;
      height: 20px;
      background: url("../../assets/Player/Control/volume_gray.png") no-repeat;
      background-size: 20px 20px;
      cursor: pointer;
      margin: 5px;
      &:hover {
        background: url("../../assets/Player/Control/volume_green.png") no-repeat;
        background-size: 20px 20px;
      }
    }
  }

  .right_song_info {
    width: 33.3%;
    display: flex;
    height: 100%;
    flex: 1;
    flex-direction:row;
    justify-content: flex-end;
    align-items: center;
    padding-right: 50px;

    .time_info {
      color: #ccc;
      font-size: 14px;
    }

    .playlist_icon {
      width: 25px;
      height: 25px;
      background: url("../../assets/Player/Control/playlist_gray.png") no-repeat;
      background-size: 25px 25px;
      cursor: pointer;
      margin: 5px;
      &:hover {
        background: url("../../assets/Player/Control/playlist_green.png") no-repeat;
        background-size: 25px 25px;
      }
    }
  }
}
</style>
