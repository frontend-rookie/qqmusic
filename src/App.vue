<template>
  <div id="app_second">
    <LeftMenu/>
    <TopSearchBar/>
    <Content/>
    <Player/>
  </div>
</template>

<style lang="less">
  .app_second {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
  }
</style>

<script lang="ts">
// https://y.qq.com/mediastyle/yqq/img/logo.png?max_age=2592000
  import {defineComponent, onBeforeMount} from "vue";
  import LeftMenu from "@/components/LeftMenu.vue"
  import TopSearchBar from "@/components/TopSearchBar.vue";
  import Content from "@/components/Content.vue";
  import Player from "@/components/Player.vue"
  import axios from "axios"
  import store from "@/store";
  export default defineComponent<any>({
    name: "App",
    components: {
      LeftMenu,
      TopSearchBar,
      Content,
      Player
    },
    setup() {

      /**
       * @date 2022.05.09
       * @brief 处理cookie
       * @author redLeaf
       * */

      /**
       * 处理cookie 并填入浏览器中
       * */
      function handleCookie():void {
        const cookie:string = store.state.userInfo.cookie
        let cookies:string[] = cookie.split(";")
        cookies.forEach((item:string) => {
          let arr:string[] = item.split("=")
          if (arr.length === 2) {
            document.cookie = arr[0] + "=" + arr[1]

          }
        })
      }

      onBeforeMount(() => {
        axios.defaults.withCredentials = true;
        handleCookie()
      })
      }
  })
</script>
