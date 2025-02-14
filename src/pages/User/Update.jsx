import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { serverMaster } from "../../config/Index";
import axios from "axios";
const UserUpdate = ({ isOpen, onClose, data }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [role, setRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [msg, setMsg] = useState("");

  const getRoles = async () => {
    if (!roles?.length) {
      const response = await axios.get(`${serverMaster}/role`, {
        withCredentials: true,
      });
      const formattedOptions = response.data.data.map((data) => {
        return { value: data.id, label: data.name };
      });
      setRoles(formattedOptions);
    }
  };

  const handleChangeRole = (option) => {
    setRole({
      value: option.value,
      label: option.label,
    });
  };

  const modalRef = useRef(null);
  useEffect(() => {
    if (data) {
      setMsg("");
      setNama(data.name);
      setEmail(data.email);
      setNoHp(data.phone);
      setAlamat(data.address);
      setRole({
        value: data.role.id,
        label: data.role.name,
      });
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
      const payload = {
        name: nama,
        email: email,
        phone: noHp,
        address: alamat,
        roleId: role?.value,
      };
      await axios.put(`${serverMaster}/user/${data.id}`, payload, {
        withCredentials: true,
      });
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
              {msg}
              <div className="flex items-center">
                <div className="w-40 font-semibold">Nama</div>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border-2 rounded focus:outline-none"
                  onChange={(e) => setNama(e.target.value)}
                  value={nama}
                />
              </div>
              <div className="flex items-center">
                <div className="w-40 font-semibold">Email</div>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border-2 rounded focus:outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="flex items-center">
                <div className="w-40 font-semibold">Nomor HP</div>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border-2 rounded focus:outline-none"
                  onChange={(e) => setNoHp(e.target.value)}
                  value={noHp}
                />
              </div>
              <div className="flex items-center">
                <div className="w-40 font-semibold">Alamat</div>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border-2 rounded focus:outline-none"
                  onChange={(e) => setAlamat(e.target.value)}
                  value={alamat}
                />
              </div>
              <div className="flex items-center">
                <div className="w-40 font-semibold">Role</div>
                <Select
                  options={roles}
                  onChange={handleChangeRole}
                  className="w-full border-gray-300 focus:outline-none"
                  onMenuOpen={getRoles}
                  value={role}
                  required
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
export default UserUpdate;
