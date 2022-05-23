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
