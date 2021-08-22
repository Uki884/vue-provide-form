<template>
  <slot
    :value="value"
    :setValue="setValue"
    :errors="errors"
    :fieldValues="fieldValues"
    :isValid="isValid"
  />
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { useForm } from "@/compositions/useForm";
import { get } from "lodash";

export default defineComponent({
  inheritAttrs: false,
  name: "InputProvider",
  props: {
    inputItem: {
      type: Object,
      default: null
    },
    schema: {
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
    const { inputItems, inputs, fieldValues } = useForm();
    const item = inputItems.value[props.name];
    if (!item) {
      const keys = Object.keys(inputItems.value);
      throw new Error(`${props.name} is invalid key. available keys: ${keys}`);
    }

    const validator = item.useValidator(props.label, props.schema);

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

    watch(
      () => get(fieldValues, item.keyName),
      value => {
        validator.validate(value);
      },
      { deep: true }
    );

    return {
      fieldValues,
      setValue,
      value,
      errors,
      isValid
    };
  }
});
</script>

<style scoped lang="scss"></style>
