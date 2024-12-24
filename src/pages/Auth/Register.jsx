import React, { useState } from "react";
import axios from "axios";
import BackdropLoading from "../../Components/BackdropLoading.jsx";
import { serverMaster } from "../../config/Index.js";
import TextareaAutosize from "react-textarea-autosize";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // {
  //     "name": "Panji Ashriyandi",
  //     "phone": "089669043696",
  //     "email": "pashriyandhi@gmail.com",
  //     "password": "panjiash",
  //     "address": "Cibunar"
  // }
  const [formInput, setFormInput] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const handleChange = (e) => {
    // const id = e.target.id;
    setMessage("");
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (
        formInput.name == "" ||
        formInput.phone == "" ||
        formInput.email == "" ||
        formInput.password == "" ||
        formInput.address == ""
      ) {
        setIsLoading(false);
        setMessage("Please fill all data");
      } else {
        await axios.post(`${serverMaster}/register`, formInput);
        setIsSuccess(true);
        setMessage("");
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setIsSuccess(false);
      setMessage(err.response.data.message);
    }
  };
  return (
    <React.Fragment>
      <BackdropLoading isLoading={isLoading} />
      <div className="min-h-screen bg-eiraBackground flex items-center justify-center">
        <div className="flex w-full max-w-7xl">
          <div className="w-7/12 h-full hidden md:block">
            <img
              src="/img/bg-login.jpg"
              alt="Login Background"
              className="object-cover w-[800px] h-[100vh]"
            />
          </div>

          <div className="md:w-5/12 w-full px-8 mx-4 md:mx-0 self-center">
            {!isSuccess && (
              <h2 className="text-2xl font-bold text-center text-eiraParagraph">
                Register
              </h2>
            )}
            {message && (
              <div className="text-center font-semibold mt-4 text-red-500 text-sm">
                {message}
              </div>
            )}
            {!isSuccess ? (
              <form className="space-y-4 mt-6" onSubmit={save}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-eiraParagraph"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eiraButton"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-eiraParagraph"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eiraButton"
                    onChange={handleChange}
                    required
                  />
                </div>

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
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eiraButton"
                    onChange={handleChange}
                    required
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
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eiraButton"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-eiraParagraph"
                  >
                    Address
                  </label>
                  <TextareaAutosize
                    id="address"
                    name="address"
                    value={formInput.address}
                    onChange={handleChange}
                    required
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eiraButton"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-eiraButton text-eiraButtonText font-semibold rounded-md hover:bg-eiraButton/90 focus:outline-none focus:ring-2 focus:ring-eiraButton"
                  >
                    Register
                  </button>
                </div>
                <div className="flex mt-2">
                  <span className="inline-block text-sm text-gray-500">
                    Already have an account?{" "}
                    <a
                      href="#"
                      onClick={() => navigate("/login")}
                      className="font-medium text-eiraParagraph"
                    >
                      Login
                    </a>
                  </span>
                </div>
              </form>
            ) : (
              <div className="flex">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-center text-eiraParagraph">
                    Registration Success
                  </h2>
                  <p className="text-center text-sm text-gray-500">
                    You have successfully registered. Please check your email to
                    verify your account.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
