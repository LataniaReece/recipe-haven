import { toast, ToastOptions } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Success Toast
const showSuccessToast = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    ...options,
    icon: <FaCheckCircle className="text-white" size={24} />,
    className: "custom-success-toast",
    progressClassName: "custom-success-progress-bar",
  });
};

// Error Toast
const showErrorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    ...options,
    icon: <FaTimesCircle className="text-white" size={24} />,
    className: "custom-error-toast",
    progressClassName: "custom-error-progress-bar",
  });
};

export { showSuccessToast, showErrorToast };
