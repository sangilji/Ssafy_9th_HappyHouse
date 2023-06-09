import Vue from "vue";
import VueRouter from "vue-router";
import HomeMainView from "../views/HomeMainView.vue";
import LoginView from "@/views/user/LoginView.vue";
import JoinView from "@/views/user/JoinView.vue";
import BoardView from "@/views/board/AppBoard.vue";
import BoardWriteView from "@/views/board/BoardWriteView.vue";
import BoardViewview from "@/views/board/BoardViewview.vue";
import mapView from "@/views/map/MapView.vue";
import MyPageView from "@/views/user/MyPageView.vue";
import findPasswordView from "@/views/user/findPasswordView.vue"
import store from "@/store";
import { swal } from "vue-swal";
Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    
    swal("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "login" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeMainView,
  },
  {
    path: "/",
    name: "main",
    component: HomeMainView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/findPassword",
    name: "findPassword",
    component: findPasswordView,
  },
  {
    path: "/join",
    name: "join",
    component: JoinView,
  },
  {
    path: "/mypage",
    name: "mypage",
    beforeEnter: onlyAuthUser,
    component: MyPageView,
  },
  {
    path: "/map",
    name: "map",
    component: mapView,
  },
  {
    path: "/boardlist",
    name: "boardlist",
    component: BoardView,
  },
  {
    path: "/boardwrite",
    name: "boardwrite",
    beforeEnter: onlyAuthUser,
    component: BoardWriteView,
  },
  {
    path: "/boardview/:announcementid",
    name: "boardview",
    // beforeEnter: onlyAuthUser,
    component: BoardViewview,
  },
  {
    path: "/boardupdate",
    name: "boardmodify",
    beforeEnter: onlyAuthUser,
    component: () => import(/* webpackChunkName: "board" */ "@/components/board/BoardModify"),
  },
  {
    path: "/boarddelete/:announcementid",
    name: "boarddelete",
    beforeEnter: onlyAuthUser,
    component: () => import(/* webpackChunkName: "board" */ "@/components/board/BoardDelete"),
  },
  {
    path: "/interests/:id",
    name: "interests",
    beforeEnter: onlyAuthUser,
    component: () => import(/* webpackChunkName: "board" */ "@/components/Heart"),
  },
  {
    path: "/createHouse",
    name: "createHouse",
    beforeEnter: onlyAuthUser,
    component: () => import(/* webpackChunkName: "board" */ "@/components/house/CreateHouse"),
  },
  {
    path: "/freeboardlist",
    name: "freeboardlist",
    component: () => import("@/components/board/freeboard/FreeBoardMain"),
  },
  {
    path: "/freeboardwrite",
    name: "freeboardwrite",
    beforeEnter: onlyAuthUser,
    component: () => import("@/components/board/freeboard/FreeBoardWrite"),
  },
  {
    path: "/freeboardview/:boardid",
    name: "freeboardview",
    // beforeEnter: onlyAuthUser,
    component: () => import("@/components/board/freeboard/FreeBoardView"),
  },
  {
    path: "/freeboardupdate",
    name: "freeboardmodify",
    beforeEnter: onlyAuthUser,
    component: () => import("@/components/board/freeboard/FreeBoardModify"),
  },
  {
    path: "/freeboarddelete/:announcementid",
    name: "freeboarddelete",
    beforeEnter: onlyAuthUser,
    component: () => import("@/components/board/freeboard/FreeBoardDelete"),
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
