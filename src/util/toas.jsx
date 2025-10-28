import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";

export function ToastProvider({ children }) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      {children}
    </>
  );
}


export const showSuccess = (message) =>
  toast.success(message, {
    icon: <AiOutlineCheckCircle className="text-green-400 w-5 h-5" />,
    style: { backgroundColor: "#1f2937", color: "#10b981" }, 
  });

export const showError = (message) =>
  toast.error(message, {
    icon: <AiOutlineCloseCircle className="text-red-400 w-5 h-5" />,
    style: { backgroundColor: "#1f2937", color: "#ef4444" }, 
  });

export const showInfo = (message) =>
  toast.info(message, {
    icon: <AiOutlineInfoCircle className="text-blue-400 w-5 h-5" />,
    style: { backgroundColor: "#1f2937", color: "#3b82f6" }, 
  });

export const showWarning = (message) =>
  toast.warning(message, {
    icon: <AiOutlineExclamationCircle className="text-yellow-400 w-5 h-5" />,
    style: { backgroundColor: "#1f2937", color: "#facc15" }, 
  });
