import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/global.scss";
import { router } from "./router";
import { createPinia } from "pinia";
import { VueSignaturePad } from 'vue-signature-pad';
import ClickOutside from "./directives/click-outside";
const pinia = createPinia();

const app = createApp(App);
app.component("VueSignaturePad", VueSignaturePad);
app.directive('click-outside',ClickOutside)
app.use(pinia);
app.use(router);
app.mount("#app");
