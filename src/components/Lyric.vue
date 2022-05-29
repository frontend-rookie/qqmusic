<template>
  <div class="lyric_wrapper">
<!--    播放歌曲的模糊背景-->
    <div class="under_img_blur">
      <img :src="imgUrl" alt="">
    </div>
<!--    左侧显示的专辑图片-->
    <div class="left_img_wrapper">
      <div class="left_img">
        <img :src="imgUrl" alt="">
      </div>
    </div>
<!--    右侧歌侧和歌曲信息-->
    <div class="right_main_content">
      <div class="top_info">
      <div class="song_name">{{songDetail?.name}}</div>
      <div class="singer_name">歌手：<span v-for="singer in songDetail?.singer">{{singer?.name}}&nbsp;&nbsp;</span></div>
      <div class="album_name">专辑：{{songDetail.album?.title}}</div>
      </div>
      <ul class="lyric_outer_wrapper" ref="lyricWrapper">
          <li class="lyric_item" v-for="(str, index) in haveHandledData" :class="{active: index === currentIndex}">
            <div class="lyric_line">{{str.lyric.lyric}}</div>
            <div class="trans_line">{{str.trans}}</div>
          </li>
      </ul>
    </div>
<!--    是否显示翻译按钮-->
    <div class="translation_button" v-if="isShowTransButton" >翻译</div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, reactive, ref, toRefs, watch} from "vue";
import axios from "axios";
import store from "@/store";

export default defineComponent( {
  name: "Lyric",
  setup() {
    // 歌词外部容器
    let lyricWrapper = ref()
    /**
     * @brief 歌词组件
     * @date 2022.05.27
     * @author redLeaf
     * */
    // @ts-ignore
    const lyric = reactive({
      // 歌曲的songmid
      songMid: computed(() => store.state.player.songMid),
      // 左侧的图片url
      imgUrl: computed(() => `https://y.gtimg.cn/music/photo_new/T002R300x300M000${lyric.songDetail.album?.mid}.jpg`),
      // 歌词信息
      lyricData: "",
      //歌词翻译信息
      transData: "",
      // 处理后的歌词信息
      haveHandledLyric: [],
      // 处理后的歌词翻译信息
      haveHandledTrans: [],
      haveHandledData:[],
      /**
       * 获取正在播放的歌曲的歌词
       * */
      async getLyric() {
        const {data} = await axios.get(`/api/lyric?songmid=${this.songMid}`);
        console.log(data.data);
        this.lyricData = data.data.lyric
        this.transData = data.data.trans
        // @ts-ignore
        this.haveHandledLyric = this.handleLyric(this.lyricData)
        // @ts-ignore
        this.haveHandledTrans = this.handleLyric(this.transData)
        if(this.haveHandledTrans.length !== 0) {
          // 当有翻译时候
          this.haveHandledLyric.forEach((item, index) => {
            // @ts-ignore
            this.haveHandledData.push({
              lyric: item,
              // @ts-ignore
              trans: this.haveHandledTrans[index].lyric.replace("//", ""),
            })
          })
        }else{
          // 当没有翻译的时候
          this.haveHandledLyric.forEach((item, index) => {
            // @ts-ignore
            this.haveHandledData.push({
              lyric: item,
              // @ts-ignore
              trans: "",
            })
          })
        }

      },
      // 歌曲详情
      songDetail: {},
      /**
       * 获取歌曲详情
       * * */
      async getSongDetail() {
        let {data} = await axios({
          url: `/api/song`,
          method: "get",
          params: {
            songmid: this.songMid
          }
        })
        this.songDetail = data.data?.track_info
      },

      /**
       * 处理歌词数据
       * */
      handleLyric(OriginLyric:string) {
        let lyric = OriginLyric.split("[offset:0]\n")[1]
        // 如果没有翻译就直接返回
        if(lyric === undefined){
          this.isShowTransButton = false
          return []
        }
        let lyricArr = lyric.split("\n")
        let lyricArr2 = []
        for (let i = 0; i < lyricArr.length; i++) {
          let lyricItem = lyricArr[i]
          let time = lyricItem.substring(1, lyricItem.indexOf("]"))
          let timeArr = time.split(":")
          let timeArr2 = []
          for (let j = 0; j < timeArr.length; j++) {
            timeArr2.push(parseInt(timeArr[j]))
          }
          let lyricItem2 = lyricItem.substring(lyricItem.indexOf("]") + 1)
          lyricArr2.push({
            time: timeArr2,
            lyric: lyricItem2
          })
        }
        return lyricArr2
      },
      /**
       * @brief 歌词滚动
       * @date 2022.05.27
       * @author redLeaf
       * */
      currentTime: computed(() => store.state.lyric.currentTime),
      // 正在播放歌词的索引值
      currentIndex: 0,
      // 是否显示翻译按钮
      isShowTransButton: true,
      // 有翻译的时候，用户选择是否显示翻译
      isUserShowTrans: false

    })

    watch(() => lyric.songMid, async () => {
      await lyric.getLyric()
      await lyric.getSongDetail()
    })

    // 监测播放时间的变化滚动歌词
    watch(() => lyric.currentTime, () => {
      let currentTime = lyric.currentTime
      let lyricArr = lyric.haveHandledLyric
      for (let i = 0; i < lyricArr.length; i++) {
        let lyricItem = lyricArr[i]
        if (currentTime >= lyricItem.time[0] * 60 + lyricItem.time[1]) {
          lyric.currentIndex = i
          let {height} = lyricWrapper.value.getBoundingClientRect()
          // 父元素到他的父元素顶部的距离
          let wrapperToTop = lyricWrapper.value.offsetTop
          // 要播放的歌词到父元素的顶部的距离
          // @ts-ignore
          let lyricToTop = document.getElementsByClassName('active')[0].offsetTop
          // 要滚动的距离
          lyricWrapper.value.scrollTop = lyricToTop - wrapperToTop - height / 2
        }
      }
    })

    onBeforeMount(async  () => {
      await lyric.getLyric()
      await lyric.getSongDetail()
    })
    return {
      ...toRefs(lyric),
      lyricWrapper
    };
  }
})
</script>

<style scoped lang="less">
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    user-select: none;
  }
  .lyric_wrapper {
    position: absolute;
    left: 200px;
    top: 50px;
    bottom: 0;
    right: 0;
    min-width: 800px;
    display: flex;
    flex-direction: row;
    overflow: hidden;

    .under_img_blur {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
      filter:blur(30px);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .left_img_wrapper {
      width: 40%;
      //border: 10px solid #000;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .right_main_content {
      width: 60%;
      //height: 80%;
      //border: 10px solid #000;
      height: 100%;
      background: rgba(0,0,0,0.5);
      //border: 2px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .top_info {
        width: 80%;
        height: 15%;
        //border: 1px solid #fff;
        min-height: 100px;
        .song_name {
          font-size: 30px;
          color: #fff;
          text-align: center;
          margin-bottom: 10px;
        }
        .singer_name, .album_name {
          font-size: 14px;
          color: #ccc;
          text-align: center;
          cursor: pointer;
        }
      }

      .lyric_outer_wrapper {
        width: 80%;
        height: 70%;
        //border: 1px solid #fff;
        color: #fff;
        overflow: scroll;
        font-family: "楷体", serif;
        font-weight: bold;
        &::-webkit-scrollbar {
          display: none;
        }

        .lyric_item {
          color: #fff;
          font-size: 20px;
          text-align: center;
          margin-bottom: 10px;

          &.active {
            //font-size: 20px;
            color: #31c27c;
            font-size: 27px;
          }
        }
      }
    }

    .translation_button {
      position: absolute;
      right: 30px;
      bottom: 30px;
      width: 30px;
      height: 30px;
      background-color: red;
    }
  }
</style>
