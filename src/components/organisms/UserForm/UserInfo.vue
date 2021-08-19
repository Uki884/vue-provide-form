<template>
  <div class="user-info">
    <form-item label="名前">
      <InputText scheme="required|hiragana" name="name" label="名前" />
    </form-item>
    <form-item label="名前(かな)">
      <InputText
        name="nameKana"
        label="名前(かな)"
        scheme="hiragana|required"
      />
    </form-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import InputText from "@/components/molecules/InputText.vue";
import FormItem from "@/components/atoms/FormItem.vue";

export default defineComponent({
  components: {
    FormItem,
    InputText
  },
  props: {
    label: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
    return {};
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
