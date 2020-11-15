import { InjectionKey } from "vue";
import { Store } from "@/compositions/componentStore";

export const UserFormKey: InjectionKey<Store> = Symbol("UserForm");
