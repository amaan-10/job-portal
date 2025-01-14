/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../url";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";

const GetRecommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [jobs, setJobs] = useState([]);

  const dispatch = useDispatch();

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
        setUserSkills(data.data.skills);
        // console.log(data.data);
      });
  }, []);

  useEffect(() => {
    dispatch(showLoading());
    fetch(`${BASE_URL}/api/v1/job/get-all-job`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        const simplifiedJobs = data.map((job) => ({
          id: job._id,
          position: job.position,
          company: job.company,
          requiredSkills: job.requiredSkills,
        }));
        setJobs(simplifiedJobs);
        setTimeout(function () {
          dispatch(hideLoading());
        }, 1500);
        // dispach(hideLoading());
      });
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/ai/get-recommendations`,
          {
            userSkills: userSkills,
            jobs: jobs,
          }
        );
        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [userSkills]);
  return (
    <div>
      <h2>Recommended Jobs</h2>
      <ul>
        {recommendations.map((job, index) => (
          <li key={index}>
            {job.position} - {job.company}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetRecommendations;
