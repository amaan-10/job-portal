import axios from "axios";
export const getRecommendations = async (req, res) => {
  try {
    const { userSkills, jobs } = req.body;
    const response = await axios.post("http://127.0.0.1:8000/recommend-jobs/", {
      user_skills: userSkills.join(", "),
      jobs,
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recommendations" });
    console.error("Detailed error:", error.response?.data || error.stack);
  }
};
