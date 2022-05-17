<template>
  <div class="song">
    <div class="sort">
      <div class="sort_song_name">歌曲</div>
      <div class="sort_singer">歌手</div>
      <div class="sort_album">专辑</div>
      <div class="sort_time">时长</div>
    </div>
      <ul class="song_list">
        <li class="song_item" v-for="item in songArr" :key="item.songid">
          <div class="song_name">{{item.songname}}</div>
          <div class="singer">{{item.singername}}</div>
          <div class="album">{{item.albumname}}</div>
          <div class="time">{{item.time}}</div>
        </li>
      </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, toRefs} from "vue";
import axios from "axios";
import router from "@/router";

export default defineComponent( {
  name: "Song",
  setup() {
    const song = reactive({
      // 存储歌曲信息
      songArr: [],
      /**
       * 获取搜索单曲的列表
       * */
      async getSongList() {
        let res = await axios({
          url: `/api/search`,
          method: "get",
          params: {
            key: router.currentRoute.value.query.keyword,
            t: 0,
            pageSize: 20,
            pageNo: 1
          }
        })
        // console.log(res.data);
        this.songArr = res.data.data.list
      }
    })

    onBeforeMount(async () => {
      await song.getSongList();
    })

    return {
      ...toRefs(song)
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
  .sort {
    width: 100%;
    display: flex;
    color: #555;
    font-size: 14px;

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

  .song_list {
    list-style: none;
    width: 100%;


    .song_item {
     display: flex;
      height: 50px;
      line-height: 50px;
      border-radius: 10px;

      &:hover {
        background: #eee;
      }

      div {
        padding-left: 10px;
      }

      .song_name {
        width: 30%;
      }
      .singer {
        width: 30%;
      }
      .album {
        width: 30%;
      }
      .time {
        width: 10%;
      }
    }
  }
}

</style>
