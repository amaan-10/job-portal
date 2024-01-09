import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";

const Banner = ({ query, handleInput }) => {
  return (
    <div className="  max-w-screen-2xl mx-auto xl:px-24 px-5 md:py-20 py-5 ">
      <h1 style={{ fontWeight: "600" }} className=" text-black mb-3">
        Find your <span style={{ color: "blue" }}> new job </span> today.
      </h1>
      <p className="text-lg text-black-70 mb-8">
        Thousands of jobs in the computer, engineering and technology sectors
        are waiting for you.
      </p>
      <form>
        <div className="d-flex justify-content-start flex-md-row flex-column md-gap-0 gap-2">
          <div className="d-flex md-rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within-ring-2 focus-within-ring-inset focus-within-ring-indigo-600 col-md-6 col-12">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="What position you are looking for?"
              style={{ paddingLeft: "2rem" }}
              className="form-control d-block flex-1 border-2 bg-transparent text-gray-900 placeholder-text-gray-400 focus-right-0 form-control-sm form-control-sm-leading-6"
              onChange={handleInput}
              value={query}
            />
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                position: "absolute",
                marginLeft: "0.8rem",
                marginTop: "0.8rem",
                color: "#9CA3AF",
              }}
            />
          </div>
          {/* <div className="d-flex md-rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within-ring-2 focus-within-ring-inset focus-within-ring-indigo-600 col-md-4 col-12">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Location"
              style={{ paddingLeft: "2rem" }}
              className="form-control d-block flex-1 border-2 bg-transparent text-gray-900 placeholder-text-gray-400 focus-right-0 form-control-sm form-control-sm-leading-6"
              onChange={handleCompany}
              value={query1}
            />
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{
                position: "absolute",
                marginLeft: "0.8rem",
                marginTop: "0.8rem",
                color: "#9CA3AF",
              }}
            />
          </div> */}
          <button
            type="submit"
            className="bg-primary border-0 py-2 px-5 border-1 text-white md-rounded-s-none rounded"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Banner;
