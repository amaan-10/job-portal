import React, { useState } from "react";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import InputForm from "../components/shared/InputForm";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispach = useDispatch();

  const { loading } = useSelector((state) => state.alerts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispach(showLoading());
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (data.success) {
        dispach(hideLoading());
        localStorage.setItem("token", data.token);
        toast.success("Login Successfull");
        navigate("/");
      }
    } catch (error) {
      dispach(hideLoading());
      toast.error(error.response.data.error);
      console.log(error);
    }
  };
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="main">
          {/* Sing in  Form */}
          <section className="sign-in">
            <div className="container">
              <div className="signin-content">
                <div className="signin-image">
                  <img src="/assets/images/register-img.jpg" alt="sign in" />
                  <div className="signup-image-link">
                    <Link to="/register">Create an account</Link>
                  </div>
                </div>
                <div className="signin-form">
                  <h2 className="form-title">Sign in</h2>
                  <form
                    className="register-form"
                    id="login-form"
                    onSubmit={handleSubmit}
                  >
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
                    <div className="form-group">
                      <input
                        type="checkbox"
                        name="remember-me"
                        id="remember-me"
                        className="agree-term"
                      />
                    </div>
                    <div className="form-group form-button">
                      <button
                        type="submit"
                        name="signin"
                        id="signin"
                        className="bg-primary border-0 py-2 px-5 border-1 text-white md-rounded-s-none rounded"
                        defaultValue="Log in"
                      >
                        Log In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
