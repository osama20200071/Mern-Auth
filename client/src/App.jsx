import Header from "./components/Header";
import { Outlet } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // this is the styles for the toast
import ToastContext from "./context/ToastContext";
// we use it as the root layout

function App() {
  return (
    <>
      <Header />
      <ToastContext>
        {/* <ToastContainer /> */}
        <main>
          <Outlet />
        </main>
      </ToastContext>
    </>
  );
}

export default App;
