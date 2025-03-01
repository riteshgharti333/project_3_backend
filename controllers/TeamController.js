import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Team } from "../models/teamModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const newTeam = catchAsyncError(async (req, res, next) => {
  const { name, title, image } = req.body;

  if (!name || !title || !image) {
    return next(new ErrorHandler("All fields are required!", 400));
  }

  const newTeam = await Team.create({
    name,
    title,
    image,
  });

  res.status(201).json({
    success: true,
    message: "Team member added successfully!",
    team: newTeam,
  });
});

// GET SINGLE TEAM

export const getSingleTeam = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const team = await Team.findById(id);

  if (!team) {
    return next(new ErrorHandler("Team not found!", 404));
  }

  res.status(200).json({
    success: true,
    team,
  });
});

// GET All Team

export const getAllTeams = catchAsyncError(async (req, res, next) => {
  const teams = await Team.find();

  res.status(200).json({
    success: true,
    teams,
  });
});

// UPDATE Team

export const updateTeam = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name, title, image } = req.body;

  const team = await Team.findById(id);

  if (!team) {
    return next(new ErrorHandler("Team member not found!", 404));
  }

  team.name = name || team.name;
  team.title = title || team.title;
  team.image = image || team.image;

  await team.save();

  res.status(200).json({
    success: true,
    message: "Team member updated successfully!",
    team,
  });
});

// DELETE Team

export const deleteTeam = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const team = await Team.findById(id);

  if (!team) {
    return next(new ErrorHandler("Team not found!", 404));
  }

  await Team.deleteOne();

  res.status(200).json({
    success: true,
    message: "Team member deleted successfully!",
  });
});
