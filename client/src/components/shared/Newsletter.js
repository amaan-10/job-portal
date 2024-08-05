import {
  faEnvelopeOpenText,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../url";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = (req) => {
    const formData = new FormData();
    formData.append("file", file);

    const axiosInstance = axios.create({
      baseURL: `${BASE_URL}/api/v1/resume`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    axiosInstance
      .post(`/upload`, formData)
      .then((response) => {
        toast.success("File uploaded successfully");
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        toast.error("Error uploading file:", err);
      });
  };

  return (
    <div>
      <div
        style={{
          borderRadius: "8px",
          border: "2px solid rgba(20, 20, 20, 0.05)",
          background: "#FFF",
          padding: "15px",
          boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
          marginBottom: "16px",
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "30px",
            textAlign: "center",
          }}
        >
          <FontAwesomeIcon icon={faEnvelopeOpenText} /> Email me for jobs
        </h3>
        <p
          style={{
            color: "#141414",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            marginTop: "12px",
            textAlign: "center",
          }}
        >
          Reach out via email to explore career options and find the perfect fit
          for your skills and aspirations.
        </p>
        <div className=" w-100 my-2">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@name.com"
            className="w-100 d-block py-2 pl-3 border-1 form-control focus-outline-none"
          />
          <input
            type="submit"
            value={"Subscribe"}
            className="w-100 d-block py-2 pl-3 my-3 border-1 form-control focus-outline-none bg-primary form-control-sm rounded-sm text-white cursor-pointer font-weight-bold"
          />
        </div>
      </div>
      <div
        style={{
          borderRadius: "8px",
          border: "2px solid rgba(20, 20, 20, 0.05)",
          background: "#FFF",
          padding: "15px",
          boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "30px",
            textAlign: "center",
          }}
        >
          <FontAwesomeIcon icon={faRocket} /> Get notified faster
        </h3>
        <p
          style={{
            color: "#141414",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            marginTop: "12px",
            textAlign: "center",
          }}
        >
          Receive real-time alerts on important updates, ensuring you never miss
          out on crucial information.
        </p>
        <div className={`${menuOpen ? "d-none" : ""} w-100 my-2`}>
          <input
            type="submit"
            onClick={handleMenu}
            value={"Upload Yor Resume"}
            className="w-100 d-block py-2 pl-3 my-3 border-1 form-control focus-outline-none bg-primary form-control-sm rounded-sm text-white cursor-pointer font-weight-bold"
          />
        </div>
        <div className={`${menuOpen ? "" : "d-none "} mt-2`}>
          <input type="file" accept="application/pdf" onChange={onFileChange} />
          <button
            onClick={onUpload}
            className="w-100 d-block py-2 pl-3 my-3 border-1 form-control focus-outline-none bg-primary form-control-sm rounded-sm text-white cursor-pointer font-weight-bold"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
