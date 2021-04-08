import { check } from "express-validator";

const councilAddValidator = [
  check("authorityName")
    .not()
    .isEmpty()
    .withMessage("Please enter authority name"),
  check("authorityURL")
    .not()
    .isEmpty()
    .withMessage("Please enter authority URL"),
  check("authorityType")
    .not()
    .isEmpty()
    .withMessage("Please enter authority type"),
];

export { councilAddValidator };
