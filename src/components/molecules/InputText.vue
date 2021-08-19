<template>
  <InputProvider
    :scheme="scheme"
    :name="name"
    :label="label"
    v-slot:default="{ value, setValue, errors, isValid }"
  >
    <BaseInput :value="value" @input="setValue" />
    <div>
      <div>validationMessage: {{ errors }}</div>
      <div>isValid: {{ isValid }}</div>
    </div>
  </InputProvider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseInput from "@/components/atoms/BaseInput.vue";
import InputProvider from "@/components/InputProvider.vue";

export default defineComponent({
  components: {
    BaseInput,
    InputProvider
  },
  props: {
    scheme: String,
    name: String,
    key: String,
    label: String
  },
  setup(props, context) {
    return {};
  }
});
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
