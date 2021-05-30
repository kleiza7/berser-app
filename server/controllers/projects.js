import express from "express";
import mongoose from "mongoose";

import Project from "../models/project.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleProject = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id!");
  
    const project = await Project.findById(id);

    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  } 
};

export const createProject = async (req, res) => {
  const project = req.body;

  const newProject = new Project({
    ...project,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id: _id } = req.params;
  const project = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No project with that id");

  const updatedProject = await Project.findByIdAndUpdate(
    _id,
    { ...project, _id },
    { new: true }
  );

  res.json(updatedProject);
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id!");

  await Project.findByIdAndRemove(id);

  res.json({ message: "Post deleted succesfully." });
};

export const likeProject = async (req, res) => {
  const { id } = req.params;


  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id!");

  const project = await Project.findById(id);

  const index = project.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    project.likes.push(req.userId);
  } else {
    project.likes = project.likes.filter((id) => id !== String(req.userId));
  }

  const updatedProject = await Project.findByIdAndUpdate(id, project, {
    new: true,
  });

  res.json(updatedProject);
};
