import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {
      name: '『doki-doki』',
      qqNumber: `1929687026`,
      cookie: `RK=+llsvNXUZ8; ptcz=19fad43175b7253a5d54e9e0b7914d09b4993328a293df56e8ca7d799e847bec; pgv_pvid=2840085823; fqm_pvqid=082e0584-f4b9-4157-959c-6cfb8591636f; ts_uid=2636225856; ts_refer=cn.bing.com/; tmeLoginType=2; euin=oKEANKCF7inA7c**; fqm_sessionid=6b09e910-6bd2-49d7-950f-55bd2fd6ea72; pgv_info=ssid=s1683711811; ts_last=y.qq.com/; _qpsvr_localtk=0.21466587559206363; login_type=1; uin=1929687026; psrf_qqunionid=133D646103F7DFC2850D335A6FD129BF; qqmusic_key=Q_H_L_5c2wPRmKH3fMlMVKfUy1iJib6P1tRYxjeZSRxO09d6OXQH_qGcyai2w; qm_keyst=Q_H_L_5c2wPRmKH3fMlMVKfUy1iJib6P1tRYxjeZSRxO09d6OXQH_qGcyai2w; psrf_access_token_expiresAt=1660986459; psrf_qqopenid=A5A9172561051CF617E82D505D645FE4; psrf_musickey_createtime=1653210459; psrf_qqrefresh_token=9677CB9F13A21B70B68161C654EDA6D6; wxrefresh_token=; wxopenid=; psrf_qqaccess_token=765AFACDB816D72CF8B5B94B510EFB91; wxunionid=; qm_keyst=Q_H_L_5c2wPRmKH3fMlMVKfUy1iJib6P1tRYxjeZSRxO09d6OXQH_qGcyai2w`
    },
    // 用户创建的歌单
    userPlaylist: [],
    // 用于存储正在播放音乐的id等信息
    player: {
      // 正在播放歌曲的id
      songMid: "001TdxNo3kIOh5",
    }
  },
  mutations: {
    setUserPlaylist(state, payload) {
      state.userPlaylist = payload
    },
    setSongMid(state,payload) {
      state.player.songMid = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
