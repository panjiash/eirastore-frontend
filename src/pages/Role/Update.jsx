import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { serverMaster } from "../../config/Index";
import Select from "react-select";

const RoleUpdate = ({ isOpen, onClose, data }) => {
  const [namaRole, setNamaRole] = useState("");

  const [menus, setMenus] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [msg, setMsg] = useState("");
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

  const modalRef = useRef(null);
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
  useEffect(() => {
    if (data) {
      setNamaRole(data.name);
      const formattedMainMenu = data.main_menu.map((menu) => {
        return { value: menu.id, label: menu.title };
      });
      setSelectedMenus(formattedMainMenu);
      const formattedPermission = data.permissions.map((permission) => {
        return { value: permission.id, label: permission.name };
      });
      setSelectedPermissions(formattedPermission);
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

  const save = async (e) => {
    e.preventDefault();
    try {
      // rolemainmenus
      const selectedIds = selectedMenus.map((menu) => menu.value);
      const notSelected = data.main_menu.filter(
        (item) => !selectedIds.includes(item.id)
      );
      if (notSelected.length) {
        await axios.delete(`${serverMaster}/remove-role-main-menu`, {
          data: {
            role_id: data.id,
            main_menu_ids: notSelected.map((menu) => menu.id),
          },
          withCredentials: true,
        });
      }

      const oldMenu = data.main_menu.map((menu) => menu.id);
      const addMenuIds = selectedMenus.filter(
        (item) => !oldMenu.includes(item.value)
      );
      if (addMenuIds.length) {
        await axios.post(
          `${serverMaster}/assign-role-main-menu`,
          {
            role_id: data.id,
            main_menu_id: addMenuIds.map((menu) => menu.value),
          },
          { withCredentials: true }
        );
      }

      // rolepermissions
      const selectedPermissionIds = selectedPermissions.map(
        (menu) => menu.value
      );
      const notSelectedPermission = data.permissions.filter(
        (item) => !selectedPermissionIds.includes(item.id)
      );

      if (notSelectedPermission.length) {
        await axios.delete(`${serverMaster}/remove-role-permission`, {
          data: {
            role_id: data.id,
            permission_ids: notSelectedPermission.map(
              (permission) => permission.id
            ),
          },
          withCredentials: true,
        });
      }

      const oldPermissions = data.permissions.map(
        (permission) => permission.id
      );
      const addPermissionIds = selectedPermissions.filter(
        (item) => !oldPermissions.includes(item.value)
      );

      if (addPermissionIds.length) {
        await axios.post(
          `${serverMaster}/assign-role-permission`,
          {
            role_id: data.id,
            permission_id: addPermissionIds.map(
              (permission) => permission.value
            ),
          },
          { withCredentials: true }
        );
      }

      // role
      axios.put(
        `${serverMaster}/role/${data.id}`,
        {
          name: namaRole,
        },
        {
          withCredentials: true,
        }
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
          className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4 relative"
        >
          <h2 className="text-xl font-semibold mb-4">Update User</h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <form onSubmit={save}>
            <div className="w-full space-y-2">
              <div className="flex items-center">
                <div className="w-40 font-semibold">Nama Role</div>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border-2 rounded focus:outline-none"
                  onChange={(e) => setNamaRole(e.target.value)}
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

              <div className="flex float-right">
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
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RoleUpdate;
