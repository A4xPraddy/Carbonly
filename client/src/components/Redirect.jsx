import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../api/auth";

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    AuthAPI.verifyToken().catch(() => {
      localStorage.removeItem("token");
      return navigate("/login");
    });
    navigate("/dashboard");
  };

  return <div>Loading ...</div>;
};

export default Redirect;
