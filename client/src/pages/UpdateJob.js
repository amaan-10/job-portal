import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/shared/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { BASE_URL } from "../url";

const UpdateJob = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);

  const { loading } = useSelector((state) => state.alerts);
  const dispach = useDispatch();

  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/job/get-job?id=${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        dispach(hideLoading());
        setJobs(data);
      });
  }, []);
  // console.log(jobs);
  const onSubmit = (data) => {
    data.skills = selectedOption;
    // console.log(data);
    fetch(`${BASE_URL}/api/v1/job/update-job/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((job) => {
        if (job.success) {
          dispach(showLoading());
          toast.success("Job Updated Successfully");
          setTimeout(function () {
            window.location.reload();
          }, 3000);
        } else {
          toast.error(job.error);
        }
        // console.log(job);
      });
    dispach(hideLoading());
  };

  return (
    <div className=" conatiner-xl mx-auto px-5 pl-4 m-5">
      <div className="job-container p-sm-5">
        <h3 className="text-center pt-3 pb-4 m-0">Create Job</h3>
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {jobs.map((job) => (
              <>
                <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4">
                  <div className="col-lg-6 col-12">
                    <p className="d-block mb-2 text-lg">Job Title</p>
                    <input
                      type="text"
                      placeholder="Ex: Web Devlopment"
                      defaultValue={job.position}
                      {...register("position")}
                      className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                    />
                  </div>
                  <div className="col-lg-6 col-12">
                    <p className="d-block mb-2 text-lg">Company Name</p>
                    <input
                      type="text"
                      placeholder="Ex: Microsoft"
                      defaultValue={job.company}
                      {...register("company")}
                      className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4">
                  <div className="col-lg-6 col-12">
                    <p className="d-block mb-2 text-lg">Job Type</p>
                    <select
                      {...register("workType")}
                      className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                    >
                      <option value={job.workType}>{job.workType}</option>
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="intership">Intership</option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>
                  <div className="col-lg-6 col-12">
                    <p className="d-block mb-2 text-lg">Work Location</p>
                    <input
                      type="text"
                      placeholder="Ex: Pune, Maharashtra"
                      defaultValue={job.workLocation}
                      {...register("workLocation")}
                      className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <p className="d-block mb-2 text-lg">Job Description</p>
                  <textarea
                    className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                    rows={6}
                    placeholder="Job Description..."
                    defaultValue={job.description}
                    {...register("description")}
                  />
                </div>

                <input
                  type="submit"
                  className="d-block mt-4 bg-primary text-white px-4 py-2 form-control-sm form-control-sm-leading-6 rounded-sm cursor-pointer"
                  style={{ width: "8rem" }}
                />
              </>
            ))}
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateJob;
