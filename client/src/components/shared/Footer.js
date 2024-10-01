import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 mx-5 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="24"
              viewBox="0 0 29 30"
              fill="none"
            >
              <circle
                cx="12.0143"
                cy="12.5143"
                r="12.0143"
                fill="#3575E2"
                fillOpacity="0.4"
              />
              <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
            </svg>
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">
            © 2024 Employ-mee. All rights reserved.
          </span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://x.com/"
              target="_blank"
            >
              <svg className="bi" width={24} height={24}>
                <FontAwesomeIcon icon={faXTwitter} />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://www.instagram.com/"
              target="_blank"
            >
              <svg className="bi" width={24} height={24}>
                <FontAwesomeIcon icon={faInstagram} />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://www.facebook.com/"
              target="_blank"
            >
              <svg className="bi" width={24} height={24}>
                <FontAwesomeIcon icon={faFacebook} />
              </svg>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
