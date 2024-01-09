import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputForm = ({
  htmlFor,
  icon,
  type,
  name,
  value,
  placeholder,
  handleChange,
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor={htmlFor}>
          <FontAwesomeIcon icon={icon} />
        </label>
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default InputForm;
