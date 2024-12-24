import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverMaster } from "../config/Index";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";

// eslint-disable-next-line react/prop-types
const Navbars = ({ setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const logout = async () => {
    try {
      await axios.delete(`${serverMaster}/logout`, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await axios.get(`${serverMaster}/me`, {
          withCredentials: true,
        });
        setUserLogin(response?.data?.user);
        setUser(response?.data);
      } catch (error) {
        setUser(null);
        navigate("/login");
        console.log(error.response.data.message);
      }
    };
    getMe();
  }, [setUser, navigate]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <React.Fragment>
      <div className="h-screen bg-gray-800 text-white w-64">
        <div className="p-4 text-2xl font-bold">My Sidebar</div>
        <ul>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Home</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">About</li>

          {/* Dropdown Menu */}
          <li>
            <div
              className="p-4 hover:bg-gray-700 cursor-pointer flex justify-between"
              onClick={toggleDropdown}
            >
              Services
              <span>{isDropdownOpen ? "▲" : "▼"}</span>
            </div>

            {isDropdownOpen && (
              <ul className="bg-gray-700">
                <li className="p-4 pl-8 hover:bg-gray-600 cursor-pointer">
                  Web Development
                </li>
                <li className="p-4 pl-8 hover:bg-gray-600 cursor-pointer">
                  App Development
                </li>
                <li className="p-4 pl-8 hover:bg-gray-600 cursor-pointer">
                  SEO Optimization
                </li>
              </ul>
            )}
          </li>

          <li className="p-4 hover:bg-gray-700 cursor-pointer">Contact</li>
        </ul>
      </div>
      <nav className="w-full bg-eiraBackground p-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 className="text-eiraHeadline text-2xl ml-40 font-semibold">
            Toggle
          </h1>
          <button className="text-eiraHeadline md:hidden" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex md:space-x-8 items-center`}
          >
            <div
              className={`text-eiraHeadline w-28 text-center py-1 px-2 rounded-xl cursor-pointer ${
                location?.pathname == "/" && "bg-eiraButton text-white"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </div>
            <div
              className={`text-eiraHeadline w-28 text-center py-1 px-2 rounded-xl cursor-pointer ${
                location?.pathname == "/product" && "bg-eiraButton text-white"
              }`}
              onClick={() => navigate("/product")}
            >
              Product
            </div>
            <div
              onClick={toggleUserMenu}
              className="text-eiraHeadline truncate w-28 text-center py-1 px-2 rounded-xl cursor-pointer"
            >
              {userLogin?.name}
            </div>
          </div>

          <div
            className={`absolute bg-white rounded-xl top-0 right-0 mt-12 w-64 ${
              !isUserMenuOpen && "hidden"
            }`}
          >
            <button
              type="button"
              className="text-eiraParagraph hover:text-eiraButtonText w-full p-2 bg-eiraButtonText hover:bg-eiraButton"
            >
              Profile
            </button>

            <button
              type="button"
              onClick={logout}
              className="text-eiraParagraph hover:text-eiraButtonText w-full p-2 bg-eiraButtonText hover:bg-eiraButton rounded-b-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbars;
