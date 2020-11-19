import { InjectionKey, inject, provide, readonly, ref, Ref } from "vue";

import { set } from "lodash";

const ValidateSchema = {
  Number: {
    schema: /^[0-9]*$/,
    errorMessage: "数字で入力してください"
  },
  NumberHyphen: {
    // eslint-disable-next-line no-useless-escape
    schema: /^[0-9\-]+$/,
    errorMessage: "数字とハイフン以外が入力されています"
  },
  Hiragana: {
    schema: /^[ぁ-んー]+$/,
    errorMessage: "ひらがなで入力してください"
  },
  Mail: {
    // eslint-disable-next-line no-useless-escape
    schema: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    errorMessage: "正しい形式で入力してください"
  }
} as any;

interface CreateComponentStore<T> {
  inputs: T;
  useSetValue: (key: string, payload: any) => void;
  useInputs: (inputs: T) => any;
  inputItems: any;
}

const recursiveObject = (objects: any, name: string) => {
  const items = objects;
  if (typeof items !== "object") return;
  const result = {} as any;
  const recursive = (objects: any, name: string): any => {
    if (typeof objects !== "object" || !objects) {
      const reName = name.split(".").join("_");
      result[reName] = {
        keyName: name,
        value: objects,
        validationMessage: "",
        isValid: true
      };
      return result;
    } else if (typeof objects === "object") {
      for (const object in objects) {
        recursive(objects[object], name + "." + object);
      }
      return result;
    }
  };

  return recursive(items, name);
};

const createSetValue = (key: string, func: Function) => {
  const setValue = (payload: any) => {
    return func(key, payload);
  };
  return setValue;
};

class Validator {
  scheme: Ref<string>;
  validationMessage: Ref<string>;
  isValid: Ref<boolean>;
  value: Ref<any>;
  constructor() {
    this.scheme = ref("");
    this.validationMessage = ref("");
    this.isValid = ref(false);
    this.value = ref(null);
  }

  validate(scheme: string, value: any) {
    this.setInit();
    this.value.value = value;
    this.scheme.value = scheme;
    console.log("scheme", scheme);
    if (scheme == "hiragana") {
      this.validationMessage.value = this.format("Hiragana");
    }
    console.log(this.validationMessage.value);
  }

  format(schemeName: string) {
    const validScheme = ValidateSchema[schemeName];
    const result = validScheme.schema.test(this.value.value);
    console.log(result);
    this.isValid.value = result;
    if (!result) {
      return validScheme.errorMessage;
    }
  }

  required() {
    if (!this.value) {
      return false;
    }
    return true;
  }
  setInit() {
    this.validationMessage.value = "";
  }
}

const createInputs = (inputs: any, func: Function) => {
  const result = {} as any;
  for (const input of Object.keys(inputs)) {
    if (typeof inputs[input] !== "object") {
      const item = {} as any;
      item.keyName = input;
      item.value = inputs[input];
      item.validationMessage = "";
      item.isValid = true;
      item.validator = new Validator();
      item.setValue = createSetValue(input, func);
      result[input] = item;
    } else {
      const items = recursiveObject(inputs[input], input);
      for (const item of Object.keys(items)) {
        items[item].setValue = createSetValue(items[item].keyName, func);
        items[item].validator = new Validator();
        result[item] = items[item];
      }
    }
  }
  return { ...result };
};

export const createComponentStore = <T>(state: T): CreateComponentStore<T> => {
  const inputs: T = readonly<any>(state);

  const setValue = <T>(key: string, payload: T) => {
    set(state, key, payload);
  };

  const useInputs = () => {
    return createInputs(state, setValue);
  };

  return {
    inputs,
    useSetValue: setValue,
    useInputs,
    inputItems: createInputs(state, setValue)
  };
};

export type Store = ReturnType<typeof createComponentStore>;

export const useComponentStore = <T>(
  key: InjectionKey<Store>
): CreateComponentStore<T | any> => {
  const store = inject(key) as Store;
  if (!store) {
    throw new Error("store is called without provider.");
  }
  return store;
};

export const provideComponentStore = <T>(
  key: InjectionKey<Store>,
  state: T
) => {
  provide(key, createComponentStore<T | any>(state));
};
