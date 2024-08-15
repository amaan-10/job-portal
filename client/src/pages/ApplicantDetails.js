import React, { useEffect, useState } from "react";
import {
  faAngleLeft,
  faBriefcaseClock,
  faCalendarDays,
  faEnvelope,
  faIndianRupeeSign,
  faLocationDot,
  faUserClock,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_URL } from "../url";
import { Link, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const ApplicantDetails = () => {
  const { jobId, userId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    //dispatch(showLoading());

    fetch(`${BASE_URL}/api/v1/job/get-all-job?id=${jobId}`, {
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
          //dispatch(hideLoading());
        }, 1500);

        setJobs(data);
      });
  }, []);

  useEffect(() => {
    //dispatch(showLoading());
    // Fetch job applications
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/job/get-applicant-details/${jobId}/${userId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
              "content-type": "application/json",
            },
          }
        );
        //console.log(response.data);
        setTimeout(function () {
          //dispatch(hideLoading());
        }, 1500);

        setApplicants(response.data);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };
    fetchApplicants();

    //fetchUsers();
  }, []);

  return (
    <div>
      <div className="px-4 px-sm-5 pt-3">
        <p>
          <Link to="/my-job" className=" hover">
            <FontAwesomeIcon icon={faAngleLeft} /> Back to My Jobs
          </Link>
        </p>
      </div>
      {/* {loading ? (
        <div
          className=" d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spinner />
        </div>
      ) : ( */}
      <>
        {applicants.map((applicant) => (
          <div className="d-flex flex-column flex-md-row">
            <div className="px-md-5 px-3  pe-md-0 col-lg-9 col-md-8 col-12 py-4 ">
              <h3 className=" fw-bold">Job Applicant Details</h3>
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
                <h4 className=" fw-semibold ">
                  {applicant.name} {applicant.lastName}
                </h4>
                <h6>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-muted me-2 "
                  />
                  {applicant.email}
                </h6>
                <div className="d-flex flex-wrap">
                  <div className="pt-4 pe-5 me-5">
                    <h6>Location </h6>
                    <p>
                      <FontAwesomeIcon
                        className="text-muted me-2"
                        icon={faLocationDot}
                      />
                      {applicant.location}
                    </p>
                  </div>
                  <div className="pt-4 pe-5 me-5">
                    <h6>Experience</h6>
                    <p>
                      <FontAwesomeIcon
                        className="text-muted me-2"
                        icon={faUserTie}
                      />
                      {applicant.experience}
                    </p>
                  </div>

                  <div className="pt-4 ">
                    <h6>Experience Years</h6>

                    <p>
                      <FontAwesomeIcon className="pe-2" icon={faCalendarDays} />
                      {applicant.expyrs}
                    </p>
                  </div>
                </div>
                <div className=" pt-4">
                  <h6>Qualification </h6>
                  <p
                    style={{
                      borderRadius: "8px",
                      border: "2px solid rgba(20, 20, 20, 0.05)",
                      background: "#FFF",
                      padding: "15px",
                      boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    {applicant.qualification}
                  </p>
                </div>
                <div className=" pt-4">
                  <h6>Projects </h6>
                  <p
                    style={{
                      borderRadius: "8px",
                      border: "2px solid rgba(20, 20, 20, 0.05)",
                      background: "#FFF",
                      padding: "15px",
                      boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    {applicant.projects}
                  </p>
                </div>
                <div className=" pt-4">
                  <h6>Past Experience </h6>
                  <p
                    style={{
                      borderRadius: "8px",
                      border: "2px solid rgba(20, 20, 20, 0.05)",
                      background: "#FFF",
                      padding: "15px",
                      boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    {applicant.pastexp}
                  </p>
                </div>
                <div className=" pt-4">
                  <h6>Biography</h6>
                  <p
                    style={{
                      borderRadius: "8px",
                      border: "2px solid rgba(20, 20, 20, 0.05)",
                      background: "#FFF",
                      padding: "15px",
                      boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    {applicant.bio}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-sm-4 px-3 mt-md-5 col-lg-3 col-md-4  py-md-3 ">
              <h6>Social Media</h6>
              <div
                className=" bg-white p-3 mb-3 p-md-3 me-0"
                style={{
                  borderRadius: "8px",
                  border: "2px solid rgba(20, 20, 20, 0.05)",
                  background: "#FFF",
                  boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
                }}
              >
                <p>
                  <FontAwesomeIcon icon={faGithub} />
                </p>
                <p>
                  <FontAwesomeIcon icon={faLinkedin} />
                </p>
              </div>

              {/* {isApplied ? (
                  <>
                    <h6> Status</h6>
                    <div
                      className=" bg-white p-3 mb-3 p-md-3 me-0"
                      style={{
                        borderRadius: "8px",
                        border: "2px solid rgba(20, 20, 20, 0.05)",
                        background: "#FFF",
                        boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
                      }}
                    >
                      <p>
                        <FontAwesomeIcon
                          className="text-muted me-2"
                          icon={faUserClock}
                        />
                        {job.status}
                      </p>
                    </div>
                    <p>You have already applied for this job.</p>
                  </>
                ) : (
                  <>
                    <div className={`${menuOpen ? "d-none" : ""} w-100 my-2`}>
                      <button
                        className="bg-primary w-100 border-0 py-2 px-5 mb-4 border-1 text-white md-rounded-s-none rounded"
                        onClick={handleMenu}
                        disabled={isApplying}
                      >
                        {isApplying ? "Applying..." : "Apply for this Job"}
                      </button>
                      {message && <p>{message}</p>}
                    </div>
                    <div className={`${menuOpen ? "" : "d-none "} mt-2`}>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={onFileChange}
                      />
                      <button
                        onClick={() => {
                          onUpload();
                          //handleApply();
                        }}
                        className="w-100 d-block py-2 pl-3 my-3 border-1 form-control focus-outline-none bg-primary form-control-sm rounded-sm text-white cursor-pointer font-weight-bold"
                      >
                        Upload Your Resume
                      </button>
                    </div>
                  </>
                )} */}
            </div>
          </div>
        ))}
      </>
      {/* )} */}
    </div>
  );
};

export default ApplicantDetails;
