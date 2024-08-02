import React, { useEffect, useState } from "react";
import {
  faAngleLeft,
  faBriefcaseClock,
  faCalendarDays,
  faClock,
  faLessThan,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_URL } from "../url";
import { Link, useParams } from "react-router-dom";

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
  // console.log(jobs);

  return (
    <div>
      <div className="px-4 px-sm-5 pt-3">
        <p>
          <Link to="/dashboard" className=" hover">
            <FontAwesomeIcon icon={faAngleLeft} className=" pe-2" />
            Back to Dashboard
          </Link>
        </p>
      </div>
      {jobs.map((job) => (
        <div className="p-4 p-sm-5">
          <h3>Job Details</h3>
          <div
            className=" bg-white p-3 p-md-4 me-3 me-sm-0"
            style={{
              borderRadius: "8px",
              border: "2px solid rgba(20, 20, 20, 0.05)",
              background: "#FFF",
              padding: "15px",
              boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
            }}
          >
            <h4 className=" fw-semibold ">{job.company}</h4>
            <h5>{job.position}</h5>
            <div className="d-flex gap-5 pt-4 flex-wrap">
              <div className=" d-flex flex-column">
                <h6>Work Location </h6>
                <p>
                  <FontAwesomeIcon className="pe-2" icon={faLocationDot} />
                  {job.workLocation}
                </p>
              </div>
              <div>
                <h6>Work Type </h6>
                <p>
                  <FontAwesomeIcon className="pe-2" icon={faBriefcaseClock} />
                  {job.workType}
                </p>
              </div>
            </div>
            <div className=" pt-4">
              <h6>Description </h6>
              <p
                style={{
                  borderRadius: "8px",
                  border: "2px solid rgba(20, 20, 20, 0.05)",
                  background: "#FFF",
                  padding: "15px",
                  boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
                }}
              >
                {job.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobDetails;
