<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <FormContent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { provideForm } from "vue-validate-form";
import FormContent from "@/components/FormContent.vue";

export default defineComponent({
  name: "Home",
  components: {
    FormContent
  },
  setup() {
    const state = {
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
        unemployed: false,
        type: "テスト",
        start: {
          year: null,
          month: null,
          day: null
        }
      }
    };
    provideForm({ defaultValues: state });
    return {};
  }
});
</script>
