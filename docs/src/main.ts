import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueValiteForm from "vue-validate-form";

createApp(App)
  .use(store)
  .use(router)
  .use(vueValiteForm)
  .mount("#app");
