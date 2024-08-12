import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../url";
import Card from "../components/shared/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Jobs from "../components/shared/Jobs";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  const pageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(applications.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  let applicationValue = 0;

  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSort = async (value) => {
    const response = await axios.get(
      `${BASE_URL}/api/v1/job/my-application?sort=${value}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }
    );
    //console.log(response.data);
    setApplications(response.data);
  };

  useEffect(() => {
    dispatch(showLoading());
    // Fetch job applications
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/job/my-application`,
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
        }, 1500);

        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    // Fetch jobs
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/job/get-all-job`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "application/json",
          },
        });
        //console.log(response.data);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    // Fetch users
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/user/get-user`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "application/json",
          },
        });
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchApplications();
    fetchJobs();
    //fetchUsers();
  }, []);

  const jobIdArray = () => {
    return applications.map((app) => app.jobId);
  };

  const jobId = jobIdArray();
  let jobApplications = [];

  const getJobDetails = (jobIds) => {
    jobIds.map((jobId) => {
      const job = jobs.find((j) => j._id === jobId);
      jobApplications.push(job);
    });
    applicationValue = jobApplications.length;
    const { startIndex, endIndex } = pageRange();
    const applicationsPage = jobApplications.slice(startIndex, endIndex);
    //console.log(jobApplications);
    return jobApplications.map((data, i) => <Card key={i} data={data} />);
    // console.log(job);
    // return job ? `${job.company} - ${job.position}` : "Unknown Job";
  };
  const result = getJobDetails(jobId);
  // console.log(jobId);

  return (
    <div>
      {loading ? (
        <div
          className=" d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spinner />
        </div>
      ) : (
        <div className=" max-w-screen-2xl mx-auto px-md-5 px-3 pt-3 pt-md-5 pb-5 ">
          <h3 style={{ fontWeight: "600" }} className=" text-black mb-3 ">
            Job Applications
          </h3>
          <div className="d-flex flex-md-nowrap flex-wrap">
            <div
              className="bg-white p-3 p-md-4 mb-2 me-2 col-md-2 col-12 "
              style={{
                borderRadius: "8px",
                border: "2px solid rgba(20, 20, 20, 0.05)",
                background: "#FFF",
                padding: "15px",
                boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
              }}
            >
              <div className=" d-flex pe-4 pe-sm-3">
                <h3
                  style={{
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "30px",
                    marginBottom: "0px",
                  }}
                >
                  Sort
                </h3>
                <button
                  onClick={handleMenu}
                  className="bg-transparent border-0 d-md-none w-100"
                  style={{ paddingLeft: "85%" }}
                >
                  {menuOpen ? (
                    <FontAwesomeIcon
                      className=" text-black"
                      style={{ width: 20, height: 20, float: "right" }}
                      icon={faXmark}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className=" text-black"
                      style={{ width: 20, height: 20, float: "right" }}
                      icon={faArrowDownWideShort}
                    />
                  )}
                </button>
              </div>
              <div className={`${menuOpen ? "" : "d-none d-md-block"} mt-4 `}>
                <label className="sidebar-label-container">
                  <input
                    type="radio"
                    name={"test"}
                    value={"latest"}
                    onClick={() => handleSort("latest")}
                  />
                  <span className="checkmark"></span>
                  {"latest"}
                </label>
                <label className="sidebar-label-container">
                  <input
                    type="radio"
                    name={"test"}
                    value={"oldest"}
                    onClick={() => handleSort("oldest")}
                  />
                  <span className="checkmark"></span>
                  {"oldest"}
                </label>
                <label className="sidebar-label-container">
                  <input
                    type="radio"
                    name={"test"}
                    value={"a-z"}
                    onClick={() => handleSort("a-z")}
                  />
                  <span className="checkmark"></span>
                  {"a-z"}
                </label>
                <label className="sidebar-label-container">
                  <input
                    type="radio"
                    name={"test"}
                    value={"z-a"}
                    onClick={() => handleSort("z-a")}
                  />
                  <span className="checkmark"></span>
                  {"z-a"}
                </label>
              </div>
            </div>

            <div
              className=" bg-white p-3 p-md-4 me-0 col-md-10 col-12"
              style={{
                borderRadius: "8px",
                border: "2px solid rgba(20, 20, 20, 0.05)",
                background: "#FFF",
                padding: "15px",
                boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
              }}
            >
              {result.length > 0 ? (
                <>
                  <Jobs result={result} jobsValue={applicationValue} />
                </>
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
                    Page {currentPage} of{" "}
                    {Math.ceil(applicationValue / itemsPerPage)}
                  </span>
                  <button
                    className="border-0 bg-transparent mx-3"
                    id="hover"
                    onClick={nextPage}
                    disabled={
                      currentPage === Math.ceil(applicationValue / itemsPerPage)
                    }
                  >
                    Next
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
