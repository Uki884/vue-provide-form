<template>
  <div class="home">
    <FormContent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { provideForm } from "vue-provide-form";
import FormContent from "@/components/FormContent.vue";

export default defineComponent({
  name: "Home",
  components: {
    FormContent
  },
  setup() {
    const state = {
      array: [
        { test: "aa", test2: "bb", test3: true },
        { test: "cc", test2: "bb", test3: false }
      ],
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
