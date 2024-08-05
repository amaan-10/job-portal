import React, { useEffect, useState } from "react";
import { BASE_URL } from "../url";

const MyProfile = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/user/get-user`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        // console.log(data);

        // dispach(hideLoading());
      });
  }, []);

  const {
    _id,
    name,
    lastName,
    email,
    location,
    createdAt,
    qualification,
    experience,
    expyrs,
    pastexp,
    projects,
    employment,
  } = user.data;

  console.log(user);

  return (
    <div className="  max-w-screen-2xl mx-auto xl:px-24 px-5 md:py-20 pt-3 pt-md-5 pb-5 ">
      <h1 style={{ fontWeight: "600" }} className=" text-black mb-3 ">
        My Profile
      </h1>
      <h2>{email}</h2>
    </div>
  );
};

export default MyProfile;
