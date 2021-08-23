import { reactive } from "vue";
import { defaultSchema } from './schema'

type Validate = (val: any) => boolean
type Message = (field: string) => string

interface Schema {
  [key: string]: { validate: Validate; message: Message}
}

interface State {
  schema: string,
  name: string,
  errorMsg: string[],
  isValid: boolean,
  value: any
}

export class Validator {
  #state: State;
  schemas: Schema;
  constructor(name: string, schema: string) {
    this.#state = reactive<State>({
      schema: schema,
      name: name,
      errorMsg: [],
      isValid: true,
      value: null
    });
    this.schemas = defaultSchema
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
    const schemas = this.#state.schema.split('|');
    for (const s of schemas) {
      if (this.schemas[s]) {
        const { result, message } = this._validate(this.schemas[s]);
        if (!result) {
          this.#state.isValid = false
          this.#state.errorMsg.push(message)
        }
      }
    }
    return this.#state.isValid
  }

  _validate(schema: { validate: Validate, message: Message }) {
    const result = schema.validate(this.#state.value)
    return {
      result,
      message: schema.message(this.#state.name)
    }
  }

  init() {
    this.#state.errorMsg = [];
    this.#state.isValid = true
  }
}

