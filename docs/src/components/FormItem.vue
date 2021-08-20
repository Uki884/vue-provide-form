<template>
  <div class="form-item">
    {{ label }}
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    label: {
      type: String,
      default: ""
    }
  }
});
</script>

<style scoped lang="scss">
.form-item {
  margin: 0 auto;
  margin-bottom: 24px;
}
</style>
