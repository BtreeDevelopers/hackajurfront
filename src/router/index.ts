import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Sign from "@/views/Sign.vue";
import Dashboard from "@/views/Dashboard.vue";
import Profile from "@/views/Profile.vue";
import Reader from "@/views/Reader.vue";

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
    },
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      header: "user",
    },
  },
  {
    path: "/reader",
    component: Reader,
    meta: {
      header: "user",
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
