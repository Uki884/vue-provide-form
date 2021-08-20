<template>
  <input :value="value" @input="$emit('update', $event.target.value)" />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  props: {
    value: [String, Number]
  }
});
</script>

<style scoped lang="scss">
input {
  outline: none;
  border: 1px solid #a1a6af;
  border-radius: 4px;
  width: 100%;
  padding: 8px;
}
</style>
