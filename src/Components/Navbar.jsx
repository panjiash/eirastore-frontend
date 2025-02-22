/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { serverMaster } from "../config/Index";
import { useNavigate } from "react-router-dom";
import { FiArrowLeftCircle, FiStar } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../redux/authSlice";

const Navbar = ({ userLogin, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
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
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const [sideBarLarge, setSidebarLarge] = useState(true);

  const toggleSidebarLarge = () => {
    setSidebarLarge(!sideBarLarge);
  };

  // redux
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!user) {
  //     dispatch(getMe());
  //   }
  // }, [dispatch, user]);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-eiraButton text-eiraButtonText flex justify-between items-center relative">
        <div
          className={`text-2xl order-2 lg:order-1 font-bold pl-0 lg:pl-4 lg:flex lg:items-center`}
        >
          {sideBarLarge ? "My App" : <FiStar />}
          <span
            className={`hidden lg:block hover:cursor-pointer ${
              sideBarLarge ? "ml-[139px]" : "ml-11"
            }`}
            onClick={toggleSidebarLarge}
          >
            {/* {sideBarLarge ? <FiArrowLeft /> : <FiArrowRight />} */}
            <FiArrowLeftCircle
              className={`transition-all duration-500 ${
                sideBarLarge ? "" : "rotate-180"
              }`}
            />
          </span>
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
          className={`fixed lg:relative bg-eiraButton text-eiraButtonText transition-all duration-300 ease-in-out ${
            sideBarLarge ? "w-64" : "w-24"
          } h-full lg:block ${isSidebarOpen ? "block" : "hidden"}`}
        >
          <Sidebar openSidebar={sideBarLarge} userLogin={userLogin} />
        </div>

        <div className="flex-1 p-4 bg-eiraBackground w-full">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;
