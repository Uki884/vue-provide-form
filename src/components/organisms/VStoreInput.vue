<template>
  <slot
    :inputValue="inputValue"
    :value="value"
    :setValue="setValue"
    :errors="errors"
    :isValid="isValid"
  ></slot>
</template>

<script lang="ts">
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
    const setValue = (event: any) => {
      const targetValue = event.target.value;
      props.inputItem.setValue(targetValue);
      props.inputItem.validator.validate(props.name, props.scheme, targetValue);
    };

    const inputValue = computed({
      set: (value: any) => setValue(value),
      get: () => props.inputItem.value
    });

    const errors = computed(() => {
      return props.inputItem.validator.errorMsg;
    });

    const isValid = computed(() => {
      return props.inputItem.validator.isValid;
    });

    const value = computed(() => {
      return props.inputItem.value;
    });

    return {
      setValue,
      inputValue,
      value,
      errors,
      isValid
    };
  }
});
</script>

<style scoped lang="scss"></style>
