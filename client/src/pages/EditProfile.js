import {
  faCaretDown,
  faLocationDot,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { BASE_URL } from "../url";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Spinner from "../components/shared/Spinner";
import { Tooltip as ReactToolTip } from "react-tooltip";

const EditProfile = () => {
  const { id } = useParams();
  const [users, setUser] = useState([]);

  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  const { register } = useForm();

  useEffect(() => {
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
        dispatch(hideLoading());
        setUser(data.data);
        // console.log(data.data);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...users, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(users);
    fetch(`${BASE_URL}/api/v1/user/update-user`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.success) {
          dispatch(showLoading());
          toast.success("Profile Updated Successfully");
          setTimeout(function () {
            window.location.reload();
          }, 3000);
        } else {
          toast.error(user.error);
        }
      });
    dispatch(hideLoading());
  };

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
        <div className=" max-w-screen-2xl mx-auto px-md-5 px-3 pt-3 pt-md-5  pb-md-5 pb-4">
          <h3 style={{ fontWeight: "600" }} className=" text-black mb-3 ">
            Edit Profile
          </h3>
          <div className="d-flex flex-md-nowrap flex-wrap gap-2">
            <div
              className=" bg-white p-3 p-md-4 me-0 col-12 col-lg-3 col-md-4"
              style={{
                borderRadius: "8px",
                border: "2px solid rgba(20, 20, 20, 0.05)",
                background: "#FFF",
                padding: "15px",
                boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
              }}
            >
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center flex-wrap justify-content-center my-3">
                  <FontAwesomeIcon
                    icon={faUserTie}
                    style={{ height: "100px" }}
                  />
                </div>
                <div className="d-flex flex-column align-items-center flex-wrap justify-content-center">
                  <h4 className=" fw-bold">
                    {users.name} {users.lastName}
                  </h4>
                  <h6>{users.email}</h6>
                  <h6>
                    <FontAwesomeIcon icon={faLocationDot} className="pe-2" />
                    {users.location}
                  </h6>
                </div>
                <span
                  className="badge rounded-pill text-bg-primary float-end px-3 py-2"
                  style={{ fontSize: "13px" }}
                >
                  {users.userRole}
                </span>
              </div>
            </div>
            <div
              className=" bg-white p-3 p-md-4 me-0 col-12 col-lg-9 col-md-8"
              style={{
                borderRadius: "8px",
                border: "2px solid rgba(20, 20, 20, 0.05)",
                background: "#FFF",
                padding: "15px",
                boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
              }}
            >
              <form onSubmit={handleSubmit}>
                <>
                  <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4 me-lg-4">
                    <div className="col-lg-6 col-12">
                      <p className="d-block mb-2 text-lg required-field">
                        First Name
                      </p>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={users.name}
                        {...register("name")}
                        onChange={handleChange}
                        className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                      />
                    </div>
                    <div className="col-lg-6 col-12">
                      <p className="d-block mb-2 text-lg required-field">
                        Last Name
                      </p>
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={users.lastName}
                        {...register("lastName")}
                        onChange={handleChange}
                        className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4 me-lg-4">
                    <div className="col-lg-6 col-12">
                      <p className="d-block mb-2 text-lg required-field">
                        Email Id
                      </p>
                      <input
                        type="text"
                        placeholder="email"
                        value={users.email}
                        {...register("email")}
                        onChange={handleChange}
                        className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                      />
                    </div>
                    <div className="col-lg-6 col-12">
                      <p className="d-block mb-2 text-lg required-field">
                        User Location
                      </p>
                      <input
                        type="text"
                        placeholder="Location"
                        value={users.location}
                        {...register("location")}
                        onChange={handleChange}
                        className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-4">
                    <p className="d-block mb-2 text-lg required-field">
                      Qualification
                    </p>
                    <textarea
                      className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                      rows={3}
                      placeholder="Qualification"
                      {...register("qualification")}
                      value={users.qualification}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4 me-lg-1">
                    {users.experience === "experienced" ? (
                      <>
                        <div className="col-lg-3 col-12">
                          <p className="d-block mb-2 text-lg required-field">
                            Experience
                          </p>
                          <div className="d-flex">
                            <select
                              {...register("experience")}
                              value={users.experience}
                              onChange={handleChange}
                              className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                            >
                              <option value={users.experience}>
                                {users.experience}
                              </option>
                              <option value="fresher">Fresher</option>
                              <option value="experienced">Experienced</option>
                            </select>
                            <FontAwesomeIcon
                              style={{
                                position: "relative",
                                margin: "0.8rem",
                                marginRight: "0rem",
                                color: "#6f6f6f",
                              }}
                              icon={faCaretDown}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-12">
                          <p className="d-block mb-2 text-lg required-field">
                            Experience Years
                          </p>
                          <input
                            type="text"
                            placeholder="No. of Years"
                            value={users.expyrs}
                            {...register("expyrs")}
                            onChange={handleChange}
                            className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                          />
                        </div>
                        <div className="col-lg-6 col-12 pe-5">
                          <p className="d-block mb-2 text-lg">
                            Past Experience
                          </p>
                          <input
                            type="text"
                            placeholder="Past Experience"
                            value={users.pastexp}
                            onChange={handleChange}
                            {...register("pastexp")}
                            className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="col-12 ">
                        <p className="d-block mb-2 text-lg required-field">
                          Experience
                        </p>
                        <div className="d-flex">
                          <select
                            {...register("experience")}
                            value={users.experience}
                            onChange={handleChange}
                            className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                          >
                            <option value={users.experience}>
                              {users.experience}
                            </option>
                            <option value="fresher">Fresher</option>
                            <option value="experienced">Experienced</option>
                          </select>
                          <FontAwesomeIcon
                            style={{
                              position: "relative",
                              margin: "0.8rem",
                              color: "#6f6f6f",
                            }}
                            icon={faCaretDown}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-md-12 mb-4">
                    <div className=" col-12">
                      <p className="d-block mb-2 text-lg required-field">
                        User Role (fixed)
                      </p>
                      <div className=" d-flex">
                        <select
                          {...register("userRole")}
                          value={users.userRole}
                          className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                          title="User Role cannot be changed"
                          disabled
                        >
                          <option value={users.userRole}>
                            {users.userRole}
                          </option>
                          <option value="job-seeker">Job Seeker</option>
                          <option value="recruiter">Recruiter</option>
                        </select>
                        <FontAwesomeIcon
                          style={{
                            position: "relative",
                            margin: "0.8rem",
                            marginRight: "0.3rem",
                            color: "#6f6f6f",
                          }}
                          icon={faCaretDown}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-4">
                    <p className="d-block mb-2 text-lg">Projects</p>
                    <textarea
                      className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                      rows={6}
                      placeholder="Projects..."
                      {...register("projects")}
                      value={users.projects}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4 me-lg-1">
                    <div className="col-lg-3 col-12">
                      <p className="d-block mb-2 text-lg required-field">
                        Github Profile
                      </p>
                      <input
                        type="text"
                        placeholder="Github link"
                        value={users.github}
                        {...register("github")}
                        onChange={handleChange}
                        className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                      />
                    </div>
                    <div className="col-lg-3 col-12">
                      <p className="d-block mb-2 text-lg required-field">
                        Linkedin Profile
                      </p>
                      <input
                        type="text"
                        placeholder="Linkedin link"
                        value={users.linkedin}
                        {...register("linkedin")}
                        onChange={handleChange}
                        className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                      />
                    </div>
                    <div className="col-lg-6 col-12 pe-5">
                      <p className="d-block mb-2 text-lg">
                        X (formerly Twitter) Profile
                      </p>
                      <input
                        type="text"
                        placeholder="X(Twitter) link"
                        value={users.x}
                        onChange={handleChange}
                        {...register("x")}
                        className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-4">
                    <p className="d-block mb-2 text-lg">Bio</p>
                    <textarea
                      className="form-control d-block w-full flex-1 border-2 bg-white py-1.5 pl-3 text-gray-900 placeholder-gray-400 focus-outline-none form-control-sm form-control-sm-leading-6"
                      rows={6}
                      placeholder="Biography..."
                      {...register("bio")}
                      value={users.bio}
                      onChange={handleChange}
                    />
                  </div>

                  <input
                    type="submit"
                    className="d-block mt-4 bg-primary text-white px-4 py-2 form-control-sm form-control-sm-leading-6 rounded-sm cursor-pointer"
                    style={{ width: "8rem" }}
                  />
                </>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
