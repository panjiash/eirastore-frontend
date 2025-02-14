/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import axios from "axios";
import { serverMaster } from "../../config/Index";

const MainMenuDelete = ({ isOpen, onClose, data }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // if (data) {
    //   setParent(parents?.find((isParent) => isParent.value == data.parent));
    //   setTitle(data.title);
    //   setPathname(data.pathname);
    //   setIcon({ value: data.icon, label: data.icon });
    //   setOrder(data.order);
    // }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  const handleOutsideClick = (event) => {};

  if (!isOpen) return null;

  const save = async (e) => {
    e.preventDefault();

    const response = await axios.delete(
      `${serverMaster}/main-menu/${data?.id}`,

      {
        withCredentials: true,
      }
    );

    if (response?.status == 200) {
      onClose();
      alert("Menu deleted successfully!");
    }
  };

  return (
    <React.Fragment>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleOutsideClick}
      >
        <div
          ref={modalRef}
          className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4 relative"
        >
          <h2 className="text-xl font-semibold mb-4">Delete Menu</h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          {data?.title} akan di hapus ?
          <div className="flex float-right mt-4">
            <button
              onClick={onClose}
              className="bg-eiraButton text-eiraButtonText px-4 py-2 rounded"
            >
              No
            </button>
            <button
              onClick={save}
              className="bg-red-500 text-eiraButtonText px-4 py-2 rounded ml-2"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainMenuDelete;
