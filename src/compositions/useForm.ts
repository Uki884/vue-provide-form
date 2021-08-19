import { InjectionKey, inject, provide, readonly, reactive } from "vue";
import { set } from "lodash";
import { Validators } from "@/compositions/validator";

export interface Form<T> {
  inputs: T;
  useSetValue: (key: string, payload: any) => void;
  validate: () => boolean;
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

export const createForm = (options: { defaultValues: any }) => {
  const state = reactive(options.defaultValues);
  const inputs = readonly(state);
  const validators = new Validators();

  const setValue = (key: string, payload: any) => {
    set(state, key, payload);
  };

  return {
    inputs,
    useSetValue: setValue,
    validate: validators.validate(state),
    inputItems: createInputs(state, setValue, validators)
  };
};

export type Store = ReturnType<typeof createForm>;

export const Key: InjectionKey<Store> = Symbol("ValidateForm");

export const useForm = <T>() => {
  const store = inject(Key) as Form<T>;
  if (!store) {
    throw new Error("store is called without provider.");
  }
  return store;
};

export const provideForm = (options: { defaultValues: any }) => {
  provide(Key, createForm(options));
};
