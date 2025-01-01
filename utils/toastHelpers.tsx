import { toast, ToastOptions } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Success Toast
const showSuccessToast = (message: string, options?: ToastOptions) => {
  const toastId = `success-${message}`;
  if (!toast.isActive(toastId)) {
    toast.success(message, {
      ...options,
      icon: <FaCheckCircle className="text-white" size={24} />,
      className: "custom-success-toast",
      progressClassName: "custom-success-progress-bar",
      toastId,
    });
  }
};

// Error Toast
const showErrorToast = (message: string, options?: ToastOptions) => {
  const toastId = `error-${message}`;
  if (!toast.isActive(toastId)) {
    toast.error(message, {
      ...options,
      icon: <FaTimesCircle className="text-white" size={24} />,
      className: "custom-error-toast",
      progressClassName: "custom-error-progress-bar",
      toastId,
    });
  }
};

export { showSuccessToast, showErrorToast };
