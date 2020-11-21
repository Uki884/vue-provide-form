<template>
  <div class="user-info">
    <form-item label="名前">
      <InputText
        :inputItem="inputItems.name"
        :validator="createValidator('名前', 'hiragana|required')"
      />
    </form-item>
    <form-item label="名前(かな)">
      <InputText
        :inputItem="inputItems.nameKana"
        :validator="createValidator('名前(かな)', 'hiragana|required')"
      />
    </form-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useComponentStore } from "@/compositions/componentStore";
import { UserFormKey } from "@/compositions/storeKeys";
import InputText from "@/components/molecules/InputText.vue";
import FormItem from "@/components/atoms/FormItem.vue";
import { createValidator } from "@/compositions/validator.ts";

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
    const { inputs, useSetValue, useInputs } = useComponentStore(UserFormKey);
    const inputItems = useInputs(inputs);
    return {
      inputItems,
      createValidator
    };
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
