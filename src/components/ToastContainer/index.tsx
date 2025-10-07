import React from "react";
import { Toast } from "../Toast";
import { ToastData } from "../../hooks/useToast";
import { ToastsWrapper } from "./ToastContainer.styles";

interface ToastContainerProps {
  toasts: ToastData[];
  onRemoveToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemoveToast,
}) => {
  if (toasts.length === 0) return null;

  return (
    <ToastsWrapper>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={() => onRemoveToast(toast.id)}
        />
      ))}
    </ToastsWrapper>
  );
};

export default ToastContainer;
