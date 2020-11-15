<template>
  <div class="home">
    {{ inputs }}
    <FormContent />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import FormContent from "@/components/organisms/UserForm/FormContent.vue";
import {
  provideComponentStore,
  createComponentStore
} from "@/compositions/componentStore";
import { UserFormKey } from "@/compositions/storeKeys";

interface State {
  name: string;
  nameKana: string;
  email: string;
  family: { child: { name: string; age: number } };
  job: {
    unemployed: boolean;
    type: string;
    start: { year: null | string; month: null | string; day: null | string };
  };
}

export default defineComponent({
  name: "Home",
  components: {
    FormContent
  },
  setup(props, context) {
    const state = reactive<State>({
      name: "",
      nameKana: "",
      email: "",
      family: {
        child: {
          name: "",
          age: 12
        }
      },
      job: {
        unemployed: true,
        type: "テスト",
        start: {
          year: null,
          month: null,
          day: null
        }
      }
    });

    const { inputs } = createComponentStore<State>(state);
    provideComponentStore<State>(UserFormKey, state);
    return {
      inputs
    };
  }
});
</script>
