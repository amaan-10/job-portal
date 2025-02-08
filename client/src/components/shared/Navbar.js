import {
  faBars,
  faBarsStaggered,
  faRightFromBracket,
  faSortUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { hideLoading } from "../../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./../../url";

// Component for navbar which is part of every page through the WebApp
const Navbar = () => {
  const [users, setUser] = useState("recruiter");
  const { user } = useSelector((state) => state.auth);

  // fetch user
  useEffect(() => {
    // dispatch(showLoading());
    try {
      fetch(`${BASE_URL}/api/v1/user/get-user`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUser(data.data.userRole);
            //console.log(data);
          } else {
            localStorage.clear();
          }
          // dispatch(hideLoading());
        });
    } catch (error) {
      localStorage.clear();
    }
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [isLoggedIn, setLoggedIn] = useState(false);

  //check if user is logged in or not
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  let navItems;
  // show this if user is logged in
  if (isLoggedIn === true) {
    // show this if user role is recruiter
    if (users === "recruiter") {
      navItems = [
        { path: "/", title: "Home" },
        { path: "/dashboard", title: "DashBoard" },
        { path: "/post-job", title: "Post a job" },
        { path: "/my-job", title: "My jobs" },
        { path: "/profile", title: "My Profile" },
      ];
    } else {
      // show this if user role is not recruiter
      navItems = [
        { path: "/", title: "Home" },
        { path: "/dashboard", title: "DashBoard" },
        { path: "/profile", title: "My Profile" }, //to be edited
        { path: "/applications", title: "Applications" }, //to be edited
      ];
    }
  } else {
    navItems = [
      { path: "/", title: "Home" },
      { path: "/dashboard", title: "DashBoard" },
      { path: "/profile", title: "My Profile" }, //to be edited
      { path: "/applications", title: "Applications" }, //to be edited
    ];
  }

  const navigate = useNavigate();
  const dispach = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    dispach(hideLoading());
    toast.success("Logout Successfull");
    setLoggedIn(false);
  };

  // useEffect(() => {
  //   // Cold start API when the component loads
  //   const coldStartAPI = async () => {
  //     try {
  //       const response = await fetch(
  //         `${BASE_URL}/api/v1/ai/get-recommendations`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             userSkills: ["html", "css", "js"],
  //             jobs: [
  //               {
  //                 id: "65991419dbeb316b14c217eb",
  //                 workLocation: "Pune",
  //                 workType: "contract",
  //                 position: "Clinical Data Manager",
  //                 company: "HealthCare Solutions",
  //                 description:
  //                   "As a Clinical Data Manager, you will be responsible for managing clinical trial data, ensuring its accuracy, completeness, and compliance with regulatory standards. Your role will involve designing and implementing data collection processes, analyzing clinical data, and preparing reports for submission to regulatory authorities. You will also collaborate with clinical research teams to support ongoing trials.",

  //                 ctc: "INR 8 LPA",
  //                 openingAt: "2024-08-01T09:00",
  //                 requiredSkills: [
  //                   "Clinical Data Management",
  //                   "Data Analysis",
  //                   "Data Quality Assurance",
  //                   "Clinical Trials",
  //                   "Database Management Systems",
  //                   "SAS",
  //                   "CDISC",
  //                   "SDTM",
  //                   "EDC Systems",
  //                   "Data Validation",
  //                   "Data Cleaning",
  //                   "Risk-Based Monitoring",
  //                   "Clinical Reporting",
  //                   "GxP",
  //                   "FDA",
  //                   "Project Management",
  //                   "Statistical Analysis",
  //                   "Microsoft Excel",
  //                   "Data Integration",
  //                   "Cross-functional Collaboration",
  //                   "SAS",
  //                   "R",
  //                   "or SQL",
  //                 ],
  //               },
  //               {
  //                 id: "65991419dbeb316b14c217c4",
  //                 workLocation: "Bengaluru",
  //                 workType: "full-time",
  //                 position: "Software Engineer",
  //                 company: "AutoTech Corp.",
  //                 description:
  //                   "Develop software solutions for automotive systems.",
  //                 ctc: "INR 9 LPA",
  //                 openingAt: "2024-08-12T09:00",
  //                 requiredSkills: [
  //                   "JavaScript",
  //                   "Python",
  //                   "Java",
  //                   "C++",
  //                   "C#",
  //                   "MySQL",
  //                   "PostgreSQL",
  //                   "MongoDB",
  //                   "AWS",
  //                   "Azure",
  //                   "Problem Solving",
  //                 ],
  //               },
  //             ],
  //           }),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to cold start API");
  //       }

  //       const data = await response.json();
  //     } catch (error) {
  //       console.error("Error in API cold start:", error);
  //     }
  //   };

  //   coldStartAPI();
  // }, []);
  return (
    <>
      <header className=" max-w-screen-2xl conatiner mx-auto xl:px-24 px-3 px-md-5 pt-4 pb-3">
        <nav className="d-flex justify-content-between align-items-center">
          <a
            href="/"
            className="d-flex align-items-center gap-2 fs-4 text-dark"
            style={{ textDecoration: "none", fontSize: 24 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="30"
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
            <span>Employ-Mee</span>
          </a>
          <ul
            className="d-none d-md-flex gap-3 gap-md-4 gap-lg-5 p-0 m-0"
            style={{ listStyleType: "none" }}
          >
            {navItems.map(({ path, title }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  id="nav"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="d-none d-md-flex justify-content-between ">
            {isLoggedIn ? (
              <Link
                onClick={handleLogout}
                to="/login"
                className="bg-danger mx-2 py-2 px-4 border rounded"
                style={{
                  textDecoration: "none",
                  fontSize: "14px",
                  color: "white",
                  width: "110px",
                }}
              >
                Log Out
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="login-btn mx-2 py-2 px-3 px-lg-4 border rounded"
                  style={{
                    textDecoration: "none",
                    fontSize: "medium",
                    color: "black",
                  }}
                >
                  LogIn
                </Link>
                <Link
                  to="/register"
                  className="signup-btn bg-primary ms-1 py-2 px-3 px-lg-4 border rounded"
                  style={{
                    textDecoration: "none",
                    fontSize: "medium",
                    color: "white",
                  }}
                >
                  SignUp
                </Link>
              </>
            )}
          </div>

          <div className="d-md-none d-block ">
            <button onClick={handleMenu} className="bg-transparent border-0">
              {menuOpen ? (
                <FontAwesomeIcon
                  className=" text-black"
                  style={{ width: 20, height: 20 }}
                  icon={faXmark}
                />
              ) : (
                <FontAwesomeIcon
                  className=" text-black"
                  style={{ width: 20, height: 20 }}
                  icon={faBars}
                />
              )}
            </button>
          </div>
        </nav>
        <div
          className={`position-absolute end-0 d-md-none ${
            menuOpen ? "" : "d-none"
          }`}
        >
          <div
            style={{
              textAlign: "right",
              height: "14px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 200"
              style={{
                width: "32px",
                height: "14px",
                marginRight: "10px",
                marginBottom: "10px",
              }}
              fill="white"
              stroke={"#dee2e6"}
              strokeWidth={14}
            >
              <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
            </svg>
          </div>

          <ul
            className="me-2 px-4 py-3 end-0 z-1 bg-white border shadow-sm rounded d-md-none rounded-sm"
            style={{ listStyleType: "none" }}
          >
            {navItems.map(({ path, title }) => (
              <li key={path}>
                <NavLink
                  style={{
                    textDecoration: "none",
                    fontSize: 16,
                    color: "black",
                  }}
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              </li>
            ))}
            <li>
              {isLoggedIn ? (
                <Link
                  onClick={handleLogout}
                  to="/login"
                  className="text-danger"
                  style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    color: "white",
                    width: "110px",
                  }}
                >
                  Log Out
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="pe-2"
                    style={{
                      fontSize: "medium",
                      color: "blue",
                    }}
                  >
                    LogIn
                  </Link>
                  /
                  <Link
                    to="/register"
                    className="ps-2"
                    style={{
                      fontSize: "medium",
                      color: "blue",
                    }}
                  >
                    SignUp
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
