import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

export const createJobController = async (req, res, next) => {
  const { company, position, description } = req.body;
  if (!company || !position || !description) {
    next("Please provide all fields");
  }
  req.body.createdBy = req.body.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({
    success: true,
    job,
  });
};

export const getAllJobsController = async (req, res, next) => {
  const { status, workType, id, search, sort } = req.query;
  const queryObject = {
    createdBy: req.body.user.userId,
  };
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  if (id && id !== "all") {
    queryObject._id = id;
  }
  let queryResult = jobsModel.find(queryObject);

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

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;
  const skip = (page - 1) * limit;
  queryResult = queryResult.skip(skip).limit(limit);

  const totalJobs = await jobsModel.countDocuments(queryResult);
  const numOfPage = Math.ceil(totalJobs / limit);

  const jobs = await queryResult;

  // const jobs = await jobsModel.find({createdBy:req.user.userId});
  res.status(200).json(jobs);
};

export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position, description } = req.body;
  if (!company || !position || !description) {
    next("Please provide all fields");
  }
  const job = await jobsModel.findOne({ _id: id });
  if (!job) {
    next(`Job Not Found for id ${id}`);
  }
  if (!req.body.user.userId === job.createdBy.toString()) {
    next("You are not Authorized to update this job");
    return;
  }
  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, updateJob });
};

export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  const job = await jobsModel.findOne({ _id: id });
  if (!job) {
    next(`Job Not Found for id ${id}`);
  }
  if (!req.body.user.userId === job.createdBy.toString()) {
    next("You are not Authorized to Delete this Job");
    return;
  }
  await job.deleteOne();
  res.status(200).json({ success: "true", message: "Success, Job Deleted!" });
};

export const jobStatsController = async (req, res) => {
  const stats = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.body.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  let monthlyApplication = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.body.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return {
        date,
        count,
      };
    })
    .reverse();

  res
    .status(200)
    .json({ totalJobs: stats.length, defaultStats, monthlyApplication });
};
