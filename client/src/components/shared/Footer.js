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
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 mx-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <svg className="bi" width={30} height={24}>
              <use xlinkHref="#bootstrap" />
            </svg>
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">
            © 2024 Employ-mee
          </span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <svg className="bi" width={24} height={24}>
                <FontAwesomeIcon icon={faXTwitter} />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <svg className="bi" width={24} height={24}>
                <FontAwesomeIcon icon={faInstagram} />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
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
