<template>
  <base-form>
    <form-item>
      <button @click="directSetValue">stateの直接変更はできない</button>
    </form-item>
    <user-info />
    <form-item label="email">
      <InputText
        :inputItem="inputItems.email"
        :validator="
          inputItems.email.initValidator('メールアドレス', 'mail|required')
        "
      />
    </form-item>
    <form-item label="子供の名前">
      <InputText
        :inputItem="inputItems.family_child_name"
        :validator="
          inputItems.family_child_name.initValidator(
            '子供の名前',
            'hiragana|required'
          )
        "
      />
    </form-item>
    <form-item label="子供の年齢">
      <InputText
        :inputItem="inputItems.family_child_age"
        :validator="
          inputItems.family_child_age.initValidator(
            '子供の年齢',
            'hiragana|required'
          )
        "
      />
    </form-item>
    <form-item label="仕事開始年">
      <InputText
        :inputItem="inputItems.job_start_year"
        :validator="
          inputItems.job_start_year.initValidator(
            '仕事開始年',
            'number|required'
          )
        "
      />
    </form-item>
    <form-item label="仕事開始月">
      <InputText
        :inputItem="inputItems.job_start_month"
        :validator="
          inputItems.job_start_year.initValidator(
            '仕事開始月',
            'number|required'
          )
        "
      />
    </form-item>
    <form-item label="技能者">
      <input
        :value="inputItems.job_unemployed.value"
        @input="inputItems.job_unemployed.setValue($event.target.checked)"
        @change="jobUnemployedValidator.validate($event.target.checked)"
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

interface State {
  name: string;
  nameKana: string;
  email: string;
  family: { child: { name: string; age: number } };
  job: {
    unemployed: boolean;
    type: string;
    start: { year: null | string; month: null | string; day: null | string };
  };
}

export default defineComponent({
  name: "FormContent",
  components: {
    BaseForm,
    FormItem,
    InputText,
    UserInfo
  },
  setup(props, context) {
    const { inputs, useSetValue, useInputs, inputItems } = useComponentStore<
      State
    >(UserFormKey);
    console.log(inputItems);

    const directSetValue = () => {
      inputs.name = "aaaa";
    };

    const jobUnemployedValidator = inputItems.job_start_year.initValidator(
      "技能者",
      "required"
    );
    return {
      inputItems,
      useSetValue,
      directSetValue,
      jobUnemployedValidator
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
