import React, { useEffect, useState } from "react";
import Banner from "../components/shared/Banner";
import Card from "../components/shared/Card";
import Jobs from "../components/shared/Jobs";
import Sidebar from "../components/shared/Sidebar";
import Newsletter from "../components/shared/Newsletter";

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/job/get-job", {
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
    setQuery(event.target.value);
  };

  // console.log(query);

  const filterItems = jobs.filter(
    (job) => job.position.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );
  console.log(filterItems);

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleClick = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    if (query) {
      filteredJobs = filterItems;
    }

    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({ company, workLocation, createdAt, workType }) =>
          workLocation.toLowerCase() === selected.toLowerCase() ||
          company.toLowerCase() === selected.toLowerCase() ||
          createdAt >= selected ||
          workType.toLowerCase() === selected.toLowerCase()
      );
      console.log(filteredJobs);
    }

    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInput={handleInput} />
      <div
        style={{
          paddingTop: "3rem",
          paddingBottom: "3rem",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "1rem",
          background: "#FAFAFA",
          display: "grid",
          paddingLeft: "3rem",
          paddingRight: "3rem",
        }}
      >
        <div className=" bg-white p-4 rounded-1">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        <div
          className=" bg-white p-4 rounded-1"
          style={{ gridColumn: "span 2 / span 2" }}
        >
          {result.length > 0 ? (
            <Jobs result={result} />
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
          {/* {result.length > 0 ? (
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
                Page {currentPage} of{" "}
                {Math.ceil(filterItems.length / itemsPerPage)}
              </span>
              <button
                className="border-0 bg-transparent mx-3"
                id="hover"
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filterItems.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )} */}
        </div>
        <div className="">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
