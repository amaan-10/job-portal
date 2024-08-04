import mongoose from "mongoose";

const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  fileId: mongoose.Schema.Types.ObjectId,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  uploadedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Resume", resumeSchema);
