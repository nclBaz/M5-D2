import { body } from "express-validator";

export const authorsValidator = [
  body("name").exists().withMessage("name is requiered"),
  body("surname").exists().withMessage("name is requiered"),
  body("email").exists().withMessage("email is requiered"),
  body("dateOfBirth").exists().withMessage("Birth date is requiered"),
];
