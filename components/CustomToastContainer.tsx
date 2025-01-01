import { ToastContainer } from "react-toastify";

const CustomToastContainer = () => (
  <ToastContainer
    position="top-left"
    autoClose={2500}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    toastClassName="custom-toast"
  />
);

export default CustomToastContainer;
