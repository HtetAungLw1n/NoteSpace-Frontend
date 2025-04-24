import { toast } from "react-toastify";
import React from "react";
import { Check, AlertCircle, Info } from "lucide-react";

const toastConfig = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  className: "rounded-md text-lg",
  boxShadow: "none",
};

export const showToast = {
  success: (message) => {
    toast.success(message, {
      ...toastConfig,
      icon: React.createElement(Check, {
        size: 24,
        color: "var(--toast-accent-text)",
      }),
    });
  },
  info: (message) => {
    toast.info(message, {
      ...toastConfig,
      icon: React.createElement(Info, {
        size: 24,
        color: "var(--toast-info-text)",
      }),
    });
  },
  error: (message) => {
    toast.error(message, {
      ...toastConfig,
      icon: React.createElement(AlertCircle, {
        size: 24,
        color: "var(--toast-error-text)",
      }),
    });
  },
};
