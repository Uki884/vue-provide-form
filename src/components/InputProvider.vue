<template>
  <slot
    :value="value"
    :setValue="setValue"
    :errors="errors"
    :isValid="isValid"
  ></slot>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { useForm } from "@/compositions/useForm";
import { get } from "lodash";

export default defineComponent({
  name: "InputProvider",
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
    const { inputItems, inputs } = useForm();
    const item = inputItems.value[props.name];
    if (!item) {
      const keys = Object.keys(inputItems.value);
      throw new Error(`${props.name} is invalid key. available keys: ${keys}`);
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
      return get(inputs, item.keyName);
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
