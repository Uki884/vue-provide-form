import get from 'just-safe-get';
import { ref, Ref } from "vue";
import { Validator } from "./validator";

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

  createValidator(keyName: string, name: string, schema: string) {
    const validator = new Validator(name, schema);
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