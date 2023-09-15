import { createApp, markRaw } from "vue";
import App from "./App.vue";
import "@/assets/global.scss";
import { router } from "./router";
import { createPinia } from "pinia";
import { VueSignaturePad } from "vue-signature-pad";
import ClickOutside from "./directives/click-outside";
import ToastPlugin from "vue-toast-notification";

import "vue-toast-notification/dist/theme-default.css";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.$router = markRaw(router);
});
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.component("VueSignaturePad", VueSignaturePad);
app.directive("click-outside", ClickOutside);
app.use(ToastPlugin);
app.use(pinia);
app.use(router);
app.mount("#app");
