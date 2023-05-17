import Vue from "vue";
import VueRouter from "vue-router";
import HomeMainView from "../views/HomeMainView.vue";
import LoginView from "@/views/user/LoginView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeMainView,
  },
  {
    path:"",
    name: "main",
    component: HomeMainView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;