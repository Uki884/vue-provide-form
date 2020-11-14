<template>
  <button @click="useSetValue('name', 'aaaaaa')">test</button>
  <button @click="directSet">直接変更は禁止</button>
  <InputText :inputItem="inputItems.name" :value="inputItems.name.value" />
  <InputText :inputItem="inputItems.nameKana" />
  <InputText :inputItem="inputItems.family_child_age_aa" />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useUserStore } from "@/views/User/userFormStore";
import InputText from "@/components/molecules/InputText.vue";

export default defineComponent({
  name: "FormContent",
  components: {
    InputText
  },
  setup(props, context) {
    const { inputs, useSetValue, useInput } = useUserStore();

    const directSet = () => {
      inputs.name = "aaaa";
    };

    const inputItems = useInput(inputs);
    console.log(inputItems);

    return {
      InputText,
      inputItems,
      inputs,
      useSetValue,
      directSet
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
