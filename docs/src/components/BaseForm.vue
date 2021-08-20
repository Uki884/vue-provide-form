<template>
  <div class="base-form">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({});
</script>

<style scoped lang="scss">
.base-form {
  width: 400px;
  margin: 0 auto;
}
</style>
