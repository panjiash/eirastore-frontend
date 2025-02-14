import React, { useState } from "react";
import axios from "axios";
import BackdropLoading from "../../components/BackdropLoading.jsx";
import { serverMaster } from "../../config/Index.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const save = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        `${serverMaster}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      window.location.href = "/";
      setMessage("");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setMessage(err.response.data.message);
    }
  };
  return (
    <React.Fragment>
      <BackdropLoading isLoading={isLoading} />
      <div className="min-h-screen bg-eiraBackground flex items-center justify-center">
        <div className="flex w-full max-w-7xl">
          {/* Left Image Column */}
          <div className="w-7/12 h-full hidden md:block">
            <img
              src="/img/bg-login.jpg"
              alt="Login Background"
              className="object-cover w-[800px] h-[100vh]"
            />
          </div>

          {/* Right Login Form Column */}
          <div className="md:w-5/12 w-full px-8 mx-4 md:mx-0 self-center">
            <h2 className="text-2xl font-bold text-center text-eiraParagraph">
              Login
            </h2>
            {message && (
              <div className="text-center text-red-500 text-sm">{message}</div>
            )}

            <form className="space-y-4 mt-6" onSubmit={save}>
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-eiraParagraph"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eiraButton text-eiraParagraph"
                  placeholder="Enter your email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                  }}
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-eiraParagraph"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eiraButton/90 text-eiraParagraph"
                  placeholder="Enter your password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage("");
                  }}
                />
              </div>

              {/* Submit Button */}
              <div className="flex">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-eiraButton text-white font-semibold rounded-md hover:bg-eiraButton/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Login
                </button>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="block text-sm text-eiraParagraph hover:text-eiraParagraph/70"
                >
                  Forgot Password?
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="block text-sm text-eiraParagraph hover:text-eiraParagraph/70"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
