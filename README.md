# vue3-component-store

コンポーネント単位のstoreを作成する。
atomic designで辛いpropsバケツリレーを解消したかった。


## 使い方
1.storeを作りたいルートコンポーネントでstateを定義する。nestされたオブジェクトでもOK

```js
    const state = reactive({
      name: "",
      nameKana: "",
      email: "",
      family: {
        child: {
          name: "",
          age: 12
        }
      },
      job: {
        type: "",
        start: {
          year: null,
          month: null,
          day: null
        }
      }
    });
```

2.ストアのキーを定義して、ルートコンポーネントでprovideする。
provideした配下のコンポーネントでinjectする事でstateが利用できる。

src/compositions/storeKeys.ts
```js
import { InjectionKey } from "vue";
import { Store } from '@/compositions/componentStore'

export const UserFormKey: InjectionKey<Store> = Symbol("UserForm");
```

```js

import { provideComponentStore } from '@/compositions/componentStore'
import { UserFormKey } from '@/compositions/storeKeys'

  setup(props, context) {
    const state = reactive({
      name: "",
      nameKana: "",
      email: "",
      family: {
        child: {
          name: "",
          age: 12
        }
      },
      job: {
        type: "テスト",
        start: {
          year: null,
          month: null,
          day: null
        }
      }
    });
    provideComponentStore(UserFormKey, state);
    return {
      state
    };
  }

```

3.使いたいコンポーネントでuseComponentStoreを使用して親コンポーネントのstateを使用できる

```js
import { useComponentStore } from '@/compositions/componentStore';
import { UserFormKey } from '@/compositions/storeKeys'

  setup(props, context) {
    const { inputs, useSetValue, inputItems } = useComponentStore(UserFormKey);
    return {
      inputItems,
    };
  }

```

ネストされたオブジェクトの場合、useInputsで生成されるobjectは以下のようになる。


```js
    const state = reactive({
      family: {
        child: {
          name: "",
          age: 12
        }
      },
    });

const inputItems = {
    family_child_name: { keyName: "family.child.name", value: "", setValue: Function},
    family_child_age: { keyName: "family.child.age", value: "", setValue: Function}
    }
```

4.template内で使う

値の更新はオブジェクトに定義されているsetValueメソッドを使って行う。

setValueメソッドの引数に変更したいvalueを渡すことでコンポーネントストア全体の指定のキーのstateが変更できる
ここはlodashのsetメソッドを使ってる

※v-modelに対応していないので、今後対応する

```js
    <form-item label="子供の名前">
      <InputText :inputItem="inputItems.family_child_name" />
    </form-item>

    // checkboxの場合
      <input
        :value="inputItems.job_unemployed.value"
        @input="inputItems.job_unemployed.setValue($event.target.checked)"
        type="checkbox"
      />
```

## 今後
- 配列系がまだ未対応


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

