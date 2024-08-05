import React, { useState } from "react";
import {
  faUser,
  faEnvelope,
  faLock,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/shared/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
import { BASE_URL } from "../url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employment, setEmployment] = useState("");

  const { loading } = useSelector((state) => state.alerts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !lastName || !email || !password || !employment) {
        return toast.error("Please Provide all Fields");
      }
      dispatch(showLoading());
      const { data } = await axios.post(`${BASE_URL}/api/v1/auth/register`, {
        name,
        lastName,
        email,
        password,
        employment,
      });
      dispatch(hideLoading());
      if (data.success) {
        toast.success("Register Successfully");
        navigate("/login");
        // console.log(data);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid Form Details, Please try again!");
      // console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <div
          className=" d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <Spinner />
        </div>
      ) : (
        <div className="main">
          <section className="signup">
            <div className="container">
              <div className="signup-content">
                <div className="signup-form">
                  <h2 className="form-title">Sign up</h2>
                  <form
                    className="register-form"
                    id="register-form"
                    onSubmit={handleSubmit}
                  >
                    <InputForm
                      htmlFor="name"
                      icon={faUser}
                      type={"text"}
                      name="name"
                      value={name}
                      placeholder={"Enter First Name"}
                      handleChange={(e) => setName(e.target.value)}
                    />
                    <InputForm
                      htmlFor="lastName"
                      icon={faUser}
                      type={"text"}
                      name="lastName"
                      value={lastName}
                      placeholder={"Enter Last Name"}
                      handleChange={(e) => setLastName(e.target.value)}
                    />
                    <InputForm
                      htmlFor="email"
                      icon={faEnvelope}
                      type={"email"}
                      name="email"
                      value={email}
                      placeholder={"Enter Email"}
                      handleChange={(e) => setEmail(e.target.value)}
                    />
                    <InputForm
                      htmlFor="password"
                      icon={faLock}
                      type={"password"}
                      name="password"
                      value={password}
                      placeholder={"Enter Password"}
                      handleChange={(e) => setPassword(e.target.value)}
                      autocomplete="off"
                    />
                    <div className="d-flex">
                      <FontAwesomeIcon
                        className=" pt-2 pe-2"
                        icon={faUserCheck}
                      />
                      <select
                        value={employment}
                        onChange={(e) => setEmployment(e.target.value)}
                        className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                      >
                        <option value="" disabled>
                          Choose Employment Type
                        </option>
                        <option value="job-seeker">Job Seeker</option>
                        <option value="recruiter">Recruiter</option>
                      </select>
                    </div>
                    <br />
                    <div className="form-group form-button">
                      <button
                        type="submit"
                        name="signup"
                        id="signup"
                        className="bg-primary border-0 py-2 px-5 border-1 text-white md-rounded-s-none rounded"
                        placeholder="Sign Up"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div className="signup-image">
                  <figure className="d-flex justify-content-center">
                    <img src="./assets/images/signup-image.jpg" alt="sign up" />
                  </figure>
                  <div className="signup-image-link">
                    <Link to="/login">I am already member</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
