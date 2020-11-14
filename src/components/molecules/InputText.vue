<template>
  <BaseInput
    :keyName="inputItem.keyName"
    :value="inputItem.value"
    @input="inputItem.setValue"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import BaseInput from "@/components/atoms/BaseInput.vue";

export default defineComponent({
  components: {
    BaseInput
  },
  props: {
    inputItem: Object
  }
});
</script>

<style scoped lang="scss"></style>
