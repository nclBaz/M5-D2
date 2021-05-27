import { body } from "express-validator";

export const postsValidator = [
  body("title").exists().withMessage("title is requiered"),
  body("category").exists().withMessage("category is requiered"),
  body("content").exists().withMessage("content is requiered"),
];
