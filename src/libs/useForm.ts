import {
  InjectionKey,
  inject,
  provide,
  readonly,
  reactive,
  watch,
  computed,
  Ref
} from "vue";
import { set } from "lodash";
import { Validators } from "@/libs/validators";
import { isObject } from "@/utils";

export interface FormItems {
  [key: string]: {
    keyName: string;
    value: string;
    setValue?: (key: string, value: any) => any;
    useValidator?: (name: string, schema: string) => any;
  };
}
export interface FormItem {
  keyName: string;
  value: any;
  useValidator: (name: string, schema: string) => any;
  setValue: SetValue;
}

export type SetValue = (key: string, value: any) => void;

export interface Form<T> {
  inputs: T;
  fieldValues: T;
  useSetValue: (key: string, payload: any) => void;
  validate: () => boolean;
  handleSubmit: (cb?: Function) => void;
  inputItems: Ref<any>;
}

const recursiveObjects = (objects: any, name: string): FormItems => {
  const items = objects;
  if (!isObject(items)) {
    throw new Error("not object");
  }
  const result = {} as FormItems;
  const recursive = (objects: any, name: string): any => {
    if (!isObject(objects) || !objects) {
      result[name] = {
        keyName: name,
        value: objects
      };
      return result;
    } else if (isObject(objects)) {
      for (const object in objects) {
        recursive(objects[object], name + "." + object);
      }
      return result;
    }
  };

  return recursive(items, name);
};

const createSetValue = (key: string, func: Function): SetValue => {
  const setValue = (payload: any) => {
    return func(key, payload);
  };
  return setValue;
};

const createInputs = (inputs: any, func: Function, Validators: any) => {
  const result = {} as FormItems;
  for (const input of Object.keys(inputs)) {
    if (Array.isArray(inputs[input])) {
      throw new Error(`array is not supported. key: ${input}`);
    }

    if (isObject(inputs[input])) {
      const items = recursiveObjects(inputs[input], input);
      for (const item of Object.keys(items)) {
        items[item].setValue = createSetValue(items[item].keyName, func);
        items[item].useValidator = (name: string, schema: string) =>
          Validators.createValidator(items[item].keyName, name, schema);
        result[item] = items[item];
      }
    } else {
      const item = {} as FormItem;
      item.keyName = input;
      // item.value = inputs[input];
      item.useValidator = (name: string, schema: string) =>
        Validators.createValidator(item.keyName, name, schema);
      item.setValue = createSetValue(input, func);
      result[input] = item;
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

  const inputItems = computed(() => {
    return createInputs(state, setValue, validators);
  });

  const handleSubmit = (cb?: Function) => {
    const isValid = validators.validate(state)();
    if (!isValid) {
      return;
    }
    cb && cb(inputs);
  };

  return {
    inputs,
    fieldValues: state,
    useSetValue: setValue,
    validate: validators.validate(state),
    handleSubmit,
    inputItems: inputItems
  };
};

export type Store = ReturnType<typeof createForm>;

export const Key: InjectionKey<Store> = Symbol("ProvideForm");

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
