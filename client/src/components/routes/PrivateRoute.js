import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { setUser } from "../../redux/features/auth/authSlice";
import { BASE_URL } from "../../url";
// This route allows to surf the components under this route if and only if user is Logged In means if the bearer token is present in local storage or not
const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
        dispatch(setUser(data.data));
        // console.log(data);
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

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
