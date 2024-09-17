import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "../../url";
// This route allows to surf the components under this route if and only if user is Logged In means if the bearer token is present in local storage or not

const UserRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [users, setUsers] = useState("recruiter");
  const getUser = async () => {
    //check user login(token in header) else direct to login page
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/get-user`,
        { token: localStorage.getItem("token") },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (data.success) {
        setUsers(data.data.userRole);
        //console.log(data.data.userRole);
      } else {
        localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      // console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  });
  //console.log(users);
  if (users === "recruiter") {
    return children;
  } else {
    return <Navigate to="/not-found" />;
  }
};

export default UserRoutes;
