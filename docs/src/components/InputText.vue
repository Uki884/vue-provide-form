<template>
  <InputProvider
    :scheme="scheme"
    :name="name"
    :label="label"
    v-slot:default="{ value, setValue, errors, isValid }"
  >
    <input :value="value" @input="setValue" />
    <div>
      {{ value }}
      <div>validationMessage: {{ errors }}</div>
      <div>isValid: {{ isValid }}</div>
    </div>
  </InputProvider>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
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
input {
  outline: none;
  border: 1px solid #a1a6af;
  border-radius: 4px;
  width: 100%;
  padding: 8px;
}
</style>
