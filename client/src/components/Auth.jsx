import { useState } from "react";
import AuthAPI from "../api/auth";
import { useNavigate } from "react-router-dom";

const Auth = ({ signin = true }) => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (signin) {
        res = await AuthAPI.signin(formDetails);
      } else {
        res = await AuthAPI.signup(formDetails);
      }
      console.log(res);
      if (res.token) {
        localStorage.setItem("token", res.token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (e) {}
  };

  return (
    <div className="w-full h-svh flex items-center justify-center bg-primary/30">
      <div className="w-fit max-w-md  items-center px-12 py-8 bg-white flex flex-col gap-4 rounded-lg">
        <p className="text-2xl text-black font-semibold">
          Carbonly Carbon Tracker
        </p>
        <p className="text-text text-center">
          Track your carbon footprint and make a difference
        </p>
        <form
          onSubmit={onSubmit}
          className="flex w-full flex-col gap-4 items-center"
        >
          {!signin && (
            <input
              type="text"
              name="name"
              value={formDetails.name}
              onChange={onChange}
              placeholder="Enter your name"
              className="border border-gray-400 w-full rounded-md py-3 px-4"
            />
          )}

          <input
            type="email"
            name="email"
            value={formDetails.email}
            onChange={onChange}
            placeholder="Enter your email"
            className="border border-gray-400 w-full rounded-md py-3 px-4"
          />
          <input
            type="password"
            name="password"
            value={formDetails.password}
            onChange={onChange}
            placeholder="Enter your password"
            className="border border-gray-400 w-full rounded-md py-3 px-4"
          />
          <button className="w-full cursor-pointer rounded-md text-center px-4 py-2 bg-primary text-white">
            {signin ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
