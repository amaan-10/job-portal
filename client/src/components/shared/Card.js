import {
  faAngleRight,
  faBriefcaseClock,
  faCalendarDays,
  faClock,
  faIndianRupeeSign,
  faLocationDot,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../../url";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { useDispatch } from "react-redux";

// Component for cards used at dashboard and applications page
const Card = ({ data }) => {
  const location = useLocation();

  const {
    _id,
    company,
    position,
    workLocation,
    openingAt,
    workType,
    description,
    ctc,
  } = data;

  const date = openingAt.substring(0, 10);

  const [status, setApplicantStatus] = useState([]);
  const [userId, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    //fetch user
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/user/get-user`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "application/json",
          },
        });
        //console.log(response.data);
        setUsers(response.data.data._id);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch job applications

  const fetchApplicantsStatus = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/job/get-applicant-status/${_id}/${userId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "application/json",
          },
        }
      );
      //console.log(response.data);
      setTimeout(function () {
        dispatch(hideLoading());
      }, 2000);

      setApplicantStatus(response.data.status);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };
  useEffect(() => {
    fetchApplicantsStatus();
  });

  //console.log(userId);

  return (
    <Link
      to={`${
        window.location.pathname === "/dashboard"
          ? `/dashboard/job-details/${_id}`
          : `/applications/job-details/${_id}`
      }`}
      className=" text-decoration-none"
    >
      <section
        className=" my-3 mx-1 p-3"
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
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "27px",
              }}
              className="text-black h4 mb-1"
            >
              {company}
            </h4>
            <h4
              style={{
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "36px",
              }}
              className="text-black h4 mb-1"
            >
              {position}
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
                <FontAwesomeIcon className="text-muted" icon={faLocationDot} />
                {workLocation}
              </span>
              <span className="d-flex text-muted align-items-center pe-3 gap-2">
                <FontAwesomeIcon
                  className="text-muted"
                  icon={faBriefcaseClock}
                />
                {workType}
              </span>
              <span className="d-flex text-muted align-items-center pe-2 gap-2">
                <FontAwesomeIcon className="text-muted" icon={faCalendarDays} />
                {date}
              </span>
              <span className="d-flex text-muted align-items-center pe-3 gap-2">
                <FontAwesomeIcon
                  className="text-muted"
                  icon={faIndianRupeeSign}
                />
                {ctc}
              </span>
              {location.pathname === "/applications" && (
                <span className="d-flex text-muted align-items-center pe-3 gap-2">
                  <FontAwesomeIcon className="text-muted" icon={faUserClock} />
                  {status}
                </span>
              )}
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
              {description}
            </p>
            <div className="hover text-end">
              View details <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default Card;
