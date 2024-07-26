import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="div-conatiner ">
        <h1 className="title-heading">
          "Connecting Dreams to Careers:
          <br />
          Your Gateway to
          <span className="text-primary"> Professional Success</span> !"
        </h1>
        <h6 className="description">
          Welcome to our Job Portal - the platform where aspirations meet
          opportunities! <br /> Our job portal is your dedicated companion on
          the journey to professional success. <br /> We specialize in
          connecting talented individuals with a diverse array of career paths,
          <br /> providing a seamless experience for job seekers and employers
          alike.
        </h6>
        <div>
          <Link to="/dashboard">
            <button className="btn btn-opacity-light m-1">
              Job Seekers Portal
            </button>
          </Link>
          <Link to="/post-job">
            <button className="btn btn-opacity-success m-1">
              Employers Portal
            </button>
          </Link>
        </div>
        <img src="/assets/images/Group171.svg" className="img-fluid" />
      </div>
    </div>
  );
};

export default HomePage;
