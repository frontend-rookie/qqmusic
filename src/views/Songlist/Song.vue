<template>
  <div class="song">
    <div class="sort">
      <div class="sort_song_name">歌曲</div>
      <div class="sort_singer">歌手</div>
      <div class="sort_album">专辑</div>
      <div class="sort_time">时长</div>
    </div>
    <ul class="song_list1"
        ref="songWrapper">
      <li class="song_item"
          :class="{active: item.songmid === store.state.player.songMid && store.state.player.playlistTid === playlistDetail.disstid}"
          v-for="(item, index) in playlistDetail.songlist" :key="item.songid">
        <div class="song_name" @click="handleSongNameClick(item)">{{item.songname}}</div>
        <div class="singer">
            <span class="singer_name" v-for="(singer, index) in item.singer">
              {{singer.name}}&nbsp;&nbsp;&nbsp;
            </span></div>
        <div class="album">{{item.albumname}}</div>
        <div class="time">{{handleSongTime(item.interval)}}</div>
      </li>
    </ul>
<!--    定位正在播放歌单中的歌曲按钮和返回顶部的按钮-->
    <div class="up_find_wrapper">
      <div class="find_palying" title="定位"
           v-if="store.state.player.playlistTid === playlistDetail.disstid"
           @click="handleLocationClick"></div>
      <div class="up" title="回到顶部" @click="handleUpClick"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, toRefs, ref, onMounted, computed} from "vue";
import axios from "axios";
import router from "@/router";
import store from "@/store";

export default defineComponent( {
  name: "Song",
  props: {
    playlistDetail: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, context) {
    const {playlistDetail} = toRefs(props)
    // ul 要检测滚动的元素
    let songWrapper = ref();

    const song = reactive({
      songWrapper: null,
      // 存储歌曲信息
      songArr:computed(() => playlistDetail.value.songlist) ,
      /**
       * 处理歌曲的总时长
       * @param interval 秒
       * */
      handleSongTime(interval:number):string {
        let min = Math.floor(interval / 60);
        let sec = interval % 60;
        return `${min}:${sec.toString().length === 1 ? `0${sec}` : sec}`
      },

      /**
       * 处理歌名点击事件
       * */
      handleSongNameClick(item:any):void {
        store.commit("setSongMid", item.songmid)
        store.commit("addSongToPlayList",item)
      },

      /**
       * 定位正在播放歌单中的歌曲
       * */
      handleLocationClick(){
        for(let i = 0; i< playlistDetail.value.songlist.length-1; i++){
          if(playlistDetail.value.songlist[i].songmid === store.state.player.songMid){
            songWrapper.value.scrollTop = (i-6) * 50 - 10
            break
          }
        }
      },

      /**
       * 回到顶部
       * */
      handleUpClick(){
        songWrapper.value.scrollTop = 0
      }
    })

    return {
      ...toRefs(song),
      songWrapper,
      store,
      router
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

.song {
  width: 100%;
  margin-top: 20px;
  //position: relative;
  min-width: 800px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;

  .sort {
    width: 100%;
    display: flex;
    color: #555;
    font-size: 14px;
    padding-left: 30px;

    .sort_song_name {
      width: 30%;
    }

    .sort_singer {
      width: 30%;
    }

    .sort_album {
      width: 30%;
    }

    .sort_time {
      width: 10%;
    }
  }

  .song_list1 {
    list-style: none;
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    top: 30px;
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 5px;
    }
    /* 滚动槽 */
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
      border-radius: 10px;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.1);
      -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
    }

    .song_item {
      display: flex;
      height: 50px;
      line-height: 50px;
      border-radius: 10px;
      //display: block;

      &:hover {
        background: #eee;
      }

      &.active {
        color: #31c27c;
        background-color: #eee;
      }

      div {
        padding-left: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .song_name {
        width: 30%;
        cursor: pointer;
        &:hover {
          color: #31c27c;
          text-decoration: underline;

        }
      }
      .singer {
        width: 30%;

        span {
          cursor: pointer;
          &:hover {
            color: #31c27c;
          }
        }
      }
      .album {
        width: 30%;
        cursor: pointer;
        &:hover {
          color: #31c27c;
          text-decoration: underline;
        }
      }
      .time {
        width: 10%;
        color: #ccc;
      }
    }
  }
  .up_find_wrapper {
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 30px;
    //height: 60px;
    //border: 1px solid #000;
    display: flex;
    flex-direction: column-reverse;
    background-color: #eee;
    //z-index: 2;

    .up {
      border: 1px solid #ccc;
      background: url("../../assets/Player/Control/up_gray.png") no-repeat center center;
      background-size: 20px 20px;
      cursor: pointer;
      width: 100%;
      height: 30px;

      &:hover {
        border: 1px solid #31c27c;
        background: url("../../assets/Player/Control/up_green.png") no-repeat center center;
        background-size: 20px 20px;
      }
    }

    .find_palying {
      border: 1px solid #ccc;
      background: url("../../assets/Player/Control/location_gray.png") no-repeat center center;
      background-size: 20px 20px;
      cursor: pointer;
      width: 100%;
      height: 30px;

      &:hover {
        border: 1px solid #31c27c;
        background: url("../../assets/Player/Control/location_green.png") no-repeat center center;
        background-size: 20px 20px;
      }
    }
  }
}

</style>
