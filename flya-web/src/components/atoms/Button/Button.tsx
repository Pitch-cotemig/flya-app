import React from "react";
import "./Button.css";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  type = "button", 
  className = "" 
}) => {
  return (
    <button type={type} className={`button ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
