<template>
  <InputProvider
    :schema="schema"
    :name="name"
    :label="label"
    v-slot="{ errors, isValid }"
  >
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div>
      <div>validationMessage: {{ errors }}</div>
      <div>isValid: {{ isValid }}</div>
    </div>
  </InputProvider>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: [String, Number],
    schema: String,
    name: String,
    key: String,
    label: String
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
