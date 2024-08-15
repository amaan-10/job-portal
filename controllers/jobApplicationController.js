import mongoose from "mongoose";
import jobApplicationModel from "../models/jobApplicationModel.js";
import jobsModel from "../models/jobsModel.js";
import userModel from "../models/userModel.js";

export const jobApplicationController = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    // Create a new application
    const newApplication = new jobApplicationModel({
      userId,
      jobId,
      appliedAt: new Date(),
    });

    const applications = await jobApplicationModel.find({}).exec();

    // Iterate over each application
    for (const application of applications) {
      // Update the corresponding job's status
      await jobsModel.updateOne(
        { _id: application.jobId }, // Match job with applicationId
        { $set: { status: application.status } } // Set the status field
      );
    }

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

  const applications = await jobApplicationModel.find({}).exec();

  // Iterate over each application
  for (const application of applications) {
    // Update the corresponding job's status
    await jobsModel.updateOne(
      { _id: application.jobId }, // Match job with applicationId
      { $set: { status: application.status } } // Set the status field
    );
  }

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

  const applications = await jobApplicationModel.find({}).exec();

  // Iterate over each application
  for (const application of applications) {
    // Update the corresponding job's status
    await jobsModel.updateOne(
      { _id: application.jobId }, // Match job with applicationId
      { $set: { status: application.status } } // Set the status field
    );
  }

  let queryResult = jobApplicationModel.find(queryObject);

  if (sort === "latest") {
    queryResult = queryResult.sort("-appliedAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("appliedAt");
  }
  if (sort === "a-z") {
    queryResult = await jobApplicationModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.body.user.userId),
        },
      },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "jobDetails",
        },
      },
      {
        $unwind: "$jobDetails",
      },
      {
        $sort: {
          "jobDetails.position": 1,
        },
      },
      {
        $project: {
          appliedAt: 1,
          jobId: 1,
          userId: 1,
        },
      },
    ]);
  }
  if (sort === "z-a") {
    queryResult = await jobApplicationModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.body.user.userId),
        },
      },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "jobDetails",
        },
      },
      {
        $unwind: "$jobDetails",
      },
      {
        $sort: {
          "jobDetails.position": -1,
        },
      },
      {
        $project: {
          appliedAt: 1,
          jobId: 1,
          userId: 1,
        },
      },
    ]);
  }
  const jobApplications = await queryResult;
  //console.log(jobApplications);

  // const jobApplications = await jobsModel.find({createdBy:req.user.userId});
  res.status(200).json(jobApplications);
};

export const getJobApplicant = async (req, res, next) => {
  //console.log(req);
  try {
    const { id, search, sort } = req.query;
    const applications = await jobApplicationModel.find({ jobId: id });

    const userIds = applications.map((app) => app.userId);

    //console.log(userIds);

    const user = await userModel.find({ _id: { $in: userIds } });
    //console.log(user);

    if (user.length === 0) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Server error" });
  }

  // const applications = await jobApplicationModel.find({}).exec();

  // // Iterate over each application
  // for (const application of applications) {
  //   // Update the corresponding job's status
  //   await jobsModel.updateOne(
  //     { _id: application.jobId }, // Match job with applicationId
  //     { $set: { status: application.status } } // Set the status field
  //   );
  // }

  // let queryResult = jobApplicationModel.find(queryObject);

  // if (sort === "latest") {
  //   queryResult = queryResult.sort("-createdAt");
  // }
  // if (sort === "oldest") {
  //   queryResult = queryResult.sort("createdAt");
  // }
  // if (sort === "a-z") {
  //   queryResult = queryResult.sort("position");
  // }
  // if (sort === "z-a") {
  //   queryResult = queryResult.sort("-position");
  // }
  // const jobApplications = await queryResult;

  // // const jobApplications = await jobsModel.find({createdBy:req.user.userId});
  // res.status(200).json(jobApplications);
};

export const getJobApplicantDetails = async (req, res, next) => {
  //console.log(req);
  try {
    const { jobId, userId } = req.params;
    const applications = await jobApplicationModel.findOne({
      jobId: jobId,
      userId: userId,
    });

    //console.log(applications);

    const user = await userModel.find({ _id: { $in: userId } });
    //console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
