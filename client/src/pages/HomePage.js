import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#f7f8fa",
          textAlign: "center",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            width: "100%",
            paddingRight: "15px",
            paddingLeft: "15px",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <h1
            style={{
              fontSize: "40px",
              fontWeight: "700",
              paddingBottom: "1rem",
            }}
          >
            "Connecting Dreams to Careers:
            <br />
            Your Gateway to
            <span className="text-primary"> Professional Success</span> !"
          </h1>
          <h6
            style={{
              fontWeight: "400",
              color: "#6e6e6e ",
              paddingBottom: "1rem",
            }}
          >
            Welcome to our Job Portal – the platform where aspirations meet
            opportunities! <br /> Our job portal is your dedicated companion on
            the journey to professional success. <br /> We specialize in
            connecting talented individuals with a diverse array of career
            paths, <br /> providing a seamless experience for job seekers and
            employers alike.
          </h6>
          <div>
            <Link to="/dashboard">
              <button className="btn btn-opacity-light mr-1">
                Job Seekers Portal
              </button>
            </Link>
            <Link to="/post-job">
              <button className="btn btn-opacity-success ml-1">
                Employers Portal
              </button>
            </Link>
          </div>
          <img
            src="/assets/images/Group171.svg"
            style={{ maxWidth: "100%", height: "auto", marginTop: "16px" }}
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
