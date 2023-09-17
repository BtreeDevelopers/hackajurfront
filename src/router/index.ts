import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Sign from "@/views/Sign.vue";
import Dashboard from "@/views/Dashboard.vue";
import Profile from "@/views/Profile.vue";
import Reader from "@/views/Reader.vue";
import { obterAccessToken } from "@/services/tokenService";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
    meta: {
      header: "login",
    },
  },
  {
    path: "/sign",
    component: Sign,
    meta: {
      header: "voltar",
    },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: {
      header: "user",
      auth: true,
    },
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      header: "user",
      auth: true,
    },
  },
  {
    path: "/reader",
    component: Reader,
    meta: {
      header: "login",
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const isAuth = !!obterAccessToken();
  if (to.meta.auth && !isAuth) {
    return next({
      path: "/sign",
    });
  }
  if (!to.meta.auth && isAuth && to.path !== "/reader") {
    return next({
      path: "/dashboard",
    });
  }
  return next();
});
