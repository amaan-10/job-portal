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

export const getAllJobApplication = async (req, res, next) => {
  const { id, search, sort } = req.query;
  const queryObject = {};

  let queryResult = jobApplicationModel.find(queryObject);

  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }
  const jobApplications = await queryResult;

  // const jobApplications = await jobsModel.find({createdBy:req.user.userId});
  res.status(200).json(jobApplications);
};

export const getMyJobApplication = async (req, res, next) => {
  const { id, search, sort } = req.query;
  const queryObject = {
    userId: req.body.user.userId,
  };

  let queryResult = jobApplicationModel.find(queryObject);

  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }
  const jobApplications = await queryResult;

  // const jobApplications = await jobsModel.find({createdBy:req.user.userId});
  res.status(200).json(jobApplications);
};
