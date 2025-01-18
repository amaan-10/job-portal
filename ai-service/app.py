import math
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel

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

# Simulated function to fetch jobs (this could be replaced with database queries or API calls)
def fetch_jobs():
    # Simulating jobs being fetched dynamically
    job1 = Job(id="1", position="Software Engineer", company="TechCorp", requiredSkills=["Python", "Django", "JavaScript"], workLocation="Remote", openingAt="2025-01-10", workType="Full-time", description="Develop software applications.", ctc="80K")
    job2 = Job(id="2", position="Data Scientist", company="DataCo", requiredSkills=["Python", "Machine Learning", "Statistics"], workLocation="New York", openingAt="2025-01-15", workType="Full-time", description="Analyze data and create models.", ctc="90K")
    return [job1, job2]

# Function to tokenize a string into words
def tokenize(text: str):
    return text.lower().split()

# Function to create a term frequency (TF) dictionary
def create_term_frequency(text: str):
    tokens = tokenize(text)
    tf = {}
    for token in tokens:
        tf[token] = tf.get(token, 0) + 1
    return tf

# Function to compute the cosine similarity between two vectors (dictionaries)
def cosine_similarity_manual(tf_user, tf_job):
    # Calculate dot product
    dot_product = sum(tf_user.get(word, 0) * tf_job.get(word, 0) for word in tf_user)

    # Calculate magnitudes (Euclidean norm)
    magnitude_user = math.sqrt(sum(value ** 2 for value in tf_user.values()))
    magnitude_job = math.sqrt(sum(value ** 2 for value in tf_job.values()))

    # Compute cosine similarity
    if magnitude_user > 0 and magnitude_job > 0:
        return dot_product / (magnitude_user * magnitude_job)
    else:
        return 0

# Main recommendation function
@app.post("/recommend-jobs/")
async def recommend_jobs(request: JobRecommendationRequest):
    user_skills = request.user_skills
    jobs = request.jobs

    # Tokenize user skills and jobs' required skills
    tf_user = create_term_frequency(user_skills)
    job_similarities = []

    for job in jobs:
        tf_job = create_term_frequency(", ".join(job.requiredSkills))
        similarity = cosine_similarity_manual(tf_user, tf_job)
        job_similarities.append((job, similarity))

    # Rank jobs by similarity score
    job_similarities.sort(key=lambda x: x[1], reverse=True)

    # Return jobs with similarity score greater than 0.2
    recommended_jobs = [job for job, similarity in job_similarities if similarity >= 0.2]
    
    return recommended_jobs

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000)
