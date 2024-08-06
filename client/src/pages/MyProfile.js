import React, { useEffect, useState } from "react";
import { BASE_URL } from "../url";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Spinner from "../components/shared/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUserTie } from "@fortawesome/free-solid-svg-icons";

const MyProfile = () => {
  const [users, setUser] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  const getUser = async () => {
    dispatch(showLoading());
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/get-user`,
        { token: localStorage.getItem("token") },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTimeout(function () {
        dispatch(hideLoading());
      }, 1500);

      setUser(data.data);
    } catch (error) {
      //
      // console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  });
  //   console.log(users);

  return (
    <>
      {loading ? (
        <div
          className=" d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spinner />
        </div>
      ) : (
        <div className="  max-w-screen-2xl mx-auto xl:px-24 px-5 md:py-20 pt-3 pt-md-5 pb-5 ">
          <h2 style={{ fontWeight: "600" }} className=" text-black mb-3 ">
            My Profile
          </h2>

          <div
            className=" bg-white p-3 p-md-4 me-0"
            style={{
              borderRadius: "8px",
              border: "2px solid rgba(20, 20, 20, 0.05)",
              background: "#FFF",
              padding: "15px",
              boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
            }}
          >
            <span
              className="badge rounded-pill text-bg-primary float-end px-3 py-2 me-3"
              style={{ fontSize: "13px" }}
            >
              {users.employment}
            </span>
            <div className="d-flex">
              <div className="py-4 px-5 ms-4">
                <FontAwesomeIcon icon={faUserTie} style={{ height: "100px" }} />
              </div>
              <div className="d-flex flex-column justify-content-center">
                <h3 className=" fw-bold">
                  {users.name} {users.lastName}
                </h3>
                <h5>{users.email}</h5>
                <h6>
                  <FontAwesomeIcon icon={faLocationDot} className="pe-2" />
                  {users.location}
                </h6>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProfile;
