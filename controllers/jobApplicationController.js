import jobApplicationModel from "../models/jobApplicationModel.js";

export const jobApplicationController = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    // Create a new application
    const newApplication = new jobApplicationModel({
      userId,
      jobId,
      appliedAt: new Date(),
    });

    // Save the application in the database
    await newApplication.save();

    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while submitting your application" });
  }
};

export const jobApplicationStatus = async (req, res) => {
  try {
    const { userId, jobId } = req.query;

    // Check if there's an existing application
    const existingApplication = await jobApplicationModel.findOne({
      userId,
      jobId,
    });

    if (existingApplication) {
      res.status(200).json({ applied: true });
    } else {
      res.status(200).json({ applied: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while checking application status" });
  }
};
