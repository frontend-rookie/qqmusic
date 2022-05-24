import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {
      name: '『doki-doki』',
      qqNumber: `1929687026`,
      cookie: `pgv_pvid=9288439776; fqm_pvqid=28cb88b3-28a3-449c-b841-d032251037ec; fqm_sessionid=2b001800-4952-42f3-9ea9-14011e758027; pgv_info=ssid=s5223855980; ts_last=y.qq.com/; ts_uid=9668736836; _qpsvr_localtk=0.2655292138185936; RK=8llk7NXkZ8; ptcz=88ee5a96e5097547c225d3f31e9ac68771304090952142a395477dab910d7762; login_type=1; wxrefresh_token=; psrf_qqrefresh_token=9677CB9F13A21B70B68161C654EDA6D6; euin=oKEANKCF7inA7c**; psrf_access_token_expiresAt=1661081095; qm_keyst=Q_H_L_5DCsKHRRS8Mj6LKzA1ejmqY59p7oAd1p_Y6Bi2pKB7mtlucPJwO-rLA; wxunionid=; wxopenid=; uin=1929687026; psrf_qqaccess_token=765AFACDB816D72CF8B5B94B510EFB91; psrf_musickey_createtime=1653305095; qm_keyst=Q_H_L_5DCsKHRRS8Mj6LKzA1ejmqY59p7oAd1p_Y6Bi2pKB7mtlucPJwO-rLA; psrf_qqunionid=133D646103F7DFC2850D335A6FD129BF; psrf_qqopenid=A5A9172561051CF617E82D505D645FE4; qqmusic_key=Q_H_L_5DCsKHRRS8Mj6LKzA1ejmqY59p7oAd1p_Y6Bi2pKB7mtlucPJwO-rLA; tmeLoginType=2`
    },
    // 用户创建的歌单
    userPlaylist: [],
    // 用于存储正在播放音乐的id等信息
    player: {
      // 正在播放歌曲的id
      songMid: "001nJemf2XdD3Z",
      // 播放队列列表
      playlistArray:[{"albumdesc":"","albumid":21497391,"albummid":"003CTsMp0cZ9WR","albumname":"星结","alertid":2,"belongCD":1,"cdIdx":0,"interval":224,"isonly":0,"label":"0","msgid":14,"pay":{"payalbum":0,"payalbumprice":0,"paydownload":1,"payinfo":1,"payplay":0,"paytrackmouth":1,"paytrackprice":200,"timefree":0},"preview":{"trybegin":0,"tryend":0,"trysize":0},"rate":0,"singer":[{"id":1521158,"mid":"000Acq0F39FioL","name":"LunaLiu刘不语"}],"size128":3592601,"size320":8981140,"size5_1":0,"sizeape":0,"sizeflac":25931520,"sizeogg":4851713,"songid":320140161,"songmid":"001nJemf2XdD3Z","songname":"星结（Tangled Affection）","songorig":"星结（Tangled Affection）","songtype":0,"strMediaMid":"003D3Kxd0rS3Cb","stream":0,"switch":16889603,"type":0,"vid":""}],
      // 当前播放的歌曲在播放队列中的索引
      playingSongIndex: 0,
    }
  },
  mutations: {
    setUserPlaylist(state, payload) {
      state.userPlaylist = payload
    },
    setSongMid(state,payload) {
      state.player.songMid = payload
    },
    /**
     * 改变播放的歌曲
     * @param state
     * @param payload 要播放的索引值
     * */
    changePlayingSong(state,payload:number):void {
      // console.log(payload);
      state.player.playingSongIndex = payload
      state.player.songMid = state.player.playlistArray[payload].songmid
    },
    /**
      * 改变播放队列列表
     */
    setPlayListArray(state,payload):void {
      state.player.playlistArray = payload
      state.player.playingSongIndex = 0;
      state.player.songMid = state.player.playlistArray[0].songmid
    },
    /**
     * 往播放队列中添加歌曲
     * */
    addSongToPlayList(state,payload):void {
      // console.log(payload);
      // state.player.playlistArray.push(payload)
      /**
       * 这里踩的坑：forEach里面的return不能跳出forEach循序
       * */
      // state.player.playlistArray.forEach((item, index) => {
      //   // console.log(item.songmid);
      //   // console.log(payload.songmid);
      //   console.log(item.songmid === payload.songmid);
      //   if(item.songmid === payload.songmid) {
      //     // 如果要天添加的歌曲已经在播放队列中，则不添加
      //     state.player.playingSongIndex = index
      //     return
      //   }
      // })
      for(let i = 0; i < state.player.playlistArray.length  - 1; i++) {
        if(state.player.playlistArray[i].songmid === payload.songmid) {
          state.player.playingSongIndex = i
          return
        }
      }
      // console.log(`这里执行了`);
      state.player.playlistArray.splice(state.player.playingSongIndex+1,0,payload)
      state.player.playingSongIndex += 1
    }
  },
  actions: {
  },
  modules: {
  }
})
