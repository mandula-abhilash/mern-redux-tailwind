import asyncHandler from "express-async-handler";
import Council from "../models/councils.model.js";

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getCouncils = asyncHandler(async (req, res) => {
  const councils = await Council.find({});
  res.json({ councils });
});

export { getCouncils };
