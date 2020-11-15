<template>
  <div class="form-label">
    {{ label }}
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
.form-label {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  position: relative;
}
</style>
