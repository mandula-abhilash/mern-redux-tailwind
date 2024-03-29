import { check } from "express-validator";

const userSignUpValidator = [
  check("name").not().isEmpty().withMessage("Please enter your name"),
  check("email").isEmail().withMessage("Please enter a valid email address"),
  check("accessKey")
    .not()
    .isEmpty()
    .withMessage("Please enter your access key"),
  // check("password")
  //   .isLength({ min: 6 })
  //   .withMessage("Password must be at least 6 characters long"),
];

const userAccountActivationValidator = [
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

const userProfileUpdateValidator = [
  check("name").not().isEmpty().withMessage("Please enter your name"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Please enter a valid email address"),
];

const resetPasswordValidator = [
  check("newPassword")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export {
  userSignUpValidator,
  userSignInValidator,
  userAccountActivationValidator,
  userProfileUpdateValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
};
