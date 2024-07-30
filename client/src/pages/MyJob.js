import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/shared/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { BASE_URL } from "../url";

const MyJob = () => {
  const [jobs, setJobs] = useState([]);
  const [searchParams, setSearch] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { loading } = useSelector((state) => state.alerts);
  const dispach = useDispatch();

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
        // console.log(data);
        dispach(hideLoading());
      });
  }, []);

  const [topScrollbar, setTopScrollbar] = useState(null);
  const [contentWrapper, setContentWrapper] = useState(null);

  useEffect(() => {
    if (topScrollbar && contentWrapper) {
      const syncScrollTopToBottom = () => {
        if (contentWrapper.scrollLeft !== topScrollbar.scrollLeft) {
          contentWrapper.scrollLeft = topScrollbar.scrollLeft;
        }
      };

      const syncScrollBottomToTop = () => {
        if (topScrollbar.scrollLeft !== contentWrapper.scrollLeft) {
          topScrollbar.scrollLeft = contentWrapper.scrollLeft;
        }
      };

      topScrollbar.addEventListener("scroll", syncScrollTopToBottom);
      contentWrapper.addEventListener("scroll", syncScrollBottomToTop);

      return () => {
        topScrollbar.removeEventListener("scroll", syncScrollTopToBottom);
        contentWrapper.removeEventListener("scroll", syncScrollBottomToTop);
      };
    }
  }, [topScrollbar, contentWrapper]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < jobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let s = searchParams.get("search");
    fetch(`${BASE_URL}/api/v1/job/get-job?search=${s}`, {
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
        // console.log(jobs);
      });
  };

  const handleDelete = (id) => {
    fetch(`${BASE_URL}/api/v1/job/delete-job/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // console.log(data);
          dispach(showLoading());
          toast.success("Job Deleted Successfully!");
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
      });
    dispach(hideLoading());
  };

  return (
    <div className=" conatiner-xl mx-auto p-md-5 mt-2 mt-md-0">
      <div className="job-container p-sm-5">
        <h3 className="text-center pt-3 pb-4 m-0">All My Jobs</h3>
        <div className="d-flex flex-md-row flex-column justify-content-center">
          <div className="d-flex flex-md-row flex-column justify-content-center col-md-8 col-12 mb-2">
            <input
              onChange={(e) => setSearch({ search: e.target.value })}
              type="text"
              name="search"
              id="search"
              placeholder="Search By: Position"
              className="form-control py-2 pl-4 border-1 focus-outline-none mb-3 "
            />
            <button
              onClick={handleSearch}
              className="bg-primary text-white font-medium border-0 px-4 py-2 rounded-1 mb-3"
            >
              Search
            </button>
          </div>
        </div>
        <div className="d-flex flex-wrap align-items-center">
          <div className="position-relative w-full px-2 max-w-full flex-grow-1 flex-1">
            <h3 className=" fs-5 fw-semibold lh-1">All Jobs</h3>
          </div>
          <div className="position-relative w-full px-2 max-w-full flex-grow-1 flex-1 text-end">
            <Link to="/post-job">
              <button
                className=" text-white font-medium border-0 px-4 py-2 rounded-1 mb-4"
                style={{ backgroundColor: "rgb(79 70 229)" }}
              >
                Post a new job
              </button>
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          {loading ? (
            <Spinner />
          ) : (
            <div className="position-relative w-100">
              <div
                className="top-scrollbar overflow-x-auto overflow-y-hidden mb-2"
                ref={setTopScrollbar}
              >
                <div className="scroll-content"></div>
              </div>
              <div
                className="scroll-content-wrapper overflow-auto"
                ref={setContentWrapper}
              >
                <div className="scroll-content">
                  <table className="table table-responsive table-hover border">
                    <thead>
                      <tr>
                        <th className="px-3" scope="col">
                          NO.
                        </th>
                        <th scope="col">COMPANY NAME</th>
                        <th scope="col">POSITION</th>
                        <th scope="col">WORK TYPE</th>
                        <th scope="col">EDIT</th>
                        <th scope="col">DELETE</th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentJobs.map((job, index) => (
                        <tr key={index}>
                          <th className="p-3 px-4" scope="row">
                            {index + 1}
                          </th>
                          <td className="py-3">{job.company}</td>
                          <td className="py-3">{job.position}</td>
                          <td className="py-3">{job.workType}</td>
                          <td>
                            <button className="border-0 py-2 bg-transparent whitespace-nowrap">
                              <Link
                                style={{ color: "black" }}
                                to={`/update-job/${job?._id}`}
                              >
                                Edit
                              </Link>
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => handleDelete(job._id)}
                              className=" border-0 bg-danger py-2 px-4 text-white rounded-1"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center text-black space-x-4">
          {currentPage > 1 && (
            <button
              className="bg-primary text-white font-medium border-0 px-4 py-2 m-3 rounded-1 "
              style={{ width: "100px" }}
              onClick={prevPage}
            >
              Previous
            </button>
          )}
          {indexOfLastItem < jobs.length && (
            <button
              className="bg-primary text-white font-medium border-0 px-4 py-2 m-3 rounded-1 "
              style={{ width: "100px" }}
              onClick={nextPage}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyJob;
