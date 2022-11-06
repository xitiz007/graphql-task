export const isValidEmail = (email: string) => {
  const regExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regExp.test(email);
};

export const isValidPhoneNumber = (number: string) => {
  // regular expression for nepali land line and phone number
  const regExp = /^\d{3}-?\d{6,7}$/;
  return regExp.test(number);
};

export const isEmpty = (data: string) => {
  return !data.trim();
};
