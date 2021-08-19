<template>
  <slot
    :value="value"
    :setValue="setValue"
    :errors="errors"
    :isValid="isValid"
  ></slot>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useForm } from "@/compositions/useForm";

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
    const { inputItems } = useForm();
    const item = inputItems[props.name];
    if (!item) {
      throw new Error(`${props.name} is invalid key`);
    }
    const validator = item.useValidator(props.label, props.scheme);

    const setValue = (event: Event) => {
      const targetValue = (event.target as HTMLInputElement).value;
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
