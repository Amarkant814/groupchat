import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/login.vue";
import Chats from "./components/chats.vue";
import Signup from "./components/signup.vue"
import store from "./store";

const routes = [
  {
    path: "/",
    component: Login,
    name: "login",
  },
  {
    path: "/chats",
    component: Chats,
    name: "chats",
  },
  {
    path: "/signup",
    component: Signup,
    name: "signup",
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  var isAuthenticated = store.getters.getLoggedIn;
  if (to.name !== 'login' && to.name !== 'signup' && !isAuthenticated){
    next({ name: 'login' })
    return
  }
  else if (isAuthenticated && (to.name === 'login' || to.name === 'signup') )
  {
    router.push({name: 'chats'});
    return
  }
  else if(to.path === '/signout'){
    sessionStorage.removeItem('atoken');
    window.location.reload()
  }
  next()
})
export default router;
