<template>
  <BaseForm>
    {{ inputs }}
    <form-item>
      <button @click="directSetValue">stateの直接変更はできない</button>
    </form-item>
    <FormItem label="email">
      <InputText scheme="mail|required" name="email" label="メールアドレス" />
    </FormItem>
    <FormItem label="子供の名前">
      <InputText
        name="family.child.name"
        label="子供の名前"
        scheme="hiragana|required"
      />
    </FormItem>
    <FormItem label="子供の年齢">
      <InputText name="family.child.age" scheme="number" label="子供の年齢" />
    </FormItem>
    <FormItem label="仕事開始年">
      <InputText
        name="job.start.year"
        scheme="number|required"
        label="仕事開始年"
      />
    </FormItem>
    <FormItem label="仕事開始月">
      <InputText scheme="required" name="job.start.month" label="仕事開始月" />
    </FormItem>
    <!-- <form-item label="技能者">
      <InputCheckbox scheme="required" name="job.unemployed" label="仕事終了" />
    </form-item> -->
    <button @click="handleSubmit(submit)">送信</button>
  </BaseForm>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useForm } from "vue-provide-form";
import InputText from "@/components/InputText.vue";
import BaseForm from "@/components/BaseForm.vue";
import FormItem from "@/components/FormItem.vue";
// import InputCheckbox from "@/components/molecules/InputCheckbox.vue";
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
    InputText
  },
  setup(props, context) {
    const { inputs, handleSubmit, fieldValues } = useForm<State>();
    const directSetValue = () => {
      inputs.name = "aaaa";
    };
    const submit = (data: State) => {
      console.log(data);
    };
    return {
      directSetValue,
      submit,
      handleSubmit,
      inputs
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
