import React from "react";
import "./Input.css";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={`input ${className}`}
      {...props}
    />
  );
};

export default Input;
