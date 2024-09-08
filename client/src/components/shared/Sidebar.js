import React, { useState } from "react";
import RadioForm from "./RadioForm";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Component for Side bar comes under Dashboard
const Sidebar = ({ handleChange, handleClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  //Declare current date and time using date function
  const now = new Date();
  //Calculating 1 day, 1 week, 1 month, 3 months ago date using Date function and simple maths
  const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
  const threeMonthAgo = new Date(now - 90 * 24 * 60 * 60 * 1000);

  //Slicing Date and time into only date i.e dd/mm/yyyy
  const oneDayAgoDate = oneDayAgo.toISOString().slice(0, 10);
  const oneWeekAgoDate = oneWeekAgo.toISOString().slice(0, 10);
  const oneMonthAgoDate = oneMonthAgo.toISOString().slice(0, 10);
  const threeMonthAgoDate = threeMonthAgo.toISOString().slice(0, 10);

  return (
    <div className="mt-sm-1">
      <div className=" display-flex">
        <h3
          style={{
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "30px",
            marginBottom: "0px",
          }}
        >
          Filters
        </h3>
        <div className="d-sm-none w-100">
          <button
            onClick={handleMenu}
            className="bg-transparent border-0"
            style={{ paddingLeft: "90%" }}
          >
            {menuOpen ? (
              <FontAwesomeIcon
                className=" text-black"
                style={{ width: 20, height: 20 }}
                icon={faXmark}
              />
            ) : (
              <FontAwesomeIcon
                className=" text-black"
                style={{ width: 20, height: 20 }}
                icon={faFilter}
              />
            )}
          </button>
        </div>
      </div>
      <div className={`${menuOpen ? "" : "d-none d-sm-block"} mt-2`}>
        <h4
          style={{
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "500",
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
            value="Bengaluru"
            title="Bengaluru"
            name="test"
          />
          <RadioForm
            handleChange={handleChange}
            value="Delhi"
            title="Delhi"
            name="test"
          />
          <RadioForm
            handleChange={handleChange}
            value="Hyderabad"
            title="Hyderabad"
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
            fontWeight: "500",
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
            fontWeight: "500",
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
            value="contract"
            title="Contract"
            name="test"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
