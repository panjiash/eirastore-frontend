import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { serverMaster } from "../../config/Index";
import Select from "react-select";

const RoleAdd = ({ isOpen, onClose }) => {
  const [msg, setMsg] = useState("");
  const [namaRole, setNamaRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  const [menus, setMenus] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);

  const getMenu = async () => {
    const response = await axios.get(`${serverMaster}/main-menu`, {
      withCredentials: true,
    });
    const formattedOptions = response.data.data.map((data) => {
      return { value: data.id, label: data.title };
    });
    setMenus(formattedOptions);
  };
  const handleChangeMenu = (option) => {
    setSelectedMenus(option);
  };

  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const getPermission = async () => {
    const response = await axios.get(`${serverMaster}/permission`, {
      withCredentials: true,
    });
    const formattedOptions = response.data.data.map((data) => {
      return { value: data.id, label: data.name };
    });
    setPermissions(formattedOptions);
  };
  const handleChangePermission = (option) => {
    setSelectedPermissions(option);
  };

  useEffect(() => {
    if (isOpen) {
      setMsg("");
      setNamaRole("");
      setSelectedMenus([]);
      setSelectedPermissions([]);
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
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
  if (!isOpen) return null;

  const save = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${serverMaster}/role`,
        {
          name: namaRole,
        },
        {
          withCredentials: true,
        }
      );
      await axios.post(
        `${serverMaster}/assign-role-main-menu`,
        {
          role_id: response.data.data,
          main_menu_id: selectedMenus.map((menu) => menu.value),
        },
        { withCredentials: true }
      );

      await axios.post(
        `${serverMaster}/assign-role-permission`,
        {
          role_id: response.data.data,
          permission_id: selectedPermissions.map(
            (permission) => permission.value
          ),
        },
        { withCredentials: true }
      );
      setMsg("");
      onClose();
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
          className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-4 relative"
        >
          <h2 className="text-xl font-semibold mb-4">Add Role</h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          {msg}
          <form onSubmit={save}>
            <div className="w-full h-[70vh] space-y-2 overflow-y-auto">
              <div className="flex items-center mt-2">
                <div className="w-40 font-semibold">Nama Role</div>
                <input
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded focus:outline-none"
                  onChange={(e) => setNamaRole(e.target.value)}
                  required
                  disabled={isLoading}
                  value={namaRole}
                />
              </div>
              <div className="flex items-center mt-2">
                <div className="w-40 font-semibold">Main Menu</div>
                <Select
                  options={menus}
                  onChange={handleChangeMenu}
                  className="w-full border-gray-300 focus:outline-none"
                  onMenuOpen={getMenu}
                  value={selectedMenus}
                  required
                  isMulti
                />
              </div>

              <div className="flex items-center mt-2">
                <div className="w-40 font-semibold">Permission</div>
                <Select
                  options={permissions}
                  onChange={handleChangePermission}
                  className="w-full border-gray-300 focus:outline-none"
                  onMenuOpen={getPermission}
                  value={selectedPermissions}
                  required
                  isMulti
                />
              </div>
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

export default RoleAdd;
