import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center h-100">
      <a href="/" className="notfound-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="49"
          height="50"
          viewBox="0 0 29 30"
          fill="none"
        >
          <circle
            cx="12.0143"
            cy="12.5143"
            r="12.0143"
            fill="#3575E2"
            fillOpacity="0.4"
          />
          <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
        </svg>
      </a>
      <h1> Not Found</h1>
      <Link className="btn btn-success" to="/">
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
