import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <main className="pt-4">
        <div className="p-5 py-md-5 py-0 my-2 my-sm-5">
          <div className="row">
            <div className="col-md-6 d-flex justify-content-md-center">
              <svg
                className="notfound-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="249"
                height="250"
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
            </div>
            <div className="col-md-6 align-self-center pt-sm-3">
              <h1 style={{ fontSize: "60px", fontWeight: "bold" }}>404</h1>
              <h2>UH OH! You're lost.</h2>
              <p>
                The page you are looking for does not exist. How you got here is
                a mystery. But you can click the button below to go back to the
                homepage.
              </p>
              <button
                type="button"
                className=" bg-primary px-3 py-2 rounded-2 my-3 border-0 text-light"
              >
                <Link
                  className=" text-decoration-none bg-primary px-4 py-2 rounded-2 my-3 border-0 text-light"
                  to="/"
                >
                  Go Back
                </Link>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
