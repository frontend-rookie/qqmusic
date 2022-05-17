<template>
  <div class="search_detail">
    <div class="top_search_content">搜索"<b>{{router.currentRoute.value.query.keyword}}"</b></div>
<!--    搜索的主框-->
    <div class="search_content">
      <div class="top_menu">
        <router-link :to="songUrl">歌曲</router-link>
        <router-link :to="mvUrl">视频</router-link>
        <router-link :to="albumUrl">专辑</router-link>
        <router-link :to="playlistUrl">歌单</router-link>
        <router-link :to="singerUrl">歌手</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, toRefs} from "vue";
import router from "@/router"

export default defineComponent({
  name: "index",
  setup() {
    const routerUrl = reactive({
      songUrl: `/search/song?keyword=${router.currentRoute.value.query.keyword}`,
      mvUrl: `/search/mv?keyword=${router.currentRoute.value.query.keyword}`,
      albumUrl: `/search/album?keyword=${router.currentRoute.value.query.keyword}`,
      playlistUrl: `/search/playlist?keyword=${router.currentRoute.value.query.keyword}`,
      singerUrl: `/search/singer?keyword=${router.currentRoute.value.query.keyword}`
    })

    onBeforeMount(() => {

    })
    return {
      router,
      ...toRefs(routerUrl)
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

  .search_detail {
    position: absolute;
    left: 200px;
    top: 50px;
    bottom: 0;
    right: 0;
    user-select: none;
    min-width: 800px;

    .top_search_content {
      width: 100%;
      min-width: 800px;
      height: 60px;
      background: #eee;
      padding-left: 50px;
      font-size: 21px;
      line-height: 60px;
      color: #888888;
    }

    .search_content {
      padding: 20px;

      .top_menu {
        a {
          color: #222;
          text-decoration: none;
          margin-left: 20px;
          margin-right: 20px;
          font-weight: bolder;

          &.active {
            color: #31c27c;
            border-bottom: 4px solid #31c27c;
          }
        }
      }
    }
  }
</style>
