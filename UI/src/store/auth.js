import axiosWebApi from "../plugins/axios.js";
import Api from "@/constants/api";
import router from "@/router.js";


export default {
  state: {
    username: sessionStorage.getItem('atoken')?JSON.parse(atob(sessionStorage.getItem('atoken').split('.')[1])).name:"",
    user_role: sessionStorage.getItem('atoken')?JSON.parse(atob(sessionStorage.getItem('atoken').split('.')[1])).role:"",
    isLoggedIn: sessionStorage.getItem('atoken')?true:false,
  },
  getters: {
    getUserName: (state) => state.username,
    getUserRole: (state) => state.user_role,
    getLoggedIn: (state) => state.isLoggedIn,
  },
  mutations: {
    SET_USER(state, resp) {
      if(resp.token){
        state.username = JSON.parse(atob(resp.token.split('.')[1])).name
        state.user_role = JSON.parse(atob(resp.token.split('.')[1])).role
        sessionStorage.setItem('atoken',resp.token)
        state.isLoggedIn = true
        router.push({name:'chats'})
      }
    }
  },
  actions: {
    async loginApi({ commit }, payload) {
      const resp = await axiosWebApi.post(
        Api.auth.signin, payload, { isMock: false }
      );
      if (resp?.status == 200) {
        commit("SET_USER", resp.data);
      }
      return resp;
    },
    async signupApi({ commit }, payload){
        const resp = await axiosWebApi.post(
            Api.auth.signup, payload, { isMock: false}
        )
        if(resp?.status == 201){
            return resp
        }
    }
  },
};
