<template>
  <VStoreInput
    :inputItem="inputItem"
    :scheme="scheme"
    :name="name"
    v-slot:default="{ value, setValue, errors, isValid }"
  >
    <BaseInput :value="value" @input="setValue" />
    <div>
      <div>validationMessage: {{ errors }}</div>
      <div>isValid: {{ isValid }}</div>
    </div>
  </VStoreInput>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import BaseInput from "@/components/atoms/BaseInput.vue";
import VStoreInput from "@/components/organisms/VStoreInput.vue";
export default defineComponent({
  components: {
    BaseInput,
    VStoreInput
  },
  props: {
    inputItem: Object,
    scheme: String,
    name: String
  }
});
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
