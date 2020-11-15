<template>
  <base-form>
    <form-item>
      <button @click="directSetValue">stateの直接変更はできない</button>
    </form-item>
    <user-info />
    <form-item label="子供の名前">
      <InputText :inputItem="inputItems.family_child_name" />
    </form-item>
    <form-item label="子供の年齢">
      <InputText :inputItem="inputItems.family_child_age" />
    </form-item>
    <form-item label="仕事開始年">
      <InputText :inputItem="inputItems.job_start_year" />
    </form-item>
    <form-item label="仕事開始月">
      <InputText :inputItem="inputItems.job_start_month" />
    </form-item>
    <form-item label="技能者">
      <input
        :value="inputItems.job_unemployed.value"
        @input="
          inputItems.job_unemployed.setValue(
            inputItems.job_unemployed.keyName,
            $event.target.checked
          )
        "
        type="checkbox"
      />
    </form-item>
  </base-form>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useComponentStore } from "@/compositions/componentStore";
import InputText from "@/components/molecules/InputText.vue";
import BaseForm from "@/components/atoms/BaseForm.vue";
import FormItem from "@/components/atoms/FormItem.vue";
import UserInfo from "@/components/organisms/UserForm/UserInfo.vue";
import { UserFormKey } from "@/compositions/storeKeys";

export default defineComponent({
  name: "FormContent",
  components: {
    BaseForm,
    FormItem,
    InputText,
    UserInfo
  },
  setup(props, context) {
    const { inputs, useSetValue, useInputs } = useComponentStore(UserFormKey);

    const directSetValue = () => {
      inputs.name = "aaaa";
    };

    const inputItems = useInputs(inputs);
    console.log(inputItems);

    return {
      inputItems,
      inputs,
      useSetValue,
      directSetValue
    };
  }
});
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
