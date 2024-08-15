import express from "express";
import userAuth from "./../middlewares/authMiddleware.js";
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  getMyJobsController,
  jobStatsController,
  updateJobController,
} from "../controllers/jobsController.js";
import {
  getAllJobApplication,
  getJobApplicant,
  getJobApplicantDetails,
  getMyJobApplication,
  jobApplicationController,
  jobApplicationStatus,
} from "../controllers/jobApplicationController.js";

const router = express.Router();

router.post("/create-job", userAuth, createJobController);

router.get("/get-all-job", userAuth, getAllJobsController);

router.get("/get-my-job", userAuth, getMyJobsController);

router.patch("/update-job/:id", userAuth, updateJobController);

router.delete("/delete-job/:id", userAuth, deleteJobController);

router.get("/job-stats", userAuth, jobStatsController);

router.post("/apply", jobApplicationController);

router.get("/application/status", jobApplicationStatus);

router.get("/all-application", getAllJobApplication);

router.get("/my-application", userAuth, getMyJobApplication);

router.get("/get-applicants", userAuth, getJobApplicant);

router.get("/get-applicant-details/:jobId/:userId", getJobApplicantDetails);

export default router;
