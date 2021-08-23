export const defaultSchema = {
  required: {
    validate: (val: any) => {
      if (val) {
        return true;
      }
      return false;
    },
    message(field: string) {
      return field + "は必須です";
    }
  },
  number: {
    validate: (val: any) => {
      const pattern = /^[0-9]*$/;
      return pattern.test(val);
    },
    message(field: string) {
      return field + "は数字で入力してください";
    }
  },
  numberHyphen: {
    validate: (val: any) => {
      const pattern = /^[0-9-]+$/;
      return pattern.test(val);
    },
    message(field: string) {
      return field + "数字とハイフン以外が入力されています";
    }
  },
  hiragana: {
    validate: (val: any) => {
      const pattern = /^[ぁ-んー]+$/;
      return pattern.test(val);
    },
    message(field: string) {
      return field + "はひらがなで入力してください";
    }
  },
  mail: {
    validate: (val: any) => {
      const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return pattern.test(val);
    },
    message(field: string) {
      return field + "は正しい形式で入力してください";
    }
  }
} as const;
