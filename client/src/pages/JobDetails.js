import React, { useEffect, useState } from "react";
import {
  faAngleLeft,
  faBriefcaseClock,
  faIndianRupeeSign,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_URL } from "../url";
import { Link, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";

const JobDetails = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);

  const { loading } = useSelector((state) => state.alerts);
  const dispach = useDispatch();

  useEffect(() => {
    dispach(showLoading());

    fetch(`${BASE_URL}/api/v1/job/get-all-job?id=${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        setTimeout(function () {
          dispach(hideLoading());
        }, 1000);

        setJobs(data);
      });
  }, []);

  return (
    <div>
      <div className="px-4 px-sm-5 pt-3">
        <p>
          <Link to="/dashboard" className=" hover">
            <FontAwesomeIcon icon={faAngleLeft} /> Back to Dashboard
          </Link>
        </p>
      </div>
      {loading ? (
        <div
          className=" d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          {jobs.map((job) => (
            <div className="d-flex flex-column flex-md-row">
              <div className="px-md-5 px-3  pe-md-0 col-lg-9 col-md-8 col-12 py-4 ">
                <h3>Job Details</h3>
                <div
                  className=" bg-white p-3 p-md-4 me-0"
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
                  <div className="d-flex flex-wrap">
                    <div className="pt-4 pe-5 me-5">
                      <h6>Work Type </h6>
                      <p>
                        <FontAwesomeIcon
                          className="pe-2"
                          icon={faBriefcaseClock}
                        />
                        {job.workType}
                      </p>
                    </div>
                    <div className="pt-4 pe-5 me-5">
                      <h6>Work Location </h6>
                      <p>
                        <FontAwesomeIcon
                          className="pe-2"
                          icon={faLocationDot}
                        />
                        {job.workLocation}
                      </p>
                    </div>
                    <div className="pt-4 ">
                      {job.workType === "internship" ? (
                        <h6>Stipend</h6>
                      ) : (
                        <h6>Cost to Company(CTC)</h6>
                      )}
                      <p>
                        <FontAwesomeIcon
                          className="pe-2"
                          icon={faIndianRupeeSign}
                        />
                        {job.ctc}
                      </p>
                    </div>
                  </div>
                  <div className=" pt-4">
                    <h6>Eligibility Criteria </h6>
                    <p
                      style={{
                        borderRadius: "8px",
                        border: "2px solid rgba(20, 20, 20, 0.05)",
                        background: "#FFF",
                        padding: "15px",
                        boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
                      }}
                    >
                      {job.eligibility}
                    </p>
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
                  <div className=" pt-4">
                    <h6>Other Details </h6>
                    <p
                      style={{
                        borderRadius: "8px",
                        border: "2px solid rgba(20, 20, 20, 0.05)",
                        background: "#FFF",
                        padding: "15px",
                        boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
                      }}
                    >
                      {job.otherDetails}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-sm-4 px-3 mt-md-5 col-lg-3 col-md-4  py-md-3 ">
                <h6> Registration Schedule</h6>
                <div
                  className=" bg-white p-3 mb-3 p-md-3 me-0"
                  style={{
                    borderRadius: "8px",
                    border: "2px solid rgba(20, 20, 20, 0.05)",
                    background: "#FFF",
                    boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <div>Opens: {job.openingAt}</div>
                  <div>Closes: {job.closesAt}</div>
                </div>
                <h6> About the Company</h6>
                <div
                  className=" bg-white p-3 mb-3 p-md-3 me-0"
                  style={{
                    borderRadius: "8px",
                    border: "2px solid rgba(20, 20, 20, 0.05)",
                    background: "#FFF",
                    padding: "15px",
                    boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <>Website </>
                  <span>
                    <a href={job.about} target="_blank">
                      {job.about}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default JobDetails;
