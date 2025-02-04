import {
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import axios from "axios";
import { toast } from "react-toastify";

import { BASE_URL } from "../../url";

export default function DemoLogin() {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [demo, setDemo] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleDemo = () => {
    setDemo((prevDemo) => !prevDemo); // Toggles between true and false
    if (isVisible === false) setIsVisible(!isVisible);
  };

  //check if user is logged in or not
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);
  const navigate = useNavigate();
  const dispach = useDispatch();

  const handleDemoLogin = async (role) => {
    // Dummy credentials
    const email =
      role === "job-seeker"
        ? "demo-seeker@empolymee.com"
        : "demo-recruiter@empolymee.com";
    const password = role === "job-seeker" ? "seeker123" : "recruiter123";

    try {
      dispach(showLoading());
      const { data } = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
        email,
        password,
      });
      if (data.success) {
        dispach(hideLoading());
        localStorage.setItem("token", data.token);
        toast.success("Login Successfull");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Demo login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="position-fixed bottom-0 end-0 mb-3 me-3 rounded-circle d-flex flex-column align-items-end justify-content-center bg-transparent border-0 ">
          {isVisible && (
            <div
              className="popover-container bg-light shadow p-3 mb-3 rounded"
              style={{
                zIndex: 1050,
                width: "290px",
              }}
            >
              {!demo ? (
                <>
                  <div className="d-flex gap-3">
                    <div>
                      <h6 className="popover-title slide-in">
                        Curious about the platform?
                      </h6>
                      <p className="popover-content mb-0 slide-in">
                        Try it now with demo credentials
                      </p>
                    </div>
                    <button
                      onClick={() => setIsVisible(!isVisible)}
                      className=" align-self-baseline justify-content-end border-0 bg-transparent"
                    >
                      <FontAwesomeIcon className=" text-muted" icon={faXmark} />
                    </button>
                  </div>

                  <div
                    className="popover-arrow"
                    style={{
                      zIndex: 1050,
                      position: "absolute",
                      top: "85px",
                      left: "92%",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 0,
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderTop: "10px solid #f8f9fa",
                    }}
                  />
                </>
              ) : (
                <div>
                  <h6 className="popover-title slide-in">Try Demo:</h6>
                  <button
                    className="btn btn-primary mb-2 demo-button seeker slide-in"
                    onClick={() => handleDemoLogin("job-seeker")}
                  >
                    as a Job Seeker
                  </button>
                  <button
                    className="btn btn-primary demo-button recruiter slide-in"
                    onClick={() => handleDemoLogin("recruiter")}
                  >
                    as a Recruiter
                  </button>
                  <div
                    className="popover-arrow"
                    style={{
                      zIndex: 1050,
                      position: "absolute",
                      top: "142px",
                      left: "92%",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 0,
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderTop: "10px solid #f8f9fa",
                    }}
                  />
                </div>
              )}
            </div>
          )}

          <button
            className="border-0 bg-transparent"
            onClick={toggleDemo}
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Toggle Theme"
          >
            <FontAwesomeIcon
              icon={faCircleExclamation}
              shake
              style={{ color: "#0d6efd", fontSize: "2.5rem" }}
            />
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
