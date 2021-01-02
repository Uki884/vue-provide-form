<template>
  <base-form>
    <form-item>
      <button @click="directSetValue">stateの直接変更はできない</button>
    </form-item>
    <user-info />
    <form-item label="email">
      <InputText
        :inputItem="inputItems.email"
        scheme="mail|required"
        name="メールアドレス"
      />
    </form-item>
    <form-item label="子供の名前">
      <InputText
        :inputItem="inputItems.family_child_name"
        name="子供の名前"
        scheme="hiragana|required"
      />
    </form-item>
    <form-item label="子供の年齢">
      <InputText :inputItem="inputItems.family_child_age" name="子供の年齢" />
    </form-item>
    <form-item label="仕事開始年">
      <InputText
        :inputItem="inputItems.job_start_year"
        name="仕事開始年"
        scheme="number|required"
      />
    </form-item>
    <form-item label="仕事開始月">
      <InputText
        :inputItem="inputItems.job_start_month"
        scheme="required"
        name="仕事開始月"
      />
    </form-item>
    <form-item label="技能者">
      <InputCheckbox
        :inputItem="inputItems.job_unemployed"
        scheme="required"
        name="仕事開始月"
      />
    </form-item>
    <button @click="submit">送信</button>
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
import InputCheckbox from "@/components/molecules/InputCheckbox.vue";

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
    UserInfo,
    InputCheckbox
  },
  setup(props, context) {
    const {
      inputs,
      useSetValue,
      useInputs,
      inputItems,
      useValidators
    } = useComponentStore<State>(UserFormKey);
    const directSetValue = () => {
      inputs.name = "aaaa";
    };

    const submit = () => {
      const result = useValidators.handleSubmit(inputs);
      console.log(result);
    };

    const jobUnemployed = inputItems.job_unemployed.useValidator(
      "技能者",
      "required"
    );

    return {
      inputItems,
      useSetValue,
      directSetValue,
      jobUnemployed,
      submit
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
