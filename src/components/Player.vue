<template>
  <div class="player">
    <audio :src="songUrl" controls ref="audio"></audio>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, toRefs, watch, ref, computed} from "vue";
import axios from "axios";
import store from "@/store";
// import playlist from "@/views/SearchDetail/Playlist.vue";
export default defineComponent({
  name: "Player",
  setup() {
    // 当前播放的歌曲的mid
    let songMid = computed(() => store.state.player.songMid)
    // audio Dom元素
    let audio = ref()
    const player = reactive({
      // 单前的songmid
      // songMid: store.state.player.songMid,
      // 获取的音乐播放链接
      songUrl: ``,
      /**
       * 获取音乐的播放链接
       * */
      async getMusicUrl() {
        const {data} = await axios({
          // url: `/api/song/urls`,
          url: `/api/song/urls`,
          method: `get`,
          params: {
            id: songMid.value,
            cookie: store.state.userInfo.cookie
          }
        })
        console.log(data);
        this.songUrl = data.data[songMid.value]
      },

    })

    /**
     * 当songmid改变时，即切歌时，改变播放音乐的url，换歌
     * */
    watch(songMid,async (newValue) => {
      // console.log(111)
      audio.value.pause()
      await player.getMusicUrl()
      audio.value.play()
    })

    onBeforeMount(async () => {
      // await player.setCoolie()
      await player.getMusicUrl()
    })

    return {
      ...toRefs(player),
      audio,
      songMid
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

.player {
  position: absolute;
  left: 200px;
  bottom: 0;
}
</style>
