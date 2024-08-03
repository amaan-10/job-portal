import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BASE_URL } from "../url";
const PostJobs = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    // console.log(data);
    fetch(`${BASE_URL}/api/v1/job/create-job`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((job) => {
        if (job.success) {
          toast.success("Job Created Successfully");
        } else {
          toast.error(job.error);
        }
        // console.log(job);
        reset();
      });
  };

  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
    const istNow = new Date(now.getTime() + istOffset);
    const formattedDateTime = istNow.toISOString().slice(0, 16);
    setCurrentDateTime(formattedDateTime);
  }, []);

  return (
    <div className=" conatiner-xl mx-auto p-md-5 mt-2 mt-md-0">
      <div className="job-container p-sm-5">
        <h3 className="text-center pt-3 pb-4 m-0">Create Job</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4 me-lg-4">
            <div className="col-lg-6 col-12">
              <p className="d-block mb-2 text-lg required-field">Job Title</p>
              <input
                type="text"
                placeholder="Ex: Web Devlopment"
                {...register("position")}
                className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
              />
            </div>
            <div className="col-lg-6 col-12">
              <p className="d-block mb-2 text-lg required-field">
                Company Name
              </p>
              <input
                type="text"
                placeholder="Ex: Microsoft"
                {...register("company")}
                className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
              />
            </div>
          </div>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4 me-lg-4">
            <div className="col-lg-6 col-12">
              <p className="d-block mb-2 text-lg required-field">Job Type</p>
              <select
                {...register("workType")}
                className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
              >
                <option value="">Choose Job Type</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="intership">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div className="col-lg-6 col-12">
              <p className="d-block mb-2 text-lg required-field">
                Work Location
              </p>
              <input
                type="text"
                placeholder="Ex: Pune"
                {...register("workLocation")}
                className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
              />
            </div>
          </div>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4 me-lg-4">
            <div className="col-lg-6 col-12">
              <p className="d-block mb-2 text-lg">About the Organisation</p>
              <input
                type="text"
                placeholder="About..."
                {...register("about")}
                className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
              />
            </div>
            <div className="col-lg-6 col-12">
              <p className="d-block mb-2 text-lg required-field">
                Cost to Company (CTC)/Stipend
              </p>
              <input
                type="text"
                placeholder="Ex. INR 6,00,000"
                {...register("ctc")}
                className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
              />
            </div>
          </div>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4 me-lg-5">
            <div className="col-lg-4 col-12">
              <p className="d-block mb-2 text-lg required-field">Job Opening</p>
              <input
                type="datetime-local"
                value={currentDateTime}
                {...register("openingAt")}
                className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
              />
            </div>
            <div className="col-lg-4 col-12">
              <p className="d-block mb-2 text-lg required-field">Job Closing</p>
              <input
                type="datetime-local"
                {...register("closesAt")}
                className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
              />
            </div>
            <div className="col-lg-4 col-12">
              <p className="d-block mb-2 text-lg">Duration (Internship)</p>
              <input
                type="text"
                placeholder="Ex. 6 Months"
                {...register("duration")}
                className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
              />
            </div>
          </div>
          <div className="col-md-12 mb-4">
            <p className="d-block mb-2 text-lg required-field">
              Eligibility Criteria
            </p>
            <textarea
              className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
              rows={3}
              placeholder="Eligibility Criteria..."
              {...register("eligibility")}
            />
          </div>
          <div className="col-md-12 mb-4">
            <p className="d-block mb-2 text-lg required-field">
              Job Description
            </p>
            <textarea
              className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
              rows={6}
              placeholder="Job Description..."
              {...register("description")}
            />
          </div>
          <div className="col-md-12 mb-4">
            <p className="d-block mb-2 text-lg">Other Details</p>
            <textarea
              className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
              rows={6}
              placeholder="Other Details..."
              {...register("otherDetails")}
            />
          </div>

          <input
            type="submit"
            className="d-block mt-4 bg-primary text-white px-4 py-2 form-control-sm form-control-sm-leading-6 rounded-sm cursor-pointer"
            style={{ width: "8rem" }}
          />
        </form>
      </div>
    </div>
  );
};

export default PostJobs;
