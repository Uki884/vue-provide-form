# VueProvideForm

## Installation

```
// with npm
npm install vue-provide-form

// with yarn
yarn add vue-provide-form
```


## Usage

Import Vue and VueValidateForm in your code:

```js
import { createApp } from "vue";
import VueProvideForm from "vue-provide-form";

createApp(App)
  .use(VueProvideForm)
  .mount("#app");
```
※ Vue 2 not supported yet

provide state to Form in the top level components  
※ Array not supported yet

```js
import { provideForm } from "vue-provide-form";
  const state = {
    name: "",
    nameKana: "",
    email: "",
    family: {
      child: {
        name: "",
        age: 12
      }
    },
  };
provideForm({ defaultValues: state });
```

to using form state, inject in the children components

```js
import { defineComponent, computed } from "vue";
import { useForm } from "vue-provide-form";

export default defineComponent({
  name: "FormContent",
  components: {
    BaseForm,
    FormItem,
    InputText,
  },
  setup(props, context) {
    const { inputs, validate } = useForm<State>();
    return {
      submit,
      inputs
    };
  }
});
```

Wrap your inputs with the ``InputProvider``  
※ v-model is not supported yet

```js
<InputProvider
  scheme="required"
  name="family.child.age"
  label="label"
  v-slot:default="{ value, setValue, errors, isValid }"
>
  <input :value="value" @input="setValue" />
  <div>
    <div>validationMessage: {{ errors }}</div>
    <div>isValid: {{ isValid }}</div>
  </div>
</InputProvider>
```

Submit form

```js
import { useForm } from "vue-provide-form";
setup(props, context) {
  const { inputs, validate } = useForm<State>();

  const handleSubmit = () => {
    const isValid = validate();
    console.log(isValid);
  };

  return {
    handleSubmit,
    inputs
  };
}

```


# Next

- support Array
- support custom validate schema
- support v-model

