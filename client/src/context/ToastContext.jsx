import { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

const toastContext = createContext();

// eslint-disable-next-line react/prop-types
const ToastContext = ({ children }) => {
  const notify = (message, options) => {
    toast.dismiss();
    toast(message, options);
  };

  // Add methods for each toast type
  ["success", "info", "warn", "error"].forEach((type) => {
    notify[type] = (message, options) => {
      toast.dismiss();
      toast[type](message, options);
    };
  });

  // // @desc: to make a toast that dismiss all the previous one
  // // and the default status is success state or pass it

  return (
    <toastContext.Provider value={notify}>
      {children}
      <ToastContainer closeOnClick={true} stacked={true} />
    </toastContext.Provider>
  );
};

export default ToastContext;
export const useToast = () => {
  const context = useContext(toastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
