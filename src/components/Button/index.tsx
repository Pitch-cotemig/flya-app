import React from "react";
import { StyledButton } from "./styles";

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
  className = "",
}) => {
  return (
    <StyledButton type={type} className={className} onClick={onClick}>
      {label}
    </StyledButton>
  );
};

export default Button;
