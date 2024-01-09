import {
  faEnvelopeOpenText,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Newsletter = () => {
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
          }}
        >
          Ut esse eiusmod aute. Sit enim lab dolore. Aute ea fugiat commodo ea
          foes.
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
          }}
        >
          Ut esse eiusmod aute. Sit enim lab dolore. Aute ea fugiat commodo ea
          foes.
        </p>
        <div className=" w-100 my-2">
          <input
            type="submit"
            value={"Upload Yor Resume"}
            className="w-100 d-block py-2 pl-3 my-3 border-1 form-control focus-outline-none bg-primary form-control-sm rounded-sm text-white cursor-pointer font-weight-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
