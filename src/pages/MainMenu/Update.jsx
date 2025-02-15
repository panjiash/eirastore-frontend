/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { serverMaster } from "../../config/Index";
import { stringIconMap } from "../../components/IconMap";

const MainMenuUpdate = ({ isOpen, onClose, data }) => {
  const [parent, setParent] = useState({
    value: "1",
    label: "Home",
  });
  const [title, setTitle] = useState(null);
  const [pathname, setPathname] = useState(null);
  const [icon, setIcon] = useState({
    value: "",
    label: "",
  });
  const [order, setOrder] = useState(null);
  const [icons, setIcons] = useState(null);

  const [parents, setParents] = useState([]);
  const [msg, setMsg] = useState("");

  const getParents = async () => {
    if (!parents?.length) {
      const response = await axios.get(`${serverMaster}/main-menu`, {
        withCredentials: true,
      });
      const formattedParent = response.data.data.map((data) => {
        return { value: data.id, label: data.title };
      });
      setParents(formattedParent);
    }
  };

  const modalRef = useRef(null);
  useEffect(() => {
    // getParents();
    const formattedIcon = stringIconMap.map((icon) => {
      return { value: icon, label: icon };
    });
    setIcons(formattedIcon);
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (data) {
      setParent(parents?.find((isParent) => isParent.value == data.parent));
      setTitle(data.title);
      setPathname(data.pathname);
      setIcon({ value: data.icon, label: data.icon });
      setOrder(data.order);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const handleChangeParent = (option) => {
    setParent({
      value: option?.value,
      label: option?.label,
    });
  };

  const handleChangeIcon = (option) =>
    setIcon({
      value: option?.value,
      label: option?.value,
    });

  const save = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        parent: parent?.value == 0 ? null : parent?.value,
        title,
        pathname,
        icon: icon?.value,
        order,
      };

      const response = await axios.put(
        `${serverMaster}/main-menu/${data?.id}`,
        payload,
        {
          withCredentials: true,
        }
      );

      onClose();
      setMsg("");
    } catch (error) {
      setMsg(error.response.data.message);
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
          <h2 className="text-xl font-semibold mb-4">Update Menu</h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <form onSubmit={save}>
            <div className="flex items-center">
              <div className="w-40 font-semibold">Parent</div>
              <Select
                options={parents}
                onChange={handleChangeParent}
                className="w-full border-gray-300 focus:outline-none"
                isClearable
                onMenuOpen={getParents}
                value={parent ? parent : null}
              />
            </div>
            <div className="flex items-center mt-2">
              <div className="w-40 font-semibold">Title</div>
              <input
                type="text"
                className="w-full px-4 py-2 border-2 rounded focus:outline-none"
                onChange={(e) => setTitle(e.target.value.trim())}
                value={title}
              />
            </div>
            <div className="flex items-center mt-2">
              <div className="w-40 font-semibold">Pathname</div>
              <input
                type="text"
                className="w-full px-4 py-2 border-2 rounded focus:outline-none"
                onChange={(e) => setPathname(e.target.value.trim())}
                value={pathname}
              />
            </div>

            <div className="flex items-center mt-2">
              <div className="w-40 font-semibold">Icon</div>
              <Select
                options={icons}
                value={icon ? icon : null}
                className="w-full border-gray-300 focus:outline-none"
                isClearable
                onChange={handleChangeIcon}
              />
            </div>
            <div className="flex items-center mt-2">
              <div className="w-40 font-semibold">Order</div>
              <input
                type="number"
                className="w-full px-4 py-2 border-2 rounded focus:outline-none"
                onChange={(e) => setOrder(e.target.value.trim())}
                value={order}
              />
            </div>
            <div className="flex float-right mt-4">
              <button
                onClick={onClose}
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-eiraButton text-eiraButtonText px-4 py-2 rounded ml-2"
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

export default MainMenuUpdate;
