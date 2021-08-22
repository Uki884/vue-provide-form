# VueProvideForm

## Installation

```
// with npm
npm install vue-provide-form

// with yarn
yarn add vue-provide-form
```
## Usage
### Import Vue and VueProvideForm in your code:

```js
import { createApp } from "vue";
import VueProvideForm from "vue-provide-form";

createApp(App)
  .use(VueProvideForm)
  .mount("#app");
```
※ Vue 2 not supported yet

### Provide state to Form in the top level components  
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

### To using form state, inject in the children components

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

### Wrap your inputs with the ``InputProvider``  

use v-model

```js
<InputProvider
  schema="required"
  name="family.child.age"
  label="label"
  v-slot:default="{ errors, isValid }"
>
  <input v-model="fieldValues.family.child.age" />
  <div>
    <div>validationMessage: {{ errors }}</div>
    <div>isValid: {{ isValid }}</div>
  </div>
</InputProvider>
import { useForm } from "vue-provide-form";

export default defineComponent({
  setup() {
    const { fieldValues } = useForm<State>();
    return {
      fieldValues,
    };
  }
});
```

manually set value

```js
<InputProvider
  schema="required"
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

### Submit form

If there is a validation error, the callback function will not be executed

```js
<template>
  <button @click="handleSubmit(handleSave)" />
</template>

import { useForm } from "vue-provide-form";
setup(props, context) {
  const { inputs, handleSubmit, fieldValues } = useForm<State>();

  const handleSave = (data: State) => {
    console.log(data);
  };

  return {
    handleSubmit,
    handleSave
  };
}

```

# Next

- support Array
- support custom validate schema
- add options(immediately validation etc... )

