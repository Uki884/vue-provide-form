<template>
  <div class="form-item">
    <form-label :label="label" />
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import FormLabel from "@/components/atoms/FormLabel.vue";

export default defineComponent({
  components: {
    FormLabel
  },
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
