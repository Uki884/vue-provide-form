<template>
  <slot
    :value="value"
    :setValue="setValue"
    :errors="errors"
    :isValid="isValid"
  ></slot>
</template>

<script lang="ts">
import { Validator } from "@/compositions/validator";
import { set } from "lodash";
import { defineComponent, computed, getCurrentInstance, ref } from "vue";
import { useComponentStore } from "@/compositions/componentStore";
import { UserFormKey } from "@/compositions/storeKeys";

export default defineComponent({
  props: {
    inputItem: {
      type: Object,
      default: null
    },
    scheme: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    }
  },
  setup(props, { slots }) {
    const { inputItems } = useComponentStore(UserFormKey);
    const item = inputItems[props.name];
    const validator = item.useValidator(props.label, props.scheme);

    const setValue = (event: any) => {
      const targetValue = event.target.value;
      item.setValue(targetValue);
      validator.validate(targetValue);
    };

    const errors = computed(() => {
      return validator.errorMsg;
    });

    const isValid = computed(() => {
      return validator.isValid;
    });

    const value = computed(() => {
      return item.value;
    });

    return {
      setValue,
      value,
      errors,
      isValid
    };
  }
});
</script>

<style scoped lang="scss"></style>
