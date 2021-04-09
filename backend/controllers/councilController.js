import asyncHandler from "express-async-handler";
import Council from "../models/councils.model.js";

// @desc    Get all users
// @route   GET /api/councils/list
// @access  Private
const getCouncils = asyncHandler(async (req, res) => {
  const councils = await Council.find({});
  res.json({ councils });
});

// @desc    Add council
// @route   POST /api/councils/add
// @access  Private/Admin
const addCouncil = asyncHandler(async (req, res) => {
  const { authorityName, authorityURL, authorityType, dateTypes } = req.body;

  const councilExists = await Council.findOne({ authorityName, authorityURL });

  if (councilExists) {
    res.status(400);
    throw new Error("Council already exists");
  }

  const council = await Council.create({
    authorityName,
    authorityURL,
    authorityType,
    dateTypes,
  });

  if (council) {
    res.status(201).json({
      message: "Succesfully added council.",
    });
  } else {
    res.status(400);
    throw new Error("Unable to add new council. Please try again.");
  }
});

// @desc    Delete council
// @route   DELETE /api/councils/delete/:id
// @access  Private/Admin
const deleteCouncilById = asyncHandler(async (req, res) => {
  const council = await Council.findById(req.params.id);

  if (council) {
    await council.remove();
    res.status(201).json({
      message: "Deleted council succesfully",
    });
  } else {
    res.status(400);
    throw new Error("Unable to delete council. Please try again.");
  }
});

// @desc    Fetch single product
// @route   GET /api/councils/:id
// @access  Public
const getCouncilById = asyncHandler(async (req, res) => {
  const council = await Council.findById(req.params.id);

  if (council) {
    res.json(council);
  } else {
    res.status(404);
    throw new Error("Council not found");
  }
});

export { getCouncils, addCouncil, deleteCouncilById, getCouncilById };
