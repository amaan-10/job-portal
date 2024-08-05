import React, { useEffect, useState } from "react";
import { BASE_URL } from "../url";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Spinner from "../components/shared/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

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
          <div className="d-flex">
            <FontAwesomeIcon
              icon={faUserTie}
              style={{ height: "90px", padding: "20px" }}
            />
            <div>
              <h6>
                Name: {users.name} {users.lastName}
              </h6>
              <h6>email: {users.email}</h6>
              <h6>location: {users.location}</h6>
              <h6>Employment Type: {users.employment}</h6>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProfile;
