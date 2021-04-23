import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    projectName: String,
    groupName : String,
    projectType : String,
    creator: String,
    name:String,
    numOfDevelopers : Number,
    numOfRequirements : Number,
    image: String,
    title: String,
    description: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;