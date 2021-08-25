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
import set from "just-safe-set";
import { Validators } from "@/libs/validators";
import { isObject, recursiveObjects } from "@/utils";

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
  validators: Validators;
  inputItems: Ref<any>;
  inputKeys: string[];
}

const createSetValue = (key: string, func: Function): SetValue => {
  const setValue = (payload: any) => {
    return func(key, payload);
  };
  return setValue;
};

const createInputKeys = (state: any) => {
  let keys: string[] = [];
  for (const inputKey of Object.keys(state)) {
    if (isObject(state[inputKey])) {
      const objectKeys = recursiveObjects<string[]>(state[inputKey], inputKey);
      keys = [...objectKeys, ...keys];
    } else {
      keys.push(inputKey);
    }
  }
  return keys;
};

export const createForm = (options: { defaultValues: any }) => {
  const state = reactive(options.defaultValues);
  const inputs = readonly(state);
  const validators = new Validators();

  const inputKeys = createInputKeys(state);

  const handleSubmit = (cb?: Function) => {
    const isValid = validators.validate(state)();
    if (!isValid) {
      return;
    }
    cb && cb(inputs);
  };

  return {
    inputs,
    inputKeys,
    fieldValues: state,
    validators,
    handleSubmit
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
