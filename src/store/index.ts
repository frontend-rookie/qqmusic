import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {
      name: '陌黎',
      qqNumber: `1929687026`,
      cookie: `RK=+llsvNXUZ8; ptcz=19fad43175b7253a5d54e9e0b7914d09b4993328a293df56e8ca7d799e847bec; pgv_pvid=2840085823; fqm_pvqid=082e0584-f4b9-4157-959c-6cfb8591636f; ts_uid=2636225856; ts_refer=cn.bing.com/; fqm_sessionid=cf87eb46-6b88-46c4-8b36-c99c6074c859; pgv_info=ssid=s6867951260; ts_last=y.qq.com/; _qpsvr_localtk=0.1473183897789636; login_type=1; qm_keyst=Q_H_L_5CERcD9qtxsuaho4nXAD0djnqrk_Dp5lslx-_jYy_ZuFE0PkN018oug; tmeLoginType=2; wxunionid=; euin=oKEANKCF7inA7c**; qqmusic_key=Q_H_L_5CERcD9qtxsuaho4nXAD0djnqrk_Dp5lslx-_jYy_ZuFE0PkN018oug; psrf_qqopenid=A5A9172561051CF617E82D505D645FE4; wxopenid=; psrf_musickey_createtime=1652965754; qm_keyst=Q_H_L_5CERcD9qtxsuaho4nXAD0djnqrk_Dp5lslx-_jYy_ZuFE0PkN018oug; wxrefresh_token=; psrf_access_token_expiresAt=1660741754; psrf_qqaccess_token=765AFACDB816D72CF8B5B94B510EFB91; uin=1929687026; psrf_qqrefresh_token=9677CB9F13A21B70B68161C654EDA6D6; psrf_qqunionid=133D646103F7DFC2850D335A6FD129BF`
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
