import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {
      name: '陌黎',
      qqNumber: `1929687026`,
      cookie: `RK=KsgsrPX+P+; ptcz=6c8aad457391bd3a5727849da3b8a9bc9f716e86dff2896a40c666ec2cdb12ba; pgv_pvid=4173302755; o_cookie=1929687026; pac_uid=1_1929687026; fqm_pvqid=97727705-6e79-4b66-919c-c721b50f2540; ts_uid=1749307612; ts_refer=cn.bing.com/; euin=oKEANKCF7inA7c**; tmeLoginType=2; fqm_sessionid=7978ae5c-5b13-4d09-874f-a68f26c91574; pgv_info=ssid=s583457484; _qpsvr_localtk=0.2541836596314624; ptui_loginuin=1929687026; ts_last=y.qq.com/n/ryqq/profile/like/song; login_type=1; psrf_qqrefresh_token=9677CB9F13A21B70B68161C654EDA6D6; psrf_musickey_createtime=1652014831; qm_keyst=Q_H_L_5uhElLDdQb4TkQQ7R4YnZz9cLSYpanj920GDwSNvXBJ02UU3WJzofqw; wxrefresh_token=; qm_keyst=Q_H_L_5uhElLDdQb4TkQQ7R4YnZz9cLSYpanj920GDwSNvXBJ02UU3WJzofqw; psrf_qqaccess_token=765AFACDB816D72CF8B5B94B510EFB91; uin=1929687026; wxunionid=; psrf_qqunionid=133D646103F7DFC2850D335A6FD129BF; qqmusic_key=Q_H_L_5uhElLDdQb4TkQQ7R4YnZz9cLSYpanj920GDwSNvXBJ02UU3WJzofqw; wxopenid=; psrf_qqopenid=A5A9172561051CF617E82D505D645FE4; psrf_access_token_expiresAt=1659790831`
    },
    // 用户创建的歌单
    userPlaylist: [],
  },
  mutations: {
    setUserPlaylist(state, payload) {
      state.userPlaylist = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
