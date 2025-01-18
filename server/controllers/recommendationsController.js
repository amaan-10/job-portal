import axios from "axios";
export const getRecommendations = async (req, res) => {
  try {
    const { userSkills, jobs } = req.body;
    const response = await axios.post(
      "https://job-portal-ai.vercel.app/recommend-jobs/",
      {
        user_skills: userSkills.join(", "),
        jobs,
      }
    );

    setTimeout(function () {
      res.status(200).json(response.data);
    }, 3000);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recommendations" });
    console.error("Detailed error:", error.response?.data || error.stack);
  }
};
