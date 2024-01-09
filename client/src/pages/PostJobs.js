import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
    fetch("http://localhost:8080/api/v1/job/create-job", {
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
        console.log(job);
        reset();
      });
  };

  return (
    <div className=" conatiner-xl mx-auto px-xl-4 px-5 pl-4 m-5">
      <div
        style={{
          paddingTop: "2.5rem",
          paddingBottom: "2.5rem",
          background: "#EFEFEF",
          paddingLeft: "4rem",
          paddingRight: "4rem",
        }}
        className="md-px-3"
      >
        <h3 className="text-center p-5">Create Job</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4">
            <div className="col-lg-6 col-md-12">
              <p className="d-block mb-2 text-lg">Job Title</p>
              <input
                type="text"
                placeholder="Ex: Web Devlopment"
                {...register("position")}
                className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
              />
            </div>
            <div className="col-lg-6 col-md-12">
              <p className="d-block mb-2 text-lg">Company Name</p>
              <input
                type="text"
                placeholder="Ex: Microsoft"
                {...register("company")}
                className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
              />
            </div>
          </div>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4">
            <div className="col-lg-6 col-md-12">
              <p className="d-block mb-2 text-lg">Job Type</p>
              <select
                {...register("workType")}
                className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
              >
                <option value="">Choose Job Type</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="intership">Intership</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div className="col-lg-6 col-md-12">
              <p className="d-block mb-2 text-lg">Work Location</p>
              <input
                type="text"
                placeholder="Ex: Pune, Maharashtra"
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
              {...register("description")}
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
