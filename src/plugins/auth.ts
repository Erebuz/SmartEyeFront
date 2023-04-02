import { createAuth } from "@websanova/vue-auth";
import driverHttpAxios from "@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js";
import driverRouterVueRouter from "@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js";
import authDriver from "@/plugins/authDriver";

import http from "@/plugins/http-common";
import router from "@/router";
import { App } from "vue";
import { logout } from "@/plugins/utils/auth";

export interface UserInterface {
  id: string;
  username: string;
  password?: string;
}

const auth = createAuth({
  plugins: {
    http: http,
    router: router,
  },
  drivers: {
    http: driverHttpAxios,
    auth: authDriver,
    router: driverRouterVueRouter,
  },
  options: {
    rolesKey: "role",
    tokenDefaultKey: "access_token",
    stores: ["storage"],
    notFoundRedirect: { path: "/" },
    forbiddenRedirect: { path: "/" },
    logoutData: { redirect: "/login", forceRedirect: false },
    loginData: {
      url: "/auth",
      method: "POST",
      timeout: 5000,
    },
    fetchData: { url: "/auth/me", method: "GET", enabled: true, timeout: 2000 },
    refreshData: {
      url: "/auth/refresh",
      method: "POST",
      interval: 20,
      enabled: true,
      timeout: 2000,
    },
    makeRequest: true,
    parseUserData: (req: { me: UserInterface }) => {
      if (req.me === null) {
        logout();
      }
      return req.me;
    },
  },
});

export function appUseAuth(app: App<Element>) {
  app.use(auth);

  app.config.globalProperties.$auth = auth;
}

export default auth;