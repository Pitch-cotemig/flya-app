import React, { useEffect } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import {
  ToastContainer,
  ToastContent,
  ToastIcon,
  ToastMessage,
  CloseButton,
} from "./Toast.styles";

export interface ToastProps {
  type: "success" | "error" | "info";
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  type,
  message,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} />;
      case "error":
        return <AlertCircle size={20} />;
      case "info":
        return <Info size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <ToastContainer type={type}>
      <ToastContent>
        <ToastIcon type={type}>{getIcon()}</ToastIcon>
        <ToastMessage>{message}</ToastMessage>
        <CloseButton onClick={onClose}>
          <X size={16} />
        </CloseButton>
      </ToastContent>
    </ToastContainer>
  );
};

export default Toast;
