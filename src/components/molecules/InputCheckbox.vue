<template>
  <InputProvider
    :inputItem="inputItem"
    :scheme="scheme"
    :name="name"
    v-slot:default="{ value, setValue, errors, isValid }"
  >
    <input :value="value" @input="setValue" type="checkbox" />
    <div>
      <div>validationMessage: {{ errors }}</div>
      <div>isValid: {{ isValid }}</div>
    </div>
  </InputProvider>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import BaseInput from "@/components/atoms/BaseInput.vue";
import InputProvider from "@/components/InputProvider.vue";
export default defineComponent({
  components: {
    InputProvider
  },
  props: {
    inputItem: Object,
    scheme: String,
    name: String
  }
});
</script>

<style scoped lang="scss"></style>
