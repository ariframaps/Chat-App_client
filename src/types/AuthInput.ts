export interface AuthInput {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export const initialRegisterInputValues: AuthInput = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const initialLoginInputValues: AuthInput = {
  email: "",
  password: "",
};
