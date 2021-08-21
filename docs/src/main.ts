import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueProvideForm from "vue-provide-form";

createApp(App)
  .use(store)
  .use(router)
  .use(VueProvideForm)
  .mount("#app");
