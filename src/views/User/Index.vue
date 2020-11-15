<template>
  <div class="home">
    {{ inputs }}
    <FormContent />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import FormContent from "@/components/organisms/UserForm/FormContent.vue"; // @ is an alias to /src
import { provideStore, useUserForm } from "@/views/User/userFormStore.ts";

export default defineComponent({
  name: "Home",
  components: {
    FormContent
  },
  setup(props, context) {
    const input = reactive({
      name: "",
      nameKana: "",
      email: "",
      family: {
        child: {
          name: "",
          age: {
            type: 11,
            aa: 22
          }
        }
      },
      job: {
        type: "テスト",
        interval: {
          year: 2020,
          month: 1
        }
      }
    });

    const { inputs } = useUserForm(input);
    provideStore(input);
    return {
      inputs
    };
  }
});
</script>
