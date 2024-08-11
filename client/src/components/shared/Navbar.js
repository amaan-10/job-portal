import {
  faBars,
  faBarsStaggered,
  faRightFromBracket,
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

const Navbar = () => {
  const [users, setUser] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // dispatch(showLoading());
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
          setUser(data.data);
          // console.log(data);
        } else {
          localStorage.clear();
        }

        // dispatch(hideLoading());
      });
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  let navItems;
  if (isLoggedIn === true) {
    if (users.userRole === "recruiter") {
      navItems = [
        { path: "/", title: "Home" },
        { path: "/dashboard", title: "DashBoard" },
        { path: "/post-job", title: "Post a job" },
        { path: "/my-job", title: "My jobs" },
        { path: "/profile", title: "My Profile" },
      ];
    } else {
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
        <div className={`px-4 pt-3 rounded-sm ${menuOpen ? "" : "d-none"}`}>
          <ul className="p-0 m-0" style={{ listStyleType: "none" }}>
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
