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
        setJobs(data);
        setTimeout(function () {
          dispatch(hideLoading());
        }, 1500);
        // dispach(hideLoading());
      });
  }, []);

  console.log(userSkills);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/ai/get-recommendations`,
          {
            userSkills: userSkills,
            jobs: [
              {
                title: "Frontend Developer",
                company: "TechCorp",
                requiredSkills: ["React", "JavaScript", "HTML", "CSS"],
              },
              {
                title: "Backend Developer",
                company: "DevHub",
                requiredSkills: ["Node.js", "MongoDB", "Express"],
              },
              {
                title: "Fullstack Developer",
                company: "WebSolutions",
                requiredSkills: ["React", "Node.js", "JavaScript", "MongoDB"],
              },
              {
                title: "UI/UX Designer",
                company: "Designify",
                requiredSkills: ["HTML", "CSS", "Figma"],
              },
              {
                title: "Data Scientist",
                company: "DataWorks",
                requiredSkills: [
                  "Python",
                  "Machine Learning",
                  "TensorFlow",
                  "SQL",
                ],
              },
              {
                title: "Junior Web Developer",
                company: "StartUp Inc.",
                requiredSkills: ["React", "HTML", "CSS"],
              },
              {
                title: "Cloud Engineer",
                company: "CloudTech",
                requiredSkills: ["AWS", "Terraform", "Docker"],
              },
              {
                title: "Java Developer",
                company: "JavaWorks",
                requiredSkills: ["Java", "Spring Boot", "Hibernate"],
              },
            ],
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
          <li key={index}>{job.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetRecommendations;
