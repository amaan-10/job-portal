import {
  faBarsStaggered,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { hideLoading } from "../../redux/features/alertSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const navItems = [
    { path: "/", title: "Home" },
    { path: "/dashboard", title: "DashBoard" },
    { path: "/post-job", title: "Post a job" }, //to be edited
    { path: "/my-job", title: "My jobs" }, //to be edited
  ];

  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

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
    <header className="max-w-screen-2xl conatiner mx-auto xl:px-24 px-5 p-4">
      <nav className="d-flex justify-content-between align-items-center py-6">
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
          className="d-none d-md-flex gap-5 mb-0"
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
        <div className="d-none d-flex justify-content-between d-lg-block">
          {isLoggedIn ? (
            <Link
              onClick={handleLogout}
              to="/login"
              className="bg-danger mx-2 py-2 px-4 border rounded"
              style={{
                textDecoration: "none",
                fontSize: "medium",
                color: "white",
              }}
            >
              Log Out
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="mx-2 py-2 px-4 border rounded"
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
                className="bg-primary mx-2 py-2 px-4 border rounded"
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

        <div className="d-md-none d-block">
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
                icon={faBarsStaggered}
              />
            )}
          </button>
        </div>
      </nav>
      <div
        className={`px-4 bg-black py-4 rounded-sm ${menuOpen ? "" : "d-none"}`}
      >
        <ul style={{ listStyleType: "none" }}>
          {navItems.map(({ path, title }) => (
            <li key={path}>
              <NavLink
                style={{ textDecoration: "none", fontSize: 16, color: "white" }}
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                fontSize: "medium",
                color: "white",
              }}
            >
              LogIn
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
