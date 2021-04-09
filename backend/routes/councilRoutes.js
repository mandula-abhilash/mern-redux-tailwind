import express from "express";
import {
  getCouncils,
  addCouncil,
  deleteCouncilById,
  getCouncilById,
} from "../controllers/councilController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

import { runValidation } from "../validators/index.js";
import { councilAddValidator } from "../validators/council.js";

const router = express.Router();

router.route("/list").get(protect, getCouncils);
router
  .route("/add")
  .post(protect, admin, councilAddValidator, runValidation, addCouncil);
router
  .route("/:id")
  .get(protect, admin, getCouncilById)
  .delete(protect, admin, deleteCouncilById);
router.route("");

export default router;
