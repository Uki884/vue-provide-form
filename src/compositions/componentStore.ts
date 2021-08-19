import { InjectionKey, inject, provide, readonly, reactive } from "vue";

import { set } from "lodash";
import { Validators } from "@/compositions/validator";

interface CreateComponentStore<T> {
  inputs: T;
  useSetValue: (key: string, payload: any) => void;
  useInputs: (inputs: T) => any;
  validate: any;
  inputItems: any;
}

const rename = (name: string) => {
  return name.split(".").join("_");
};

const recursiveObject = (objects: any, name: string) => {
  const items = objects;
  if (typeof items !== "object") return;
  const result = {} as any;
  const recursive = (objects: any, name: string): any => {
    if (typeof objects !== "object" || !objects) {
      result[name] = {
        keyName: name,
        value: objects
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

const createInputs = (inputs: any, func: Function, Validators: any) => {
  const result = {} as any;
  for (const input of Object.keys(inputs)) {
    if (typeof inputs[input] !== "object") {
      const item = {} as any;
      item.keyName = input;
      item.value = inputs[input];
      item.useValidator = (name: string, scheme: string) =>
        Validators.createValidator(item.keyName, name, scheme);
      item.setValue = createSetValue(input, func);
      result[input] = item;
    } else {
      const items = recursiveObject(inputs[input], input);
      for (const item of Object.keys(items)) {
        items[item].setValue = createSetValue(items[item].keyName, func);
        items[item].useValidator = (name: string, scheme: string) =>
          Validators.createValidator(items[item].keyName, name, scheme);
        result[item] = items[item];
      }
    }
  }
  return { ...result };
};

export const createComponentStore = <T>(options: {
  defaultValues: any;
}): CreateComponentStore<T> => {
  const inputs: T = readonly<any>(options.defaultValues);
  const state = reactive(options.defaultValues);
  const validators = new Validators();
  const setValue = <T>(key: string, payload: T) => {
    set(state, key, payload);
  };

  const useInputs = () => {
    return createInputs(state, setValue, validators);
  };

  return {
    inputs,
    useSetValue: setValue,
    useInputs,
    validate: validators.validate(state),
    inputItems: createInputs(state, setValue, validators)
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
  options: { defaultValues: T }
) => {
  provide(key, createComponentStore<T | any>(options));
};
