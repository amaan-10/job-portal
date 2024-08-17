import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  appliedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "reviewed", "interview", "accepted", "rejected"],
  }, // e.g., pending, reviewed, accepted, rejected
});

export default mongoose.model("Application", jobApplicationSchema);
