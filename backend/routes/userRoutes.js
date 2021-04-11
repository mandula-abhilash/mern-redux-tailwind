import express from "express";
import {
  authUser,
  accountActivation,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  logout,
} from "../controllers/userController.js";

import { runValidation } from "../validators/index.js";
import {
  userAccountActivationValidator,
  userSignInValidator,
  userSignUpValidator,
} from "../validators/auth.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(userSignUpValidator, runValidation, registerUser)
  .get(protect, admin, getUsers);
router
  .route("/account-activation")
  .post(userAccountActivationValidator, runValidation, accountActivation);
router.route("/login").post(userSignInValidator, runValidation, authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/logout").get(logout);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
