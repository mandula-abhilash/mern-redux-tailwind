import { check } from "express-validator";

const userSignUpValidator = [
  check("name").not().isEmpty().withMessage("Please enter your name"),
  check("email").isEmail().withMessage("Please enter a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const userSignInValidator = [
  check("email").isEmail().withMessage("Please enter a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export { userSignUpValidator, userSignInValidator };
