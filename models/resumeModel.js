import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,
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
  forJob: {
    type: mongoose.Types.ObjectId,
    ref: "Job",
  },
});

export default mongoose.model("Resume", resumeSchema);
