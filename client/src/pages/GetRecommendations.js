/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../url";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";

const GetRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [jobs, setJobs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserSkills = async () => {
      dispatch(showLoading());
      try {
        const response = await fetch(`${BASE_URL}/api/v1/user/get-user`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "application/json",
          },
        });
        const data = await response.json();
        setUserSkills(data.data.skills || []);
      } catch (error) {
        console.error("Error fetching user skills:", error);
      } finally {
        dispatch(hideLoading());
      }
    };
    fetchUserSkills();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      dispatch(showLoading());
      try {
        const response = await fetch(`${BASE_URL}/api/v1/job/get-all-job`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "application/json",
          },
        });
        const data = await response.json();
        const simplifiedJobs = data.map((job) => ({
          id: job._id,
          position: job.position,
          company: job.company,
          requiredSkills: job.requiredSkills,
          workLocation: job.workLocation,
          openingAt: job.openingAt,
          workType: job.workType,
          description: job.description,
          ctc: job.ctc,
        }));
        setJobs(simplifiedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        dispatch(hideLoading());
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (userSkills.length === 0 || jobs.length === 0) return;
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/ai/get-recommendations`,
          {
            userSkills: userSkills,
            jobs: jobs,
          }
        );
        setRecommendations(data || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
      }
    };
    fetchRecommendations();
  }, [userSkills, jobs]);

  return recommendations.map(({ id, ...rest }) => ({
    _id: id,
    ...rest,
  }));
};

export default GetRecommendations;
