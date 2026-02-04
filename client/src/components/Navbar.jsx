import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <nav className="flex justify-between items-center px-12 py-6 bg-white text-black">
      <Link to={"/"} className="text-xl">
        Carbonly
      </Link>
      {window.location.href.split("/").filter((part) => part === "dashboard")
        .length === 0 ? (
        <div className="flex gap-8">
          <Link
            to={"/signin"}
            className="px-4 py-2 border border-black rounded-md"
          >
            SignIn
          </Link>
          <Link
            to={"/signup"}
            className="px-4 py-2 border bg-primary text-black border-white rounded-md"
          >
            SignUp
          </Link>
        </div>
      ) : (
        <button
          onClick={logout}
          className="px-4 cursor-pointer py-2 border bg-primary text-black border-white rounded-md"
        >
          Log Out
        </button>
      )}
    </nav>
  );
};

export default Navbar;
