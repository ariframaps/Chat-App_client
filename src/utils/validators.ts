export const isUsernameEmpty = (username: string | undefined): boolean => {
  let bool: boolean;
  username?.length ? (bool = true) : (bool = false);
  return bool;
};

// export const isUsernameTaken = (username: string): boolean => {

// };

export const isEmailEmpty = (email: string): boolean => {
  let bool: boolean;
  email.length ? (bool = true) : (bool = false);
  return bool;
};

// export const isEmailUsed = (email: string): boolean => {};

// export const isEmailValid = (email: string): boolean => {};

export const isPasswordEmpty = (password: string): boolean => {
  let bool: boolean;
  password.length ? (bool = true) : (bool = false);
  return bool;
};

export const isPasswordEnough = (password: string): boolean => {
  let bool: boolean;
  password.length > 7 ? (bool = true) : (bool = false);
  return bool;
};

export const isConfirmPwdTheSame = (
  confirmPwd: string,
  password: string
): boolean => {
  return confirmPwd === password;
};

export const isUserLoggedIn = (): string | boolean => {
  const user = localStorage.getItem("user");
  return user ? user : false;
};
