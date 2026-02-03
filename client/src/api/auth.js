import API from "./config.js";

const AuthAPI = {
  signup: async (data) => {
    // data = { name, email, password }
    const response = await API.post("/auth/signup", data);
    return response.data; // { token }
  },

  signin: async (data) => {
    // data = { email, password }
    const response = await API.post("/auth/signin", data);
    return response.data; // { token }
  },

  verifyToken: async () => {
    // Example endpoint to verify JWT
    const response = await API.get("/secure");
    return response.data;
    // { message: "Verified" }
  },
};

export default AuthAPI;
