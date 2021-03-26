import { validationResult } from "express-validator";

const runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors);
    return res.status(422).send({
      message: errors.array()[0].msg,
    });
  }
  next();
};

export { runValidation };
