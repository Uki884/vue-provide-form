<template>
  <BaseInput
    :value="inputItem.value"
    @update="inputItem.setValue"
    @input="inputItem.validator.validate(scheme, $event.target.value)"
  />
  <div>
    <p>validationMessage</p>
    {{ inputItem.validator.isValid }}
    <p>isValid</p>
    {{ inputItem.validator.errorMsg }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import BaseInput from "@/components/atoms/BaseInput.vue";

export default defineComponent({
  components: {
    BaseInput
  },
  props: {
    inputItem: Object,
    scheme: String
  }
});
</script>

<style scoped lang="scss"></style>
