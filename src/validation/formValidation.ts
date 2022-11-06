import { CreateUserInput } from "../utils/types";
import { isEmpty, isValidEmail, isValidPhoneNumber } from "./validation";

interface Error {
  [key: string]: string;
}

const validateCreateUser = (userInput: CreateUserInput) => {
  const errors: Error[] = [];
  let key: keyof typeof userInput;
  for (key in userInput) {
    if (key === "email" && !isValidEmail(userInput[key])) {
      errors.push({ [key]: "invalid email" });
    } else if (key === "phone" && !isValidPhoneNumber(userInput[key])) {
      errors.push({ [key]: "invalid phone number" });
    } else if (key === "dateOfBirth" && isNaN(Date.parse(userInput[key]))) {
      errors.push({ [key]: "invalid date" });
    } else if (
      (key === "name" ||
        key === "address" ||
        key === "nationality" ||
        key === "educationBackground") &&
      isEmpty(userInput[key])
    ) {
      errors.push({ [key]: "field cannot be left empty" });
    }
  }

  return errors;
};

export default validateCreateUser;
