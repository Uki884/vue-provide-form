import { reactive, Ref, ref } from "vue";
import { get } from "lodash";

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
  constructor(name: string, scheme: string) {
    this.#state = reactive({
      scheme: scheme,
      name: name,
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

  validate(value: any) {
    this.init();
    this.#state.value = value;
    const schemes = this.#state.scheme.split('|');
    for (const s of schemes) {
      if (ValidateSchema[s]) {
        const { result, message } = this._validate(ValidateSchema[s]);
        if (!result) {
          this.#state.isValid = false
          this.#state.errorMsg.push(message)
        }
      }
    }
    return this.#state.isValid
  }

  _validate(scheme: any) {
    const result = scheme.validate(this.#state.value)
    return {
      result,
      message: scheme.message(this.#state.name)
    }
  }

  init() {
    this.#state.errorMsg = [];
    this.#state.isValid = true
  }
}

export class Validators {
  #validators: Ref<any>;
  #isValid: boolean;
  validationResults: boolean[]
  #state: any
  constructor() {
    this.#validators = ref<any>({})
    this.#isValid = true
    this.validationResults = []
  }

  createValidator(keyName: string, name: string, scheme: string) {
    const validator = new Validator(name, scheme);
    const validateCurrentValue: any = (value: any) => validator.validate(value)
    this.#validators.value[keyName] = validateCurrentValue;
    return validator;
  }

  validate(inputs: any) {
    return () => {
      for (const validator in this.#validators.value) {
        const result = get(inputs, validator);
        const validResult = this.#validators.value[validator](result)
        if (!validResult) {
          this.#isValid = false
        } else {
          this.#isValid = true
        }
      }
      return this.#isValid
    }
  }

  init() {
    this.#state.errorMsg = []
    this.#state.isValid = true
  }

  get validators() {
    return this.#validators
  }

}

