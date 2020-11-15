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

export default defineComponent({
  name: "Home",
  components: {
    FormContent
  },
  setup(props, context) {
    const state = reactive({
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

    const { inputs } = createComponentStore(state);
    provideComponentStore(UserFormKey, state);
    return {
      inputs
    };
  }
});
</script>
