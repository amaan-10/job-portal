import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { BASE_URL } from "../url";
import axios from "axios";

import {
  faAngleRight,
  faBriefcaseClock,
  faCalendarDays,
  faClock,
  faEnvelope,
  faIndianRupeeSign,
  faLocationDot,
  faUserClock,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UsersApplications = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    //dispatch(showLoading());

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
          `${BASE_URL}/api/v1/job/get-applicants?id=${id}`,
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

  //console.log(jobs);

  return (
    <div>
      <div className=" max-w-screen-2xl mx-auto px-md-5 px-3 pt-3 pt-md-4 pb-3 ">
        <h3 className=" fw-bold">Job Applicants</h3>
      </div>
      <div
        className=" mx-4 bg-white p-3 p-md-4 "
        style={{
          borderRadius: "8px",
          border: "2px solid rgba(20, 20, 20, 0.05)",
          background: "#FFF",
          padding: "15px",
          boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
          gridColumn: "span 2 / span 2",
        }}
      >
        {applicants.map((applicant, index) => (
          <Link
            to={`/my-job/users-applications/applicant-details/${id}/${applicant._id}`}
            className=" text-decoration-none"
          >
            <section
              className=" my-3 mx-1 p-3 px-4"
              style={{
                border: "2px solid #ededed",
                cursor: "pointer",
                borderRadius: "8px",
              }}
            >
              <div style={{ textDecoration: "none" }}>
                <div>
                  <h4
                    style={{
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "30px",
                    }}
                    className="text-black h4 mb-0"
                  >
                    {applicant.name} {applicant.lastName}
                  </h4>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "27px",
                    }}
                    className="text-black h4 mb-1"
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className=" text-muted me-2"
                    />
                    {applicant.email}
                  </h4>

                  <div
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      padding: "2px 0px",
                    }}
                    className=" d-flex gap-lg-2 flex-wrap text-muted"
                  >
                    <span className="d-flex  align-items-center pe-3 gap-2">
                      <FontAwesomeIcon
                        className="text-muted"
                        icon={faLocationDot}
                      />
                      {applicant.location}
                    </span>
                    <span className="d-flex text-muted align-items-center pe-3 gap-2">
                      <FontAwesomeIcon
                        className="text-muted"
                        icon={faUserTie}
                      />
                      {applicant.experience}
                    </span>
                  </div>
                  <p
                    className="text-muted"
                    style={{
                      paddingTop: "6px",
                      fontSize: "14px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      lineClamp: "2",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {applicant.bio}
                  </p>
                  <div className="hover text-end">
                    View details <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
              </div>
            </section>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UsersApplications;
