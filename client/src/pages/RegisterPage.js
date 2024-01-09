import React, { useState } from "react";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/shared/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading } = useSelector((state) => state.alerts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !lastName || !email || !password) {
        return toast.error("Please Provide all Fields");
      }
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        lastName,
        email,
        password,
      });
      dispatch(hideLoading());
      if (data.success) {
        toast.success("Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid Form Details, Please try again!");
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container">
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
                    <figure>
                      <img
                        src="./assets/images/signup-image.jpg"
                        alt="sign up"
                      />
                    </figure>
                    <div className="signup-image-link">
                      <Link to="/login">I am already member</Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
