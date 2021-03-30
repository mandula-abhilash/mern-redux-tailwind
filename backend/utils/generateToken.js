import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const generateAccountActivationToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCOUNT_ACTIVATION, {
    expiresIn: "10m",
  });
};

export { generateToken, generateAccountActivationToken };
