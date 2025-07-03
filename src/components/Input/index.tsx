import React from "react";
import { StyledInput } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  className = "",
  ...props
}) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={className}
      {...props}
    />
  );
};

export default Input;
