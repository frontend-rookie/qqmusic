<template>
  <div class="control">
<!--    播放条中心控制按钮-->
    <div class="center_control_buttons">
      <div class="play_way"></div>
      <div class="last_song"></div>
      <div class="play_pause_button"></div>
      <div class="next_song"></div>
      <div class="volume"></div>
    </div>
    <div class="right_song_info">
      <span class="time_info">00:00 / 00:00</span>
      <div class="playlist_icon"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
interface PropData {

}

export default defineComponent({
  name: "Control",
  // ts-ignore
  props: defineProps({
    songInfo: {
      type: Propdata,
    }
  })
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

    .play_pause_button {
      width: 35px;
      height: 35px;
      background: #31c27c url("../../assets/Player/Control/play_white.png") no-repeat center center;
      background-size: 15px 15px;
      border-radius: 50%;
      cursor: pointer;
      margin: 5px;
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
