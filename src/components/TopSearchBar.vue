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
        <input type="text" placeholder="搜索" class="input">
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
import {defineComponent, onBeforeMount} from "vue";
import axios from "axios"
import store from "@/store";

export default defineComponent<any> ({
  name: "TopSearchBar",
  setup() {
    onBeforeMount(async () => {
      //测试无用代码
      // let res = await axios({
      //   url: `/api/user/setCookie`,
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   params: {
      //     data: store.state.userInfo.cookie
      //   }
      // })
      // console.log(res.data, "携带的token");
      // let res1 = await axios({
      //   url: `/api/user/getCookie`,
      //   method: `get`,
      //   params: {
      //     id: `1929687026`
      //   }
      // })
      // console.log(res1.data);
      //
      // // 刷新登录
      // let res2 = await axios({
      //   url: `/api//user/refresh`,
      // })
      // console.log(res2.data);
    })
  }
})
</script>

<style scoped  lang="less">
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


