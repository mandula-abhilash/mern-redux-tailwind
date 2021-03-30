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

export { generateToken, generateAccountActivationToken };
