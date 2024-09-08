import React from "react";

// Component for jobs (the details which is later shown in cards)
const Jobs = ({ result, jobsValue }) => {
  return (
    <>
      <>
        <div>
          <h3
            style={{
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "30px",
            }}
          >
            {jobsValue} Jobs
          </h3>
        </div>
        <section>{result}</section>
      </>
    </>
  );
};

export default Jobs;
