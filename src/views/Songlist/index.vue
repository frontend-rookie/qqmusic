<template>
  <div class="song_list">
      <SongListHeader :playlistDetail="playlistDetail"/>
      <div class="song_list_wrapper">
        <Song :playlistDetail="playlistDetail"/>
      </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, reactive, toRefs, watch} from "vue";
import router from "@/router";
import axios from "axios";
import SongListHeader from "@/views/Songlist/SongListHeader.vue";
import Song from "@/views/Songlist/Song.vue";

export default defineComponent({
  name: "SongList",
  components: {
    SongListHeader,
    Song
  },
  setup() {
    const playlist = reactive({
      playlistDetail: {},
      currentPlaylistId: computed(() => {
        return router.currentRoute.value.params.tid
      }),
      /**
       * 获取歌单详情
       * */
      async getPlaylistDetail() {
        const {data} = await axios({
          url: `/api/songlist`,
          method: `get`,
          params: {
            id: router.currentRoute.value.params.tid
          }
        })
        console.log(data);
        this.playlistDetail = data.data
      }
    })

    // 切换歌单时，重新加载
    watch(() => playlist.currentPlaylistId, async () => {
      await playlist.getPlaylistDetail();
    })

    onBeforeMount(async () => {
      await playlist.getPlaylistDetail();
      console.log(router.currentRoute.value.params.tid)
    })
    return {
      ...toRefs(playlist),
    }
  }
})
</script>

<style scoped lang="less">
.song_list {
  position: absolute;
  left: 200px;
  top: 70px;
  right: 0;
  bottom: 0;
  //border: 10px solid #000;
}

.song_list_wrapper {
  position: absolute;
  left: 0;
  top: 200px;
  right: 0;
  bottom: 0;
  overflow: auto;
}
</style>
