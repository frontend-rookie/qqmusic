<template>
  <div class="album">
    <ul class="album_list">
      <li class="album_item" v-for="(item, index) in albumArr">
        <div class="img">
          <img :src="item.albumPic" alt="" draggable="false">
          <span class="album_name">{{item.albumName}}</span>
        </div>
        <div class="author">
          <span class="author_name" v-for="author in item.singer_list">{{author.name}}</span>&nbsp;&nbsp;
        </div>
        <div class="pubtime">{{item.publicTime}}</div>
        <div class="song_count">{{item.song_count}}首</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, toRefs} from "vue";
import axios from "axios";
import router from "@/router"

export default defineComponent({
  name: "Album",
  setup() {
    /**
     * @brief 显示搜索的专辑的结果
     * @date 2022.05.18
     * @author redLeaf
     * */
    const album = reactive({
      // 专辑的信息
      albumArr: [],
      /**
       * 获取搜索的专辑的数据
       * */
      async getAlbum() {
        const res = await axios({
          url: `/api/search`,
          method: "get",
          params: {
            key: router.currentRoute.value.query.keyword,
            pageNo: 1,
            t: 8
          }
        })
        this.albumArr = res.data.data.list
        // console.log(res.data);
      }
    })

    onBeforeMount(async () => {
      await album.getAlbum();
    })

    return {
      ...toRefs(album)
    }
  }
})
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.album {
  padding-top: 20px;
  .album_list {
    list-style: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 800px;

    .album_item {
      widtH: 100%;
      display: flex;
      flex-direction: row;
      height: 100px;
      //justify-content: center;
      align-items: center;
      &:hover {
        background-color: #eee;
        border-radius: 10px;
      }

      .img {
        width: 40%;
        height: 70px;
        vertical-align: middle;
        padding-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 20px;

        img {
          width: 70px;
          height: 70px;
          vertical-align:  middle;
          cursor: pointer;
          border-radius: 5px;
        }

        span {
          margin-left: 20px;
          cursor: pointer;
          &:hover {
            color: #31c27c;
          }
        }
      }

      .author {
        width: 30%;

        .author_name {
          cursor: pointer;
          &:hover {
            color: #31c27c;
          }
        }
      }

      .pubtime {
        width: 20%;
      }

      .song_count {
        width: 10%;
      }
    }
  }
}
</style>
