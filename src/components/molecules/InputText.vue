<template>
  <BaseInput
    :value="inputItem.value"
    @update="inputItem.setValue"
    @input="validator ? validator.validate($event.target.value) : null"
  />
  <div>
    <div v-if="validator" class="error">
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
