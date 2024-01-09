import React from "react";
import RadioForm from "./RadioForm";

const Sidebar = ({ handleChange, handleClick }) => {
  const now = new Date();
  const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
  const threeMonthAgo = new Date(now - 90 * 24 * 60 * 60 * 1000);

  const oneDayAgoDate = oneDayAgo.toISOString().slice(0, 10);
  const oneWeekAgoDate = oneWeekAgo.toISOString().slice(0, 10);
  const oneMonthAgoDate = oneMonthAgo.toISOString().slice(0, 10);
  const threeMonthAgoDate = threeMonthAgo.toISOString().slice(0, 10);

  return (
    <div className="mt-4">
      <h3
        style={{
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "30px",
        }}
      >
        Filters
      </h3>

      <h4
        style={{
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "30px",
          paddingBottom: "12px",
        }}
      >
        Location
      </h4>
      <div>
        <RadioForm
          handleChange={handleChange}
          value=""
          title="All"
          name="test"
        />

        <RadioForm
          handleChange={handleChange}
          value="China"
          title="China"
          name="test"
        />
        <RadioForm
          handleChange={handleChange}
          value="Poland"
          title="Poland"
          name="test"
        />
        <RadioForm
          handleChange={handleChange}
          value="United States"
          title="United States"
          name="test"
        />
        <RadioForm
          handleChange={handleChange}
          value="Pune"
          title="Pune"
          name="test"
        />
      </div>

      <h4
        style={{
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "30px",
          paddingBottom: "12px",
        }}
      >
        Date of Posting
      </h4>
      <div>
        <RadioForm
          handleChange={handleChange}
          value=""
          title="All time"
          name="test"
        />

        <RadioForm
          handleChange={handleChange}
          value={oneDayAgoDate}
          title="Last 24 hour"
          name="test"
        />
        <RadioForm
          handleChange={handleChange}
          value={oneWeekAgoDate}
          title="Last 7 days"
          name="test"
        />
        <RadioForm
          handleChange={handleChange}
          value={oneMonthAgoDate}
          title="Last 30 days"
          name="test"
        />
        <RadioForm
          handleChange={handleChange}
          value={threeMonthAgoDate}
          title="Last 3 months"
          name="test"
        />
      </div>

      <h4
        style={{
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "30px",
          paddingBottom: "12px",
        }}
      >
        Work Type
      </h4>
      <div>
        <RadioForm
          handleChange={handleChange}
          value=""
          title="All Type"
          name="test"
        />

        <RadioForm
          handleChange={handleChange}
          value="full-time"
          title="Full-Time"
          name="test"
        />
        <RadioForm
          handleChange={handleChange}
          value="part-time"
          title="Part-time"
          name="test"
        />
        <RadioForm
          handleChange={handleChange}
          value="internship"
          title="Internship"
          name="test"
        />
        <RadioForm
          handleChange={handleChange}
          value="contaract"
          title="Contract"
          name="test"
        />
      </div>
    </div>
  );
};

export default Sidebar;
