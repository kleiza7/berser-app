import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import projectRoutes from "./routes/projects.js";
import userRoutes from "./routes/users.js";
import contactRoutes from "./routes/contact.js";
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api", contactRoutes)
app.use("/api/projects", projectRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5002;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
