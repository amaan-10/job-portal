import React, { useEffect, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/shared/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const MyJob = () => {
  const [jobs, setJobs] = useState([]);
  const [searchParams, setSearch] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { loading } = useSelector((state) => state.alerts);
  const dispach = useDispatch();

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
        console.log(data);
        dispach(hideLoading());
      });
  }, []);

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
    fetch(`http://localhost:8080/api/v1/job/get-job?search=${s}`, {
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
        console.log(jobs);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/v1/job/delete-job/${id}`, {
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
          console.log(data);
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
    <div className=" mx-auto px-xl-4 px-5 pl-4 my-5">
      <div
        style={{
          paddingTop: "2.5rem",
          paddingBottom: "2.5rem",
          background: "#EFEFEF",
          paddingLeft: "4rem",
          paddingRight: "4rem",
        }}
        className="md-px-3"
      >
        <h3 className="text-center p-5">All My Jobs</h3>
        <div className="d-flex justify-content-center mb-2">
          <input
            onChange={(e) => setSearch({ search: e.target.value })}
            type="text"
            name="search"
            id="search"
            placeholder="Search By: Position"
            className="form-control py-2 pl-4 border-1 w-50 focus-outline-none mb-4 w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-primary text-white font-medium border-0 px-4 py-2 rounded-1 mb-4"
          >
            Search
          </button>
        </div>
        <div className="d-flex flex-wrap align-items-center">
          <div className="position-relative w-full px-2 max-w-full flex-grow-1 flex-1">
            <h3
              style={{
                fontSize: "1rem",
                lineHeight: "1.5rem",
                fontWeight: 600,
              }}
            >
              All Jobs
            </h3>
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

        {loading ? (
          <Spinner />
        ) : (
          <table className="table table-hover border">
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
        )}
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
