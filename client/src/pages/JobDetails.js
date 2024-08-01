import React, { useEffect, useState } from "react";
import {
  faBriefcaseClock,
  faCalendarDays,
  faClock,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      });
  }, []);

  return (
    <div>
      {jobs.map((job) => (
        <div className="p-4 p-sm-5">
          <h3>Job Details</h3>
          <p>{job.company}</p>
          <p>
            <FontAwesomeIcon className="pe-2" icon={faUser} />
            {job.position}
          </p>
          <p>
            <FontAwesomeIcon className="pe-2" icon={faLocationDot} />
            {job.workLocation}
          </p>
          <p>
            <FontAwesomeIcon className="pe-2" icon={faBriefcaseClock} />
            {job.workType}
          </p>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default JobDetails;
