/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { serverMaster } from "../config/Index";
import { useNavigate } from "react-router-dom";

const Navbar = ({ children, setUser }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState(null);

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
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-eiraButton text-eiraButtonText flex justify-between items-center relative">
        <div className="text-2xl order-2 lg:order-1 font-bold pl-0 lg:pl-4">
          My App
        </div>
        <button
          className={`lg:block lg:order-2 order-3 p-4 active:bg-eiraParagraph ${
            isOpenMenu && "bg-eiraParagraph"
          }`}
          onClick={toggleMenu}
        >
          {"Menu"}
        </button>
        {isOpenMenu && (
          <div className="absolute right-0 top-14 w-48 bg-eiraButton text-eiraButtonText rounded-b-xl">
            <div className="w-full text-center py-2 border border-b-eiraButtonText">
              {userLogin?.name}
            </div>
            <div
              onClick={logout}
              className="w-full text-center py-2 rounded-b-xl hover:bg-eiraButtonText hover:text-eiraButton cursor-pointer"
            >
              Logout
            </div>
          </div>
        )}

        {/* Hamburger Menu */}
        <button
          className="lg:hidden focus:outline-none order-1 pl-4"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`fixed lg:relative bg-eiraButton text-eiraButtonText w-64 h-full lg:block ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <Sidebar userLogin={userLogin} />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 bg-eiraBackground">
          {/* <h1 className="text-3xl font-bold">Main Content</h1>
          <p>{userLogin?.name}</p> */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
