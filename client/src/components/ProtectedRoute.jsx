import AuthAPI from "../api/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    AuthAPI.verifyToken().catch(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
    setLoading(false);
  };
  return <div>{!loading && <Outlet />}</div>;
};

export default ProtectedRoute;
