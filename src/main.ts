import { createApp, markRaw } from "vue";
import App from "./App.vue";
import "@/assets/global.scss";
import { router } from "./router";
import { createPinia } from "pinia";
import { VueSignaturePad } from "vue-signature-pad";
import ClickOutside from "./directives/click-outside";
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.$router = markRaw(router);
});
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.component("VueSignaturePad", VueSignaturePad);
app.directive("click-outside", ClickOutside);
app.use(Toast, {
  timeout: 5000,
  icon: false,
});
app.use(pinia);
app.use(router);
app.mount("#app");
