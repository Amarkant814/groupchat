import axiosWebApi from "../plugins/axios.js";
import Api from "@/constants/api";

export default {
  state: {
    selectedChatId: 1,
    chats: [],
    users: [],
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
    getAllUsers: (state) => state.users
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
        chat.messages.push(messages);
      }
    },
    ADD_CHAT(state, payload) {
      state.chats.push(payload);
    },
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
      const resp = await axiosWebApi.post(
        Api.messageBoard.getAllChats,
        {},
        { isMock: true }
      );
      if (resp.status == 200) {
        commit("SET_ALL_CHATS", resp.data);
      }
      return resp;
    },
    async AddChatInStore({ commit }, payload) {
      commit("ADD_CHAT", payload);
    },
    async AddMessagesInStore({ commit }, payload) {
      commit("ADD_MESSAGE", payload);
    },
  },
};
