import express from "express";
import { getCouncils } from "../controllers/councilController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/list").get(protect, getCouncils);

export default router;
