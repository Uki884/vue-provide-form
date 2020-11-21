import { InjectionKey, inject, provide, readonly } from "vue";

import { set } from "lodash";

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

const createInputs = (inputs: any, func: Function) => {
  const result = {} as any;
  for (const input of Object.keys(inputs)) {
    if (typeof inputs[input] !== "object") {
      const item = {} as any;
      item.keyName = input;
      item.value = inputs[input];
      item.setValue = createSetValue(input, func);
      result[input] = item;
    } else {
      const items = recursiveObject(inputs[input], input);
      for (const item of Object.keys(items)) {
        items[item].setValue = createSetValue(items[item].keyName, func);
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
