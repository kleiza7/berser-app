import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  projectName: String,
  groupName: String,
  projectType: String,
  creator: String,
  name: String,
  numOfDevelopers: String,
  numOfRequirements: String,
  image: String,
  title: String,
  description: String,
  gitHub: String,
  likes: {
    type: [String],
    default: [],
  },
  projectFile:String,

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
