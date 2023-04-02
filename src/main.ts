import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mdi } from "vuetify/iconsets/mdi";
import { appUseHttp } from "@/plugins/http-common";
import { appUseAuth } from "@/plugins/auth";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);

appUseHttp(app);
appUseAuth(app);

app.use(vuetify).use(store).use(router).mount("#app");
