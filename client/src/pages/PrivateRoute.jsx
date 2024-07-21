import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PrivateRoute() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      toast.error("Please login first");
    }
  }, [userInfo, navigate]);

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
