<template>
  <BaseInput
    :value="inputItem.value"
    @update="inputItem.setValue"
    @input="validator.validate($event.target.value)"
  />
  <div>
    <div class="error">
      <span>{{ validator.errorMsg[0] }}</span>
    </div>
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
    validator: Object
  }
});
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
