import React, { useState } from "react";
import axios from "axios";
import BackdropLoading from "../../Components/BackdropLoading.jsx";
import { serverMaster } from "../../config/Index.js";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const params = useParams();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (password !== confPassword) {
        setMessage("Passwords do not match");
        setIsLoading(false);
        return;
      }
      if (password == "" || confPassword == "") {
        setMessage("Password is required");
        setIsLoading(false);
        return;
      }
      await axios.post(
        `${serverMaster}/reset-password/${params?.id}`,
        {
          password,
        },
        {
          withCredentials: true,
        }
      );
      setMessage("");
      setIsLoading(false);
      window.location.href = "/login";
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
              Reset Password
            </h2>
            {message && (
              <div className="text-center text-red-500 text-sm">{message}</div>
            )}
            <form className="space-y-4 mt-6" onSubmit={save}>
              {/* Email Input */}
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
                  className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eiraButton text-eiraParagraph"
                  placeholder="Enter your password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage(
                      e.target.value !== confPassword
                        ? "Passwords do not match"
                        : ""
                    );
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-eiraParagraph"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confPassword"
                  name="confPassword"
                  className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eiraButton text-eiraParagraph"
                  placeholder="Enter your password"
                  required
                  onChange={(e) => {
                    setConfPassword(e.target.value);
                    setMessage(
                      e.target.value !== password
                        ? "Passwords do not match"
                        : ""
                    );
                  }}
                />
              </div>

              {/* Submit Button */}
              <div className="flex">
                <button
                  type="submit"
                  className={`w-full py-2 px-4 font-semibold rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    password !== confPassword
                      ? "cursor-not-allowed bg-slate-400/50"
                      : "bg-eiraButton hover:bg-eiraButton/90"
                  }`}
                  disabled={password !== confPassword}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword;
