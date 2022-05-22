<template>
  <div class="left_menu">
    <!--  左侧的菜单-->
    <div class="top_logo"></div>
    <div class="main_menu_wrapper">
      <span class="menu_title">在线音乐</span>
      <ul class="online_music_list">
        <li class="online_music_item">
          <router-link to="/recommend">
            <div class="online_music_recommend online_music">推荐</div>
          </router-link>
        </li>
        <li class="online_music_item">
          <router-link to="/musicRoom">
            <div class="online_music online_music_room">音乐馆</div>
          </router-link>
        </li>
        <li class="online_music_item">
          <router-link to="/video}">
            <div class="online_music online_music_video">视频</div>
          </router-link>
        </li>
        <li class="online_music_item">
          <router-link to="/stream">
            <div class="online_music online_music_stream">电台</div>
          </router-link>
        </li>
      </ul>

<!--      创建的歌单列表-->
      <div class="create_music_list_wrapper">
        <span class="menu_title">创建的歌单</span>
        <ul class="create_music_list">
          <li class="music_list_item " v-for="(item, index) in userPlayListArray.userPlayListArray">
            <router-link to="`/playlist/${item.tid}`" v-if="!(index === 0)">
              <div class="music_list_item_div">
                {{item.diss_name}}
              </div>
            </router-link>
          </li>
        </ul>
      </div>
<!--      收藏的歌单-->
      <div class="create_music_list_wrapper">
        <span class="menu_title">收藏的歌单</span>
        <ul class="create_music_list">
          <li class="music_list_item " v-for="(item, index) in userCollectPlaylist.userCollectPlaylist">
            <router-link to="`/playlist/${item.tid}`">
              <div class="music_list_item_div">
                {{item.dissname}}
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, ref, toRefs}  from "vue";
import axios from "axios";
import store from "@/store";



export default defineComponent({
  name: "LeftMenu",
  setup() {
    let number = ref(1);
    /**
     * 处理显示用户的歌单
     * */
    let userPlaylist = reactive({
      userPlayListArray: reactive({userPlayListArray:[]}),
      /**
       * 获取用户创建的歌单
       * */
      async getCreateMusicList() {
        let res = await axios({
          url: `/api/user/songlist?id=${store.state.userInfo.qqNumber}`,
          method: `get`,
        })
        // console.log(res.data);
        store.commit("setUserPlaylist", res.data.data.list);
        this.userPlayListArray.userPlayListArray = res.data.data.list
      },

      // 用户收藏的歌单
      userCollectPlaylist: reactive({userCollectPlaylist:[]}),

      /**
       * 获取用户收藏的歌单
       * */
      async getCollectMusicList() {
        let res = await axios({
          url: `/api/user/collect/songlist`,
          method: `get`,
          params: {
            id: store.state.userInfo.qqNumber
          }
        })
        // console.log(`用户收藏的歌单`,res.data.data.list);
        this.userCollectPlaylist.userCollectPlaylist = res.data.data.list
      },



    })

    onBeforeMount(async () => {
      await userPlaylist.getCreateMusicList();
      await userPlaylist.getCollectMusicList();
    })

    return {
      store,
      ...toRefs(userPlaylist),
    }
  }
})
</script>

<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    user-select: none;
  }


  .left_menu {
    width: 200px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #eee;
    padding-left: 10px;
    padding-right: 10px;
    z-index: 2;

    .menu_title {
      font-size: 13px;
      color: #333;
      margin-top: 20px;
      display: block;
    }

    .top_logo {
      width: 100%;
      height: 50px;
      background: url("https://y.qq.com/mediastyle/yqq/img/logo.png?max_age=2592000") no-repeat center center;
      background-size: 100px 25px;
    }

    .main_menu_wrapper {
      padding-left: 20px;
      padding-right: 20px;

      ul.online_music_list {
        list-style: none;

        .online_music_item {
          width: 100%;
          //border: 1px solid #ccc;
          border-radius: 5px;
          height: 35px;
          margin-bottom: 10px;
          margin-top: 10px;
          overflow: hidden;

          &:hover {
            background-color: #ccc;
          }

          .active {
            .online_music {
              color: #fff;
              background-color: #1ECF9DFF;
            }
          }

          .online_music {
            width: 100%;
            height: 100%;
            font-size: 20px;
            padding-left: 35px;
            line-height: 35px;
            //color: #fff;
            color: #000;
            font-weight: bolder;
            font-family: "楷体",serif;
          }

          .online_music_recommend {
            //#1ECF9DFF
            background:  url(../assets/LeftMume/recommend.png) 5px center no-repeat;
            background-size: 20px 20px;
          }

          .online_music_room {
            background:  url(../assets/LeftMume/music_room.png) 5px center no-repeat;
            background-size: 20px 20px;
          }

          .online_music_video {
            background:  url(../assets/LeftMume/video.png) 5px center no-repeat;
            background-size: 20px 20px;
          }

          .online_music_stream {
            background:  url(../assets/LeftMume/stream.png) 5px center no-repeat;
            background-size: 20px 20px;
          }
        }
      }

      .create_music_list_wrapper {
        ul {
          text-decoration: none;

          .music_list_item {
            width: 100%;
            text-decoration: none;
            list-style: none;
            padding-left: 10px;
            border-radius: 5px;

            &:hover {
              background-color: #ccc;
            }
          }

          .music_list_item_div {
            width: 100%;
            //border: 1px solid #ccc;
            border-radius: 5px;
            height: 35px;
            margin-bottom: 10px;
            margin-top: 10px;
            overflow: hidden;
            line-height: 35px;
            font-size: 14px;
            color: #333333;
            white-space: nowrap;
            text-overflow: ellipsis;

            .active {
              .online_music {
                color: #fff;
                background-color: #1ECF9DFF;
              }
            }
          }
        }
      }
    }
  }
</style>
