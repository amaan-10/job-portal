import {
  faAngleRight,
  faBriefcaseClock,
  faCalendarDays,
  faClock,
  faIndianRupeeSign,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
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
  return (
    <Link to={`/job-details/${_id}`} className=" text-decoration-none">
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
