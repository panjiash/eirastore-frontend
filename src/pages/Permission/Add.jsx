import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { serverMaster } from "../../config/Index";
import Select from "react-select";

const PermissionAdd = ({ isOpen, onClose }) => {
  const methods = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "DELETE", label: "DELETE" },
  ];
  const [msg, setMsg] = useState("");
  const [namaPermission, setNamaPermission] = useState("");
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState(null);

  const changeMethod = (option) => {
    setMethod(option);
  };

  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);
  const save = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: namaPermission,
        url,
        method: method.value,
      };
      await axios.post(`${serverMaster}/permission`, payload, {
        withCredentials: true,
      });
      setMsg("");
      onClose();
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
  useEffect(() => {
    if (isOpen) {
      setMsg("");
      setNamaPermission("");
      setUrl("");
    }
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
  if (!isOpen) return null;
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
          <h2 className="text-xl font-semibold mb-4">Add Permission</h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          {msg}
          <form onSubmit={save}>
            <div className="flex items-center mt-2">
              <div className="w-60 font-semibold">Nama Permission</div>
              <input
                type="text"
                className="w-full px-4 py-2 border-2 rounded focus:outline-none"
                onChange={(e) => setNamaPermission(e.target.value)}
                required
                disabled={isLoading}
                value={namaPermission}
              />
            </div>

            <div className="flex items-center mt-2">
              <div className="w-60 font-semibold">Url</div>
              <input
                type="text"
                className="w-full px-4 py-2 border-2 rounded focus:outline-none"
                onChange={(e) => setUrl(e.target.value)}
                required
                disabled={isLoading}
                value={url}
              />
            </div>

            <div className="flex items-center mt-2">
              <div className="w-60 font-semibold">Method</div>
              {/* <input
                type="text"
                className="w-full px-4 py-2 border-2 rounded focus:outline-none"
                onChange={(e) => setUrl(e.target.value)}
                required
                disabled={isLoading}
                value={url}
              /> */}
              <Select
                className="w-full"
                options={methods}
                value={method}
                onChange={changeMethod}
              />
            </div>

            <div className="flex float-right mt-4">
              <button
                onClick={onClose}
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                disabled={isLoading}
              >
                Close
              </button>
              <button
                type="submit"
                autoFocus
                className="bg-eiraButton text-eiraButtonText px-4 py-2 rounded ml-2"
                disabled={isLoading}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PermissionAdd;
