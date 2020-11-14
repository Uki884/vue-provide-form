<template>
  <input :value="value" @input="$emit('input', keyName, $event.target.value)" />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    value: String,
    keyName: String
  }
});
</script>

<style scoped lang="scss"></style>
