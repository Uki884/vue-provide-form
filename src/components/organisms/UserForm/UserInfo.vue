<template>
  <div class="user-info">
    <form-item label="名前">
      <InputText
        :inputItem="inputItems.name"
        scheme="required|hiragana"
        name="name"
        label="名前"
      />
    </form-item>
    <form-item label="名前(かな)">
      <InputText
        :inputItem="inputItems.nameKana"
        name="nameKana"
        label="名前(かな)"
        scheme="hiragana|required"
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
      inputItems
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
