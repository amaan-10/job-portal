import {
  faCalendarDays,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  const { company, position, workLocation, createdAt, workType, description } =
    data;
  const date = createdAt.substring(0, 10);
  return (
    <section
      style={{
        margin: "20px",
        border: "2px solid #ededed",
        padding: "20px",
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
              gap: "24px",
              padding: "2px 0px",
            }}
            className="text-muted"
          >
            <span className="d-flex  align-items-center gap-2">
              <FontAwesomeIcon className="text-muted" icon={faLocationDot} />
              {workLocation}
            </span>
            <span className="d-flex text-muted align-items-center gap-2">
              <FontAwesomeIcon className="text-muted" icon={faClock} />
              {workType}
            </span>
            <span className="d-flex text-muted align-items-center gap-2">
              <FontAwesomeIcon className="text-muted" icon={faCalendarDays} />
              {date}
            </span>
          </div>
          <p
            className="text-muted"
            style={{
              paddingTop: "6px",
              fontSize: "14px",
              lineHeight: "1.5rem",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Card;
