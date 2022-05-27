<template>
  <div class="control">
<!--    播放条中心控制按钮-->
    <div class="center_control_buttons">
      <div class="play_way circle" v-if="playMode === 0" @click="changePlayMode"></div>
      <div class="play_way random" v-if="playMode === 1" @click="changePlayMode"></div>
      <div class="play_way only" v-if="playMode === 2" @click="changePlayMode"></div>
      <div class="last_song" @click="clickPreSong"></div>
      <div class="play_pause_button" v-if="!isSongPlaying" @click="handlePlayPauseButtonClick"></div>
      <div class="play_button" v-if="isSongPlaying" @click="handlePlayPauseButtonClick"></div>
      <div class="next_song" @click="clickNextSong"></div>
      <div class="volume" @click.self="handleVolumeClick ">
<!--        点击音量按钮显示的音量控件-->
        <div class="volume_control_wrapper" v-if="isShowVolume">
          <div class="volume_outer_bar" @mousedown="handleVolumeMousedown" ref="outerBar">
            <div class="volume_inner_bar" ref="innerBar">
              <div class="volume_ball" ref="volumeBall"></div>
            </div>
          </div>
<!--          <hr />-->
          <div class="volume_num">{{parseInt(String(currentVolume))}}</div>
        </div>
      </div>
    </div>
    <div class="right_song_info">
      <span class="time_info">{{handleTime(songHavePlayedTime)}} / {{handleTime(songInfo?.interval)}}</span>
      <div class="playlist_icon" @click="isShowPlaylist = true"></div>
    </div>
    <Playlist :isShowPlaylist="isShowPlaylist" @closePlaylist="closePlaylist"/>
    <teleport to="body">
<!--      音量调节的遮罩层-->
      <div class="volume_mask"
           v-if="isShowVolumeMask"
           @mousemove="handleVolumeMousemove"
           @mouseup="handleVolumeMouseUp"
           @click.self="isShowVolume = false"></div>
    </teleport>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from "vue";
import Playlist from "@/views/Player/Playlist.vue";

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
  components: {
    Playlist
  },
  setup(props, content) {
    const {songInfo, songHavePlayedTime, isSongPlaying, playMode} = toRefs(props)

    // 音量外部的滑动条
    let outerBar = ref()
    // 音量内部的滑动条
    let innerBar = ref()
    // 音量球
    let volumeBall = ref()
    const control = reactive({
      // 是否显示播放队列
      isShowPlaylist: false,
      /**
       * 处理播放时间
       * */
      handleTime(time:string | number):string {
        let temp  = Number(time)
        const min = Math.floor(temp / 60)
        const sec = Math.floor(temp % 60)
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
      },

      /**
       * 关闭播放队列
       * */
      closePlaylist() {
        control.isShowPlaylist = false
      },

      /**
       * 点击下一首按钮
       * */
      clickNextSong() {
        content.emit('clickNextSong')
      },

      /**
       * 点击上一首歌曲
       * */
      clickPreSong() {
        content.emit('clickPreSong')
      },

      /**
       * @brief 音量控制
       * @date 2022.05.26
       * @author redLeaf
       * */
      // 是否显示音量控制
      isShowVolume: false,
      // 当前的音量
      currentVolume: 100,
      // 是否显示音量调节的遮罩层
      isShowVolumeMask: false,
      // 是否按下鼠标
      isMouseDown: false,

      /**
       * 音量按钮点击事件
       * */
      handleVolumeClick() {
        this.isShowVolume = !this.isShowVolume
        if(this.isShowVolume) {
          setTimeout(() => {
            innerBar.value.style.height = `${this.currentVolume}%`
          },0)
        }
      },

      /**
       * 处理音量外部控件的鼠标按下事件
       * */
      handleVolumeMousedown(event:MouseEvent) {
        this.isMouseDown = true
        this.isShowVolumeMask = true
        // console.log(event.clientY);
        let {top, height} = outerBar.value.getBoundingClientRect()
        // 调节成的音量大小
        let volumeNum:number = (- event.clientY + top + height ) / height * 100
        if(volumeNum > 100) {
          volumeNum = 100
        }else if(volumeNum < 0) {
          volumeNum = 0
        }
        innerBar.value.style.height = volumeNum + '%'
        this.currentVolume = volumeNum
        this.changeVolume()
      },

      /**
       * 处理音量外部控件的鼠标移动事件
       * */
      handleVolumeMousemove(event:MouseEvent) {
          let {top, height} = outerBar.value.getBoundingClientRect()
          // 调节成的音量大小
          let volumeNum:number = (- event.clientY + top + height ) / height * 100
          if(volumeNum > 100) {
            volumeNum = 100
          }else if(volumeNum < 0) {
            volumeNum = 0
          }
          innerBar.value.style.height = volumeNum + '%'
          this.currentVolume = volumeNum
          this.changeVolume()
      },

      handleVolumeMouseUp(event:MouseEvent) {
        this.isMouseDown = false
        this.isShowVolumeMask = false
      },

      /**
       * 改变音量
       * */
      changeVolume() {
        content.emit('changeVolume', this.currentVolume / 100)
      }

    })
    return {
      ...toRefs(control),
      innerBar,
      outerBar,
      volumeBall
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
      position: relative;
      &:hover {
        background: url("../../assets/Player/Control/volume_green.png") no-repeat;
        background-size: 20px 20px;
      }

      .volume_control_wrapper {
        width: 70px;
        height: 200px;
        position: absolute;
        left: -25px;
        top: -210px;
        border: 1px solid #ccc;
        background-color: #fff;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;

        .volume_outer_bar {
          width: 5px;
          background: #ccc;
          height: 150px;
          border-radius: 5px;
          position: relative;

          .volume_inner_bar {
            width: 5px;
            //height: 100%;
            background: #31c27c;
            border-radius: 5px;
            position: absolute;
            bottom: 0;

            .volume_ball {
              width: 15px;
              height: 15px;
              background: #31c27c;
              border-radius: 50%;
              position: absolute;
              left: -5px;
              top: -7.5px;
            }
          }
        }

        .volume_num {
          height: 28px;
          line-height: 28px;
          font-size: 16px;
          ;
        }

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

.volume_mask {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  //background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
</style>
