import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user = null }) => {
  return (
    <nav className="flex justify-between items-center px-12 py-8 bg-white text-black">
      <p className="text-xl">Carbonly</p>
      {window.location.href.split("/").at(-1) !== "dashboard" && (
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
      )}
    </nav>
  );
};

export default Navbar;
