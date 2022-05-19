<template>
  <div class="playlist" @scroll="handleScroll">
    <ul class="playlist_list">
      <li class="playlist_item" v-for="(item, index) in playlistArr">
        <div class="img">
          <img :src="item.imgurl" alt="" draggable="false">
          <span>{{handleAlbumName(item.dissname)}}</span>
        </div>
        <div class="author"><span>{{handleAlbumName(item.creator.name)}}</span></div>
        <div class="play_count">{{handlePlayCount(item.listennum)}}</div>
        <div class="song_count">{{item.song_count}}首</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, toRefs} from "vue";
import axios from "axios";
import router from "@/router";

export default defineComponent({
  name: "Playlist",
  setup() {
    const playlist = reactive({
      // 歌单数据
      playlistArr: [],
      // 当前显示的页数
      currentPage: 1,
      /**
       * 获取搜索的歌单的数据结果
       * */
      async getPlaylist() {
        const {data}= await axios({
          url: `/api/search`,
          method: "get",
          params: {
            key: router.currentRoute.value.query.keyword,
            pageNo: this.currentPage,
            t: 2
          }
        })
        // @ts-ignore
        this.playlistArr.push(...data.data.list)
      },

      /**
       * 处理播放量
       * */
      handlePlayCount(count:string):string {
        let num = Number(count);
        if (num > 100000000) {
          return (num / 100000000).toFixed(1) + "亿播放"
        } else if (num > 10000) {
          return (num / 10000).toFixed(1) + "万播放"
        } else {
          return `${num}播放`
        }
      },

      /**
       * 处理专辑和歌手名字
       * @param albumName 专辑或歌手名字
       * */
      handleAlbumName(albumName: string):string {
        const rExp : RegExp = /(&#)(\d+);/g ;
        let arr = albumName.match(rExp)
        if(arr) {
          let str = albumName;
          // const rExp2: RegExp = /\d+/g
          arr.forEach((item) => {
            let charASII:number = Number(item.replace("&#", "").replace(";", ""));
            // console.log(String.fromCharCode(charASII));
            // console.log(item);
            str = str.replace(item, String.fromCharCode(charASII))
          })
          return str
        }
        // console.log(arr);
        return albumName;
      },

      /**
       * 处理滚动事件
       * */
      handleScroll(event:any) {
        if(event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight) {
          // console.log(`滚动了底部`);
          this.currentPage++;
          this.getPlaylist()
        }
      }
    })

    onBeforeMount(async () => {
      await playlist.getPlaylist();
    })

    return {
      ...toRefs(playlist)
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
  padding-top: 20px;
  min-width: 800px;
  position: absolute;
  left: 0;
  top: 100px;
  bottom: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-top: 20px;
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

  .playlist_list {
    list-style: none;
    width: 100%;
    margin-top: 10px;


    .playlist_item {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      align-items: center;
      padding-left: 20px;

      div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;


        span:hover {
          color: #31c27c;
          cursor: pointer;
        }
      }

      &:hover {
        background: #eee;
      }

      .img {
        width: 50%;
        height: 100px;

        img {
          width: 100px;
          height: 100px;
          vertical-align: middle;
          margin-right: 20px;
          border-radius: 10px;
        }
      }
      .author {
        flex: 1;
        margin-left: 10px;
        font-size: 14px;
      }
      .play_count {
        flex: 1;
        margin-left: 10px;
        font-size: 14px;
      }
      .song_count {
        flex: 1;
        margin-left: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
