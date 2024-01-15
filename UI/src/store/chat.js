import axiosWebApi from "../plugins/axios.js";
import Api from "@/constants/api";

export default {
  state: {
    selectedChatId: 1,
    chats: [],
    users: [],
    groupInfo: {}
  },
  getters: {
    getChats: (state) => {
      const sortedChats = [...state.chats];
  
      sortedChats.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
  
      return sortedChats;
    },
    getAllUsers: (state) => state.users,
    getGroupInfo: (state) => state.groupInfo
  },
  mutations: {
    SET_ALL_USERS(state, resp) {
      state.users = resp.results;
    },
    SELECT_CHAT(state, chatId) {
      state.selectedChatId = chatId;
    },
    SET_ALL_CHATS(state, resp) {
      state.chats = resp.chats;
    },
    ADD_MESSAGE(state, { chatId, messages }) {
      const chat = state.chats.find((c) => c.id === chatId);
      if (chat) {
        chat.msgs.push(messages);
      }
    },
    ADD_CHAT(state, payload) {
      state.chats.push(payload);
    },
    SET_GROUP_INFO(state, payload){
      state.groupInfo = payload.groupData
    }
  },
  actions: {
    async fetchAllUsers({ commit }, payload) {
      const resp = await axiosWebApi.get(
        Api.chat.getAllUsers,
        {},
        { isMock: false }
      );
      if (resp.status == 200) {
        commit("SET_ALL_USERS", resp.data);
      }
      return resp;
    },
    async createGroup({ commit }, payload) {
      const resp = await axiosWebApi.post(
        Api.chat.createGroup,
        payload,
        { isMock: false }
      );
      return resp;
    },
    async getAllChats({ commit }, payload) {
      const resp = await axiosWebApi.get(
        Api.chat.getAllChats,
        {},
        { isMock: false }
      );
      if (resp.status == 200) {
        commit("SET_ALL_CHATS", resp.data);
      }
      return resp;
    },
    async AddChatInStore({ commit }, payload) {
      commit("ADD_CHAT", payload);
    },
    async AddChatLive({ commit }, payload) {
      commit("ADD_MESSAGE", payload);
    },
    async AddMessagesInStore({ commit }, payload) {
      commit("ADD_MESSAGE", payload);
      const resp = await axiosWebApi.post(
        Api.chat.sendChat,
        payload.api,
        { isMock: false }
      );
      return resp;
    },
    async fetchGroupUsers({ commit }, payload) {
      const resp = await axiosWebApi.post(
        Api.chat.groupInfo,
        payload,
        { isMock: false }
      );
      if(resp.status == 200){
        commit('SET_GROUP_INFO',resp.data)
      }
      return resp;
    },
    async addNewParticipant({ commit }, payload) {
      const resp = await axiosWebApi.post(
        Api.chat.newParticipant,
        payload,
        { isMock: false }
      );
      return resp;
    },
    async deleteUserFromGroup({ commit }, payload) {
      const resp = await axiosWebApi.post(
        Api.chat.deleteParticipant,
        payload,
        { isMock: false }
      );
      return resp;
    },
  },
};
