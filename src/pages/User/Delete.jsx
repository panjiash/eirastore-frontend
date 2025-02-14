import axios from "axios";
import React, { useEffect, useRef } from "react";
import { serverMaster } from "../../config/Index";

const UserDelete = ({ isOpen, onClose, data }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };
  if (!isOpen) return null;
  const save = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${serverMaster}/user/${data.id}`, {
        withCredentials: true,
      });
      onClose();
    } catch (error) {
      console.log(error);
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
          <h2 className="text-xl font-semibold mb-4">Delete User</h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          {data?.email} akan di hapus ?
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

export default UserDelete;
