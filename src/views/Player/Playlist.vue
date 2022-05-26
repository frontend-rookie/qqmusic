<template>
  <teleport to="body">
    <div class="playlist" @click.self="closePlaylist" v-if="isShowPlaylist">
      <!--    用于右侧展开的歌单-->
      <!--    Control组件的子组件-->
<!--      右侧播放队列 , 左侧为透明遮罩层-->
      <div class="right_wrapper">
        <div class="top_info">
          <div class="title">播放队列</div>
          <div class="song_num">共{{store.state.player.songTotalNum}}首歌曲</div>
        </div>
        <ul class="song_list" ref="playlistUl">
          <li class="song_item"
              v-for="(item, index) in store.state.player.playlistArray" :class="{active: store.state.player.playlistArray[store.state.player.playingSongIndex].songmid === item.songmid}">
            <div class="left_info">
              <div class="song_name">{{item.songname}}</div>
              <div class="singer_names">
                <span class="singer_name" v-for="singer in item.singer">{{singer.name}}&nbsp;</span>
              </div>
            </div>
            <div class="right_time">{{handleTime(item.interval)}}</div>
<!--            鼠标悬停显示的播放和删除按钮-->
            <div class="play_del_buttons">
              <div class="play_button" title="播放" @click="store.commit('changePlayingSong', index)"></div>
              <div class="del_button" title=删除 @click="store.commit('deleteSongFromPlayList', index)"></div>
<!--              <div class="del_button" title="删除"></div>-->
            </div>
          </li>
        </ul>
        <div class="bottom_button" @click="closePlaylist" ref="dom">收起</div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref, onMounted, watch, computed} from "vue";
import store from "@/store";
export default defineComponent({
  name: "Playlist",
  props: {
    // 是否显示播放列表
    isShowPlaylist: {
      type: Boolean,
      default: false
    },
  },
  emits: ["closePlaylist"],
  setup(props,{emit}) {
    let {isShowPlaylist} = toRefs(props)
    let playlistUl = ref()
    let dom = ref()
    const playlist = reactive({
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
       * 关闭播放队列
       * */
      closePlaylist() {
        emit('closePlaylist')
      },

      /**
       * 定位到正在播放的歌曲
       * */
      locatePlayingSong() {
        setTimeout(() => {
          console.log(playlistUl.value);
          playlistUl.value.scrollTop = (store.state.player.playingSongIndex - 3) * 60
        }, 10)
      }
    })

    watch(() => isShowPlaylist.value, (newVal) => {
      // console.log(`检测到播放列表是否显示`);
      if (newVal) {
        playlist.locatePlayingSong()
      }
    })

    onMounted(() => {
      // playlist.locatePlayingSong()
    })
    return {
      store,
      ...toRefs(playlist),
      playlistUl,
      dom
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

.playlist {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  flex-direction: row-reverse;
  z-index: 10;

  .right_wrapper {
    width: 300px;
    height: 100%;
    border-radius: 20px 0 0 20px;
    background-color: #fcfcfc;
    display: flex;
    flex-direction: column;
    user-select: none;
    border: 2px solid #ccc;

    .top_info {
      width: 100%;
      height: 100px;
      padding-left: 30px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      //justify-content: flex-start;
      text-align: left !important;
      color: red;
      user-select: none;

      .title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: left;
        font-size: 20px;
        color: #333;
        font-weight: bolder;
      }

      .song_num {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: left;
        font-size: 14px;
        padding-left: 20px;
        color: #999;

      }
    }

    .song_list {
      display: flex;
      list-style: none;
      overflow-x: hidden;
      overflow-y: scroll;
      flex: 1;
      flex-direction: column;

      &::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #E5E5E5;
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #ffffff;
      }

      .song_item {
        position: relative;
        width: 100%;
        height: 60px;
        padding-left: 20px;
        padding-right: 10px;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: space-between;

        &.active {
          color: #31c27c !important;
          .left_info .singer_names {
            color: #31c27c;
          }
        }

        &:hover{
          background-color: #f0f0f0;
        }

        .left_info {
          display: flex;
          flex-direction: column;
          width: 70%;

          .song_name {
            //color: #333;
            font-size: 16px;
            line-height: 25px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          .singer_names {
            color: #999;
            font-size: 13px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }

        .right_time {
          color: #aaa;
        }

        &:hover {
          .play_del_buttons {
            opacity: 1;
          }
        }
        .play_del_buttons {
          opacity: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: 30%;
          height: 100%;
          display: flex;
          flex-direction: row;
          //border: 10px solid #000;

          .play_button, .del_button {
            width: 50%;
            height: 60px;
            background-color: #f0f0f0;
          }

          .play_button {
            background: #f0f0f0 url("../../assets/Player/Control/play_black.png") no-repeat center center;
            background-size: 20px 20px;
            cursor: pointer;

            &:hover {
              background: #f0f0f0 url("../../assets/Player/Control/play_green.png") no-repeat center center;
              background-size: 20px 20px;
            }
          }

          .del_button {
            background: #f0f0f0 url("../../assets/Player/Control/del_black.png") no-repeat center center;
            background-size: 20px 20px;
            cursor: pointer;

            &:hover {
              background: #f0f0f0 url("../../assets/Player/Control/del_green.png") no-repeat center center;
              background-size: 20px 20px;
            }
          }
        }
      }
    }

    .bottom_button {
      width: 90px;
      height: 70px;
      padding-left: 50px;
      background: url("../../assets/Player/Control/playlist_gray.png") no-repeat 30px center;
      background-size: 20px 20px;
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        color: #31c27c;
        background: url("../../assets/Player/Control/playlist_green.png") no-repeat 30px center;
        background-size: 20px 20px;
      }
    }
  }
}
</style>
