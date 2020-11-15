import { InjectionKey, inject, provide, readonly, reactive } from "vue";

import { set } from "lodash";

const recursiveObject = (objects: any, name: string) => {
  const items = objects;
  if (typeof items !== "object") return;
  const result = {} as any;
  const recursive = (objects: any, name: string): any => {
    if (typeof objects !== "object" || !objects) {
      const reName = name.split(".").join("_");
      result[reName] = { keyName: name, value: objects };
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

const createInputs = (inputs: any, func: Function) => {
  const result = {} as any;
  for (const input of Object.keys(inputs)) {
    if (typeof inputs[input] !== "object") {
      const item = {} as any;
      item.keyName = input;
      item.value = inputs[input];
      item.setValue = func;
      result[input] = item;
    } else {
      const items = recursiveObject(inputs[input], input);
      for (const item of Object.keys(items)) {
        items[item].setValue = func;
        result[item] = items[item];
      }
    }
  }
  return { ...result };
};

export const useStore = (state: any): any => {
  const inputs = readonly(state);

  const setValue = (key: string, payload: any) => {
    set(state, key, payload);
  };

  const useInputs = (inputs: any) => {
    return createInputs(inputs, setValue);
  };

  return {
    inputs,
    useSetValue: setValue,
    useInputs
  };
};

export type Store = ReturnType<typeof useStore>;

export const useComponentStore = (key: InjectionKey<Store>) => {
  const store = inject(key) as Store;
  if (!store) {
    throw new Error("store is called without provider.");
  }
  return store;
};

export const provideComponentStore = (key: InjectionKey<Store>, state: any) => {
  provide(key, useStore(state));
};
