import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    position: {
      type: String,
      required: [true, "Job position is required"],
      maxlength: 100,
    },
    eligibility: {
      type: String,
      required: [true, "Job Eligibility is required"],
    },
    requiredSkills: {
      type: [String],
      required: [true, "Required Skills is required"],
    },
    otherDetails: {
      type: String,
    },
    status: {
      type: String,
      enum: ["applied", "pending", "reject", "interview"],
      default: "pending",
    },
    workType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      default: "full-time",
    },
    workLocation: {
      type: String,
      default: "Mumbai",
      required: [true, "Work location is required"],
    },
    ctc: {
      type: String,
      required: [true, "CTC is required"],
    },
    about: {
      type: String,
    },
    duration: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    openingAt: {
      type: String,
      required: [true, "Job Opening Time is required"],
    },
    closesAt: {
      type: String,
      required: [true, "Job Closing Time is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);
