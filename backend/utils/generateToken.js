import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const generateAccountActivationToken = ({ name, email }) => {
  return jwt.sign({ name, email }, process.env.JWT_ACCOUNT_ACTIVATION, {
    expiresIn: "10m",
  });
};

const generateResetPasswordToken = ({ name, email, _id }) => {
  return jwt.sign({ name, email, _id }, process.env.JWT_RESET_PASSWORD, {
    expiresIn: "10m",
  });
};

export {
  generateToken,
  generateAccountActivationToken,
  generateResetPasswordToken,
};
