import asyncHandler from "express-async-handler";
import {
  generateToken,
  generateAccountActivationToken,
  generateResetPasswordToken,
} from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import {
  sendEmailWithNodemailer,
  sendResetPasswordEmail,
} from "../helpers/email.js";
import {
  emailVerficationHtml,
  resetPasswordHtml,
} from "../helpers/emailTemplate.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.cookie("token", token, { maxAge: 86400000, httpOnly: true });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Logout user & clear cookie
// @route   GET /api/users/logout
// @access  Public
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.send();
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, accessKey } = req.body;

  if (accessKey != process.env.ACCESS_KEY) {
    res.status(400);
    throw new Error(
      "Access key is not valid. Please contact Admin to get access key"
    );
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User with email address already exists");
  }

  const id = { name, email };
  const token = generateAccountActivationToken({ name, email });
  // console.log("TOKEN : " + token);

  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Planning Applications: Email Verification Required",
    html: emailVerficationHtml(name, token),
  };

  await sendEmailWithNodemailer(req, res, emailData);
});

// @desc    Verify account activation link
// @route   POST /api/users/account-activation
// @access  Public
const accountActivation = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);

      const { name, email } = decoded;

      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        const userToken = generateToken(user._id);
        res.cookie("token", userToken, { maxAge: 86400000, httpOnly: true });
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          // token: userToken
        });
      } else {
        res.status(400);
        throw new Error("Something went wrong. Please try again.");
      }
    } catch (error) {
      res.status(401);
      if (error.message.includes("jwt expired")) {
        throw new Error("Your link has expired. Please register again.");
      } else {
        throw new Error(error.message);
      }
    }
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    const token = generateToken(updatedUser._id);

    res.cookie("token", token, { maxAge: 86400000, httpOnly: true });

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      // token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    forgot password
// @route   PUT /api/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      const { name, _id } = userExists;
      const token = generateResetPasswordToken({ name, email, _id });

      const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Planning Applications: Password reset link",
        html: resetPasswordHtml(name, token),
      };

      const updatedUser = await userExists.updateOne({
        resetPasswordLink: token,
      });

      if (updatedUser) {
        await sendResetPasswordEmail(req, res, emailData);
      } else {
        res.status(400);
        throw new Error(
          `Unable to send link to reset your password now. Please try again later`
        );
      }
    } else {
      res.status(400);
      throw new Error(`User with email address ${email} does not exist.`);
    }
  } catch (error) {
    res.status(401);
    if (error.message.includes("jwt expired")) {
      throw new Error("Your link has expired. Please register again.");
    } else {
      throw new Error(error.message);
    }
  }
});

// @desc    reset password
// @route   PUT /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    try {
      const decoded = jwt.verify(
        resetPasswordLink,
        process.env.JWT_RESET_PASSWORD
      );

      if (decoded) {
        const userExists = await User.findOne({ resetPasswordLink });

        if (userExists) {
          userExists.password = newPassword;
          userExists.resetPasswordLink = "";

          const updatedUser = await userExists.save();

          if (updatedUser) {
            res.status(201).json({
              message: `Password updated succesfully. Please login with your new password`,
            });
          } else {
            res.status(400);
            throw new Error(
              "Something went wrong. Error resetting user password"
            );
          }
        } else {
          res.status(400);
          throw new Error("Invalid link. Please try again");
        }
      } else {
        res.status(400);
        throw new Error("Password rest link has expired. Please try again.");
      }
    } catch (error) {
      res.status(401);
      if (error.message.includes("jwt expired")) {
        throw new Error("Your link has expired. Please try again.");
      } else {
        throw new Error(error.message);
      }
    }
  } else {
    res.status(400);
    throw new Error("Password rest link has expired. Please try again.");
  }
});

export {
  authUser,
  logout,
  registerUser,
  accountActivation,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  forgotPassword,
  resetPassword,
};
