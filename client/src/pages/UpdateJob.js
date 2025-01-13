import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/shared/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { BASE_URL } from "../url";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateJob = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);

  const { loading } = useSelector((state) => state.alerts);
  const dispach = useDispatch();

  const [selectedOption, setSelectedOption] = useState(null);
  const [requiredSkills, setRequiredSkills] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/job/get-my-job?id=${id}`, {
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
      body: JSON.stringify({ ...data, requiredSkills: requiredSkills || [] }),
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
          toast.error(job.error.message);
          //console.log(job);
        }
        //console.log(job);
      });
    dispach(hideLoading());
  };

  return (
    <div className=" conatiner-xl mx-auto p-md-5 mt-2 mt-md-0">
      <div className="job-container p-sm-5">
        <h3 className="text-center pt-3 pb-4 m-0">Update Job</h3>

        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {jobs.map((job) => (
              <>
                <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4 me-lg-4">
                  <div className="col-lg-6 col-12">
                    <p className="d-block mb-2 text-lg required-field">
                      Job Title
                    </p>
                    <input
                      type="text"
                      placeholder="Ex: Web Devlopment"
                      defaultValue={job.position}
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
                      defaultValue={job.company}
                      {...register("company")}
                      className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4 me-lg-4">
                  <div className="col-lg-6 col-12">
                    <p className="d-block mb-2 text-lg required-field">
                      Job Type
                    </p>
                    <div className="d-flex">
                      <select
                        {...register("workType")}
                        className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                      >
                        <option value={job.workType}>{job.workType}</option>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="intership">Internship</option>
                        <option value="contract">Contract</option>
                      </select>
                      <FontAwesomeIcon
                        style={{
                          position: "relative",
                          margin: "0.8rem",
                          marginRight: "0.3rem",
                          color: "#6f6f6f",
                        }}
                        icon={faCaretDown}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    <p className="d-block mb-2 text-lg required-field">
                      Work Location
                    </p>
                    <input
                      type="text"
                      placeholder="Ex: Pune"
                      defaultValue={job.workLocation}
                      {...register("workLocation")}
                      className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4 me-lg-4">
                  <div className="col-lg-6 col-12">
                    <p className="d-block mb-2 text-lg">
                      About the Organisation
                    </p>
                    <input
                      type="text"
                      placeholder="Ex. https://company-link.com"
                      {...register("about")}
                      defaultValue={job.about}
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
                      defaultValue={job.ctc}
                      className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4 me-lg-5">
                  <div className="col-lg-4 col-12">
                    <p className="d-block mb-2 text-lg required-field">
                      Job Opening
                    </p>
                    <input
                      type="datetime-local"
                      defaultValue={job.openingAt}
                      {...register("openingAt")}
                      className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                    />
                  </div>
                  <div className="col-lg-4 col-12">
                    <p className="d-block mb-2 text-lg required-field">
                      Job Closing
                    </p>
                    <input
                      type="datetime-local"
                      defaultValue={job.closesAt}
                      {...register("closesAt")}
                      className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                    />
                  </div>
                  <div className="col-lg-4 col-12">
                    <p className="d-block mb-2 text-lg">
                      Duration (Internship)
                    </p>
                    <input
                      type="text"
                      placeholder="Ex. 6 Months"
                      {...register("duration")}
                      defaultValue={job.duration}
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
                    defaultValue={job.eligibility}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <p className="d-block mb-2 text-lg required-field">
                    Skills Required
                  </p>
                  <textarea
                    className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                    rows={2}
                    placeholder="Skills Required..."
                    defaultValue={job.requiredSkills.join(", ")}
                    onChange={(e) => {
                      const value = e.target.value;
                      const skillsArray = value
                        .split(",")
                        .map((skill) => skill.trim());
                      setRequiredSkills(skillsArray);
                    }}
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
                    defaultValue={job.description}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <p className="d-block mb-2 text-lg">Other Details</p>
                  <textarea
                    className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                    rows={6}
                    placeholder="Other Details..."
                    {...register("otherDetails")}
                    defaultValue={job.otherDetails}
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
