import React, { useEffect, useState } from "react";
import { BASE_URL } from "../url";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);

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
        setJobs(data);
        console.log(data);
      });
  }, []);

  console.log(jobs);
  return (
    <div>
      {jobs.map((job) => (
        <div>
          <h1>Job Details</h1>
          <p>{job.company}</p>
          <p>{job.position}</p>
          <p>{job.workLocation}</p>
          <p>{job.workType}</p>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default JobDetails;
