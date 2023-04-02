import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/LoginView.vue";
import GeneralView from "@/views/GeneralView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: HomeView,
    meta: {
      auth: false,
    },
  },
  {
    path: "/",
    name: "general",
    component: GeneralView,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
