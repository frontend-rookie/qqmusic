<template>
  <div class="singer">
      <ul class="singer_list">
        <li class="singer_item" v-for="(item, index) in singerArr">
          <img :src="item.singerPic" alt="" class="singer_img" draggable="false">
          <div class="singer_name">{{item.singerName}}</div>
          <div class="singer_info">
            单曲{{item.songNum}}; 专辑{{item.albumNum}}
          </div>
        </li>
      </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, toRefs} from "vue";
import router from "@/router"
import axios from "axios"

export default defineComponent({
  name: "Singer",
  setup() {
    const singer = reactive({
      // 搜索的歌手的数据
      singerArr: [],
      /**
       * 获取搜索的歌手的数据
       * */
      async getSingerArr() {
        const {data} = await axios({
          url: `/api/search`,
          method: `get`,
          params: {
            key: router.currentRoute.value.query.keyword,
            pageNo: 1,
            t: 9
          }
        })
        this.singerArr = data.data.list
      },
    })

    onBeforeMount(async () => {
      await singer.getSingerArr()
    })
    return {
      ...toRefs(singer)
    }
  }
})
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  ul {
    list-style: none;
  }
}

.singer {
  padding-top: 20px;
  .singer_list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .singer_item {
      width: 200px;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        cursor: pointer;
      }

      .singer_name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        cursor: pointer;
        &:hover {
          color: #31c27c;
        }
      }

      .singer_info {
        color: #aaa;
      }
    }
  }
}

</style>

