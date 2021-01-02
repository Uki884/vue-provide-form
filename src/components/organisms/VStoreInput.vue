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
import { defineComponent, computed, getCurrentInstance } from "vue";

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
    }
  },
  setup(props, { slots }) {
    const validator = props.inputItem.useValidator(props.name, props.scheme);

    const setValue = (event: any) => {
      const targetValue = event.target.value;
      props.inputItem.setValue(targetValue);
      validator.validate(targetValue);
    };

    const errors = computed(() => {
      return validator.errorMsg;
    });

    const isValid = computed(() => {
      return validator.isValid;
    });

    const value = computed(() => {
      return props.inputItem.value;
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
