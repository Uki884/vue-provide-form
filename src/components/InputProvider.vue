<template>
  <slot
    :value="value"
    :errors="errors"
    :fieldValues="fieldValues"
    :isValid="isValid"
  />
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { useForm } from "@/libs/useForm";
import get from "just-safe-get";

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
    const { inputs, fieldValues, validators, inputKeys } = useForm<any>();
    const item = inputKeys.includes(props.name);

    if (!item) {
      const keys = inputKeys.join(", ");
      throw new Error(`${props.name} is invalid key. available keys: ${keys}`);
    }

    const validator = validators.createValidator(
      props.name,
      props.label,
      props.schema
    );

    const inputKey = computed(() => {
      return props.name.split(".");
    });

    const errors = computed(() => {
      return validator.errorMsg;
    });

    const isValid = computed(() => {
      return validator.isValid;
    });

    const value = computed(() => {
      return get(inputs, props.name);
    });

    const isArrayValue = computed(() => {
      return Array.isArray(fieldValues[inputKey.value[0]]);
    });

    //TODO: lodashのgetを使ったほうが良さそう
    watch(
      () =>
        get(fieldValues, isArrayValue.value ? inputKey.value[0] : props.name),
      value => {
        if (Array.isArray(value)) {
          const index = inputKey.value[1] as any;
          const target = inputKey.value[2];
          validator.validate(value[index][target]);
        } else {
          validator.validate(value);
        }
      },
      { deep: true }
    );

    return {
      fieldValues,
      value,
      errors,
      isValid
    };
  }
});
</script>

<style scoped lang="scss"></style>
