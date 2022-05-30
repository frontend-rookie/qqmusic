import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {
      name: '『doki-doki』',
      qqNumber: `1929687026`,
      cookie: `pgv_pvid=9288439776; fqm_pvqid=28cb88b3-28a3-449c-b841-d032251037ec; ts_uid=9668736836; RK=8llk7NXkZ8; ptcz=88ee5a96e5097547c225d3f31e9ac68771304090952142a395477dab910d7762; euin=oKEANKCF7inA7c**; tmeLoginType=2; fqm_sessionid=3369a463-c144-4244-a316-44b5347e3db7; pgv_info=ssid=s7386739179; ts_last=y.qq.com/; _qpsvr_localtk=0.4708198834283843; login_type=1; wxunionid=; qqmusic_key=Q_H_L_5pqz2Ysg7Ablj8AHbzebUKj54B1Ff-49mybwu9e0SP93VkmoCkCTrJg; psrf_qqaccess_token=765AFACDB816D72CF8B5B94B510EFB91; psrf_musickey_createtime=1653832500; psrf_qqunionid=133D646103F7DFC2850D335A6FD129BF; wxopenid=; wxrefresh_token=; psrf_qqrefresh_token=9677CB9F13A21B70B68161C654EDA6D6; uin=1929687026; psrf_access_token_expiresAt=1661608500; qm_keyst=Q_H_L_5pqz2Ysg7Ablj8AHbzebUKj54B1Ff-49mybwu9e0SP93VkmoCkCTrJg; qm_keyst=Q_H_L_5pqz2Ysg7Ablj8AHbzebUKj54B1Ff-49mybwu9e0SP93VkmoCkCTrJg; psrf_qqopenid=A5A9172561051CF617E82D505D645FE4`
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
      // 当前处于播放队列的歌单tid, 0表示没有选中歌单
      playlistTid: 0,
      // 播放队列中的歌曲数目
      songTotalNum: 1,
    },
    lyric: {
      // 当前播放的时间
      currentTime: 0,
      // 有翻译的时候，用户选择是否显示翻译
      isUserShowTrans: true
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
      state.player.playlistArray = payload[0]
      state.player.playlistTid = payload[1]
      state.player.playingSongIndex = 0;
      state.player.songTotalNum = payload[0].length;
      state.player.songMid = state.player.playlistArray[0].songmid
    },
    /**
     * 往播放队列中添加歌曲
     * */
    addSongToPlayList(state,payload):void {
      /**
       * 这里踩的坑：forEach里面的return不能跳出forEach循序
       * */
      for(let i = 0; i < state.player.playlistArray.length; i++) {
        if(state.player.playlistArray[i].songmid === payload.songmid) {
          state.player.playingSongIndex = i
          return
        }
      }
      // console.log(`这里执行了`);
      state.player.playlistArray.splice(state.player.playingSongIndex+1,0,payload)
      state.player.playingSongIndex += 1
      state.player.songTotalNum += 1
    },
    /**
     * 删除单个歌曲
     * */
    deleteSongFromPlayList(state,payload:number):void {
      // 至少要保留一首歌曲
      if(state.player.playlistArray.length === 1) return
      state.player.songTotalNum -= 1
      // state.player.playingSongIndex -= 1
      state.player.playlistArray.splice(payload,1)
      if(payload === state.player.playingSongIndex) {
        // 如果删除的是正在播放的歌曲，则播放下一首
        if(payload === state.player.playlistArray.length) {
          state.player.playingSongIndex = 0
          payload = 0
        }
        state.player.songMid = state.player.playlistArray[payload].songmid
      }else if(payload < state.player.playingSongIndex) {
        // 如果删除的是正在播放的上面的歌曲，需要将正在播放的index-1
        state.player.playingSongIndex -= 1
      }
    },
    /**
     * 更改播放时间
     * */
    setCurrentTime(state,payload:number):void {
      state.lyric.currentTime = payload
    },
    /**
     * 更改用户是否显示翻译
     * */
    setUserShowTrans(state,payload:boolean):void {
      state.lyric.isUserShowTrans = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
