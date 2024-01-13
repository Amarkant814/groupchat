import { createStore} from "vuex";
import Chat from "./chat.js"
import Auth from "./auth.js"

const store = new createStore({
  modules: {
    Chat,
    Auth
  },
});

export default store;