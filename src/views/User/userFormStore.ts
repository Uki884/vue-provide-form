import {
  reactive,
  InjectionKey,
  inject,
  computed,
  ComputedRef,
  provide,
  toRefs,
  readonly
} from "vue";

export const Key: InjectionKey<Store> = Symbol("UserForm");

const recursiveObject = (objects: any, name: string) => {
  const items = objects;
  if (typeof items !== "object") return;

  const result = {} as any;
  const recursive = (objects: any, name: string): any => {
    if (typeof objects !== "object") {
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

export const useUserForm = (state: any): any => {
  const inputs = readonly(state);

  const setValue = (key: string, payload: any) => {
    console.log(key, payload);
    state[key] = payload;
  };

  const useInput = (inputs: any) => {
    const result = {} as any;
    for (const input of Object.keys(inputs)) {
      if (typeof inputs[input] === "string") {
        const item = {} as any;
        item.keyName = input;
        item.value = inputs[input];
        item.setValue = setValue;
        result[input] = item;
      } else {
        const items = recursiveObject(inputs[input], input);
        for (const item of Object.keys(items)) {
          items[item].setValue = setValue;
          result[item] = items[item];
        }
      }
    }
    return { ...result };
  };

  return {
    inputs,
    useSetValue: setValue,
    useInput
  };
};

export type Store = ReturnType<typeof useUserForm>;

export const useUserStore = () => {
  const store = inject(Key) as Store;
  if (!store) {
    throw new Error("store is called without provider.");
  }
  return store;
};

export const provideStore = (state: any) => {
  provide(Key, useUserForm(state));
};
