import { App } from "vue";
import InputProvider from "./components/InputProvider.vue";
export * from "./libs/useForm";

const install: any = (vue: App) => {
  vue.component(InputProvider.name, InputProvider);
};

export default { install };
export { InputProvider };
