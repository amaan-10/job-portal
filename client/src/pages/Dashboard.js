import React, { useEffect, useState } from "react";
import Banner from "../components/shared/Banner";
import Card from "../components/shared/Card";
import Jobs from "../components/shared/Jobs";
import Sidebar from "../components/shared/Sidebar";
import Newsletter from "../components/shared/Newsletter";
import { BASE_URL } from "../url";
import { current } from "@reduxjs/toolkit";

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/job/get-job`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);

        // dispach(hideLoading());
      });
  }, []);
  // console.log(jobs);

  const [query, setQuery] = useState("");

  const handleInput = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  // const handleLocation = (event) => {
  //   event.preventDefault();
  //   setQuery(event.target.value);
  // };

  // console.log(query);

  const filterJobPosition = jobs.filter(
    (job) => job.position.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );
  // console.log(filterJobPosition);

  // const filterLocation = jobs.filter(
  //   (job) => job.workLocation.toLowerCase().indexOf(query.toLowerCase()) !== -1
  // );
  // console.log(filterLocation);

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleClick = (e) => {
    setSelectedCategory(e.target.value);
  };

  const pageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filterJobPosition.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  let jobsValue = 0;

  const filteredPositionData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    if (query) {
      filteredJobs = filterJobPosition;
    }

    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({ company, workLocation, createdAt, workType }) =>
          workLocation.toLowerCase() === selected.toLowerCase() ||
          company.toLowerCase() === selected.toLowerCase() ||
          createdAt >= selected ||
          workType.toLowerCase() === selected.toLowerCase()
      );
    }
    jobsValue = filteredJobs.length;

    const { startIndex, endIndex } = pageRange();
    const filteredJobsPage = filteredJobs.slice(startIndex, endIndex);

    return filteredJobsPage.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredPositionData(jobs, selectedCategory, query);

  // const filteredLocationData = (jobs, selected, query) => {
  //   let filteredLocation = jobs;

  //   if (query) {
  //     filteredLocation = filterLocation;
  //   }
  //   return filteredLocation.map((data, i) => <Card key={i} data={data} />);
  // };

  return (
    <div>
      <Banner query={query} handleInput={handleInput} />
      <div className="dashboard-job-columns">
        <div
          className=" bg-white p-4 "
          style={{
            borderRadius: "8px",
            border: "2px solid rgba(20, 20, 20, 0.05)",
            background: "#FFF",
            padding: "15px",
            boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
          }}
        >
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        <div
          className="  bg-white p-3 p-md-4 me-3 me-sm-0"
          style={{
            borderRadius: "8px",
            border: "2px solid rgba(20, 20, 20, 0.05)",
            background: "#FFF",
            padding: "15px",
            boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
            gridColumn: "span 2 / span 2",
          }}
        >
          {result.length > 0 ? (
            <Jobs result={result} jobsValue={jobsValue} />
          ) : (
            <>
              <h3
                style={{
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "30px",
                }}
              >
                {result.length} Jobs
              </h3>
              <p>No data Found..!!</p>
            </>
          )}
          {result.length > 0 ? (
            <div className="d-flex justify-content-center my-4 ">
              <button
                className="border-0 bg-transparent mx-3"
                id="hover"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of {Math.ceil(jobsValue / itemsPerPage)}
              </span>
              <button
                className="border-0 bg-transparent mx-3"
                id="hover"
                onClick={nextPage}
                disabled={currentPage === Math.ceil(jobsValue / itemsPerPage)}
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
