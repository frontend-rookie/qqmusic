<template>
  <div class="top_search_bar">
    <div class="left_wrapper">
<!--          前进返回按钮-->
      <div class="back_next_buttons">
        <div class="back">&lt;</div>&nbsp;&nbsp;&nbsp;&nbsp;
        <div class="next">&gt;</div>
      </div>
<!--      搜索框-->
      <div class="input_wrapper">
        <input type="text"
               placeholder="搜索"
               class="input"
               v-model="userSearchInput"
               @focus="handleFocus"
               @blur="handleBlur"
               @input="handleInputChange">
<!--        搜索建议-->
        <div class="search_recommend_wrapper">
<!--          搜索热词容器-->
          <div class="search_hot_words" v-if="isShowSearchHotWords">
            <div class="hot_words_title">热门搜索</div>
            <hr />
            <ul class="hot_words_list">
              <li class="hot_words_item" v-for="(item, index) in search_hot_words" key="item.k">
                <div>{{item.k}}</div><div>{{formatPlayCount(item.n)}}</div>
              </li>
            </ul>
          </div>
<!--          搜索联想容器-->
          <div class="search_think_wrapper" v-if="isShowSearchThink">
            <div class="search_think_title">在线音乐</div>
            <div class="no_result" v-if="isShowNoResult">无结果</div>
<!--            <hr>-->
<!--            单曲容器-->
            <div class="songs" v-if="searchThinkList?.song?.count">
              <div class="songs_title">单曲</div>
              <ul class="songs_list">
                <li class="song_item"
                    v-for="(item, index) in searchThinkList?.song?.itemlist"
                    @click="handleItemClick('song', `${item.name} ${item.singer}`)">
                  {{item.name}}-{{item.singer}}
                </li>
              </ul>
            </div>
<!--            歌手容器-->
            <div class="singer" v-if="searchThinkList?.singer?.count">
              <div class="singer_title">歌手</div>
              <ul class="singer_list">
                <li class="singer_item" v-for="(item, index) in searchThinkList?.singer?.itemlist">
                  <img class="singer_img" :src="item.pic" alt="">
                  {{item.name}}
                </li>
              </ul>
            </div>
<!--            专辑容器-->
            <div class="album" v-if="searchThinkList?.album?.count">
              <div class="album_title">专辑</div>
              <ul class="album_list">
                <li class="album_item" v-for="(item, index) in searchThinkList?.album?.itemlist">
                  <img class="album_img" :src="item.pic" alt="">
                  {{item.name}}-{{item.singer}}
                </li>
              </ul>
            </div>
<!--            MV容器-->
            <div class="mv" v-if="searchThinkList?.mv?.count">
              <div class="mv_title">MV</div>
              <ul class="mv_list">
                <li class="mv_item" v-for="(item, index) in searchThinkList?.mv?.itemlist">
                  {{item.name}}-{{item.singer}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    右侧信息-->
    <div class="right_wrapper">
<!--      用户信息-->
      <div class="user_ingo_wrapper">
        <div class="user_img"></div>
        <div class="user_name">陌黎</div>
      </div>
<!--      控制按钮-->
      <div class="control_wrapper">
        <div class="min_control"></div>
        <div class="max_control"></div>
        <div class="close_control"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, toRefs, computed} from "vue";
import axios from "axios"
import router from "@/router";

export default defineComponent<any> ({
  name: "TopSearchBar",
  setup() {
    // @ts-ignore
    const search = reactive({
      /**
       * @brief 聚焦显示搜索热词
       * @date 2022.05.15
       * @author redLeaf
       * */
      search_hot_words: [],
      // 用户在搜索框中输入的内容
      userSearchInput: "",
      // input框是否获取焦点
      isInputFocus: false,
      // 是否显示搜索热词
      isShowSearchHotWords: computed(() => {
        return search.userSearchInput.length === 0 && search.isInputFocus
      }),

      /**
       * 获取搜索而热词
       * */
      async getSearchHotWords() {
        if(this.search_hot_words.length === 0) {
          let res = await axios({
            url: `/api//search/hot`,
            method: "get",
          })
          // console.log(`搜索热词`,res.data.data);
          this.search_hot_words = res.data.data;
        }
      },
      /**
       * 处理搜索量
       * */
      formatPlayCount(count:number):string | number {
        if (count < 10000) {
          return count;
        } else if (count < 100000000) {
          return (count / 10000).toFixed(2) + "万";
        } else {
          return (count / 100000000).toFixed(2) + "亿";
        }
      },


      /**
       * 处理标点聚焦事件
       * */
      async handleFocus() {
        this.isInputFocus = true;
        await search.getSearchHotWords()
      },
      /**
       * 处理失去焦点事件
       * */
      async handleBlur() {
        setTimeout(() => {
          this.isInputFocus = false;
        }, 100)
      },

      /**
       * @brief 用户输入后显示搜索建议
       * @date 2022.05.16
       * @author redLeaf
       * */

      // 是否显示搜索建议框
      isShowSearchThink: computed(() => {
        return search.userSearchInput.length > 0 && search.isInputFocus
      }),

      // 请求来的搜索联想的数据
      searchThinkList: {},

      // 是否显示无结果
      isShowNoResult: computed(() => {
        return search.searchThinkList.song?.count === 0 && search.searchThinkList.album?.count === 0 && search.searchThinkList.mv?.count === 0
      }),

      /**
       * 获取搜索联想
       * */
      async getSearchThinkWords() {
        let res = await axios({
          url: `/api/search/quick`,
          method: "get",
          params: {
            key: search.userSearchInput
          }
        })
        console.log(res.data);
        if(res.data.result === 100) {
          // 数据请求成功后才往变量里面存
          this.searchThinkList = res.data.data;
        }
      },

      // 输入搜索的防抖的定时器
      inputTimer: null,
      /**
       * 处理输入框change事件
       * */
      async handleInputChange() {
        clearTimeout(search.inputTimer);
        search.inputTimer = setTimeout(async() => {
          await this.getSearchThinkWords();
        }, 500)
      },

      /**
       * 处理搜索建议的结果被点击的事件
       * */
      handleItemClick(type:string, searchContent:string):void {
        /**
         * 此处踩过的坑：
         * 要对url进行加码
         * 有‘、\ / + -’要用encodeURIComponent， 用encodeUrl不行
         * */
        router.push("/waiting")
        setTimeout(() => {
          router.push(`/search/${type}/?keyword=${encodeURIComponent(searchContent)}`)

        }, 500)
      }

    })

    onBeforeMount(async () => {
      // await search.getSearchHotWords()
    })

    return {
      ...toRefs(search)
    }
  }
})
</script>

<style scoped  lang="less">
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .top_search_bar {
    position: absolute;
    top: 0;
    left: 200px;
    width: calc(100% - 200px);
    min-width: 800px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    background-color: #fff;

    .left_wrapper {
      display: flex;
      height: 100%;
      align-items:center;
      .back_next_buttons{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 50px;
        height: 100%;
        .back, .next{
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          color: #999;
          cursor: pointer;
          user-select: none;
        }
      }

      .input_wrapper{
        flex: 1;
        width: 300px;
        padding-left: 50px;
        border: 1px solid #222;
        margin-left: 10px;
        height: 30px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        background: #eeeeee url("../assets/TopSearchBar/search.png") no-repeat 10px center;
        background-size: 20px;
        position: relative;

        .input{
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          background: none;
          padding: 0 10px;
          color: #000;
          font-size: 16px;
        }

        .search_recommend_wrapper {
          .search_hot_words {
            position: absolute;
            left: 10px;
            top: 40px;
            border: 3px solid #aaa;
            border-radius: 10px;
            background-color: #fff;
            width: 280px;
            height: 400px;
            overflow-y: scroll;
            overflow-x: hidden;
            user-select: none;

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

            .hot_words_title {
              width: 100%;
              height: 40px;
              line-height: 40px;
              font-size: 16px;
              padding-left: 20px;
              font-weight: bolder;
            }

            .hot_words_list {
              width: 100%;
              padding-left: 10px;
              list-style: none;

              .hot_words_item {
                height: 40px;
                line-height: 40px;
                display: flex;
                justify-content: space-between;
                padding-left: 10px;
                padding-right: 10px;
                border-radius: 5px;
                cursor: pointer;

                &:hover {
                  background-color: #eee;
                }
              }
            }
          }

          .search_think_wrapper {
            position: absolute;
            left: 10px;
            top: 40px;
            width: 500px;
            border: 3px solid #aaa;
            border-radius: 10px;
            //height: 100px;
            padding: 10px;
            background-color: #fff;

            .search_think_title {
              height: 20px;
              line-height: 20px;
              width: 100%;
              font-weight: bolder;
              margin-bottom: 20px;
            }

            ul li {
              width: 428px;
            }

            .songs, .mv {
              width: 100%;
              display: flex;
              flex-wrap: nowrap;
              flex-direction: row;

              .songs_title, .mv_title {
                width: 50px;
                height: 30px;
                line-height: 30px;
                //font-size: 14px;
                font-weight: bolder;
              }

              .songs_list, .mv_list {
                list-style: none;
                display: flex;
                flex-wrap: nowrap;
                flex-direction: column;
                flex: auto;

                .song_item, .mv_item {
                  height: 30px;
                  line-height: 30px;
                  padding-left: 20px;
                  border-radius: 5px;
                  overflow: hidden;
                  cursor: pointer;
                  user-select: none;
                  text-overflow: ellipsis;
                  white-space: nowrap;

                  &:hover {
                    background-color: #f0f0f0;
                  }

                }
              }
            }

            .singer, .album {
              width: 100%;
              display: flex;
              flex-wrap: nowrap;
              flex-direction: row;

              .singer_title, .album_title {
                width: 50px;
                height: 30px;
                line-height: 30px;
                //font-size: 14px;
                font-weight: bolder;
              }

              .singer_list, .album_list {
                list-style: none;
                display: flex;
                flex-wrap: nowrap;
                flex-direction: column;
                flex: auto;

                .singer_item, .album_item {
                  height: 50px;
                  flex: auto;
                  line-height: 30px;
                  padding-left: 20px;
                  border-radius: 5px;
                  overflow: hidden;
                  cursor: pointer;
                  user-select: none;
                  text-overflow: ellipsis;
                  white-space: nowrap;

                  img.singer_img, img.album_img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    line-height: 50px;
                    vertical-align: center;
                    position: relative;
                    top: 10px;
                  }

                  img.album_img {
                    border-radius: 0;
                  }

                  &:hover {
                    background-color: #f0f0f0;
                  }

                }
              }
            }
          }

        }
      }
    }

    .right_wrapper {
      display: flex;
      height: 100%;
      align-items: center;
      .user_ingo_wrapper{
        display: flex;
        width: 300px;
        justify-content: center;
        align-items: center;
        height: 100%;
        .user_img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ccc;
        }
        .user_name{
          font-size: 15px;
          color: #333;
          width: 100px;
          overflow: hidden;
          margin-left: 10px;
        }
      }

      .control_wrapper {
        display: flex;
        width: 120px;
        justify-content: space-between;
        align-items: center;
        height: 100%;

        .min_control, .max_control, .close_control{
          width: 30px;
          height: 30px;
          margin: 5px;
          cursor: pointer;
        }

        .min_control {
          background: url("../assets/TopSearchBar/min.png") no-repeat center;
          background-size: 20px;
        }

        .max_control {
          background: url("../assets/TopSearchBar/max.png") no-repeat center;
          background-size: 20px;
        }

        .close_control {
          background: url("../assets/TopSearchBar/close.png") no-repeat center;
          background-size: 20px;
          //color: #1ECF9DFF
        }

      }
    }
  }
</style>


