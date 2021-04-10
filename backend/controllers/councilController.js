import asyncHandler from "express-async-handler";
import Council from "../models/councils.model.js";

// @desc    Get all users
// @route   GET /api/councils/list
// @access  Private
const getCouncils = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        authorityName: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Council.countDocuments({ ...keyword });
  const councils = await Council.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ councils, page, pages: Math.ceil(count / pageSize) });
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
