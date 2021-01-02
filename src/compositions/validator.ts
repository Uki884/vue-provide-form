import { reactive } from "vue";

const ValidateSchema = {
  required: {
    validate: (val: any) => {
      if (val) {
        return true
      }
      return false
    },
    message(field: string) {
      return field + 'は必須です';
    }
  },
  number: {
    validate: (val: any) => {
      const pattern = /^[0-9]*$/
      return pattern.test(val);
    },
    message(field: string) {
      return field + 'は数字で入力してください';
    }
  },
  numberHyphen: {
    validate: (val: any) => {
      const pattern = /^[0-9-]+$/
      return pattern.test(val);
    },
    message(field: string) {
      return field + '数字とハイフン以外が入力されています';
    }
  },
  hiragana: {
    validate: (val: any) => {
      const pattern = /^[ぁ-んー]+$/
      return pattern.test(val);
    },
    message(field: string) {
      return field + 'はひらがなで入力してください';
    }
  },
  mail: {
    validate: (val: any) => {
      const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      return pattern.test(val);
    },
    message(field: string) {
      return field + 'は正しい形式で入力してください';
    }
  }
} as any;

export class Validator {
  #state: any;
  constructor() {
    this.#state = reactive({
      scheme: '',
      name: '',
      errorMsg: [],
      isValid: true,
      value: null
    });
  }

  get errorMsg() {
    return this.#state.errorMsg
  }

  get isValid() {
    return this.#state.isValid
  }

  validate(name: string, scheme: string, value: any) {
    if (!scheme) return
    this.init();
    this.#state.value = value;
    this.#state.scheme = scheme;
    this.#state.name = name;
    const schemes = scheme.split('|');
    for (const s of schemes) {
      if (ValidateSchema[s]) {
        const { result, message } = this._validate(ValidateSchema[s]);
        if (!result) {
          this.#state.isValid = false
          this.#state.errorMsg.push(message)
        }
      }
    }
  }

  _validate(scheme: any) {
    const result = scheme.validate(this.#state.value)
    return {
      result,
      message: scheme.message(this.#state.name)
    }
  }

  required() {
    if (!this.#state.value) {
      return false;
    }
    return true;
  }

  init() {
    this.#state.errorMsg = []
    this.#state.isValid = true
  }
}