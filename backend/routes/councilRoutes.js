import express from "express";
import { getCouncils, addCouncil } from "../controllers/councilController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/list").get(protect, getCouncils);
router.route("/add").post(protect, addCouncil);

export default router;
