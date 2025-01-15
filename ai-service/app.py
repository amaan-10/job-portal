from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List

app = FastAPI()

class Job(BaseModel):
    id: str
    position: str
    company: str
    requiredSkills: List[str]
    workLocation: str
    openingAt: str
    workType: str
    description: str
    ctc: str
class JobRecommendationRequest(BaseModel):
    user_skills: str  # Skills of the user as a string
    jobs: List[Job]   # A list of job objects

@app.post("/recommend-jobs/")
async def recommend_jobs(request: JobRecommendationRequest):
    user_skills = request.user_skills
    jobs = request.jobs

    """
    Recommend jobs based on user skills.
    :param user_skills: Skills of the user as a string.
    :param jobs: List of job descriptions and required skills.
    """
    # Extract job descriptions for comparison (using dot notation)
    job_descriptions = [", ".join(job.requiredSkills) for job in jobs]

    # Vectorize skills using TF-IDF
    vectorizer = TfidfVectorizer()
    job_vectors = vectorizer.fit_transform(job_descriptions)
    user_vector = vectorizer.transform([user_skills])

    # Calculate similarity scores
    scores = cosine_similarity(user_vector, job_vectors)
    

    # Rank jobs based on similarity
    ranked_jobs = sorted(
        enumerate(scores[0]), key=lambda x: x[1], reverse=True
    )
    
    recommendations = [jobs[i[0]] for i in ranked_jobs if i[1] > 0.2]
    return recommendations
