import React, { useState, useEffect } from "react";
import { FiEdit, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import UserAdd from "./Add.jsx";
import axios from "axios";
import { serverMaster } from "../../config/Index";
import UserUpdate from "./Update.jsx";
import UserDelete from "./Delete.jsx";

/* eslint-disable react/prop-types */
const UserPage = ({ data }) => {
  const [datas, setDatas] = useState([]);
  const [msg, setMsg] = useState("");
  // open modal tambah
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    getDatas();
  };
  // open modal edit
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const openModalEdit = (data) => {
    setIsModalOpenEdit(true);
    setDataEdit(data);
  };
  const closeModalEdit = () => {
    setIsModalOpenEdit(false);
    setDataEdit(null);
    getDatas();
  };
  // open modal delete
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState(null);
  const openModalDelete = (data) => {
    setIsModalOpenDelete(true);
    setDataDelete(data);
  };
  const closeModalDelete = () => {
    setIsModalOpenDelete(false);
    setDataDelete(null);
    getDatas();
  };

  const getDatas = async () => {
    try {
      const response = await axios.get(`${serverMaster}/api/master/user`, {
        withCredentials: true,
      });
      setDatas(response.data.data);

      setMsg("");
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };
  useEffect(() => {
    getDatas();
  }, []);
  return (
    <React.Fragment>
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-eiraHeadline">
            Data User
          </h1>
        </div>
        <div className="flex-1 text-right">
          <button
            className="p-2 bg-eiraButton rounded-xl hover:bg-eiraButton/80"
            onClick={openModal}
          >
            <FiPlusCircle className="w-6 h-6 text-eiraButtonText" />
          </button>
        </div>
      </div>

      <div className="w-full bg-white p-4 rounded-xl mt-2 shadow">
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText">
                No
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText">
                Nama
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText">
                Email
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText">
                Role
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText">
                Permission
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText">
                Status
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {msg ? (
              <tr>
                <td colSpan={20}>{msg}</td>
              </tr>
            ) : (
              datas?.map((data, i) => (
                <tr key={i}>
                  <td className="border-gray-300 border p-2 text-center">
                    {i + 1}
                  </td>
                  <td className="border-gray-300 border p-2">{data.name}</td>
                  <td className="border-gray-300 border p-2">{data.email}</td>
                  <td className="border-gray-300 border p-2">
                    {data.role.name}
                  </td>
                  <td className="border-gray-300 border p-2">
                    <ul>
                      {data.role.permissions.map((permission, j) => (
                        <li key={j}>{permission.url}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border-gray-300 border p-2">
                    {data.is_active ? "Aktif" : "Tidak Aktif"}
                  </td>
                  <td className="border-gray-300 border p-2">
                    <div className="flex justify-center">
                      <FiEdit
                        title="Edit"
                        className="w-6 h-6 cursor-pointer text-green-500 hover:text-green-500/80"
                        onClick={() => openModalEdit(data)}
                      />
                      <FiTrash2
                        title="Delete"
                        className="w-6 h-6 cursor-pointer text-red-500 hover:text-red-500/80 ml-1"
                        onClick={() => openModalDelete(data)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <UserAdd isOpen={isModalOpen} onClose={closeModal} />
      <UserUpdate
        isOpen={isModalOpenEdit}
        onClose={closeModalEdit}
        data={dataEdit}
      />
      <UserDelete
        isOpen={isModalOpenDelete}
        onClose={closeModalDelete}
        data={dataDelete}
      />
    </React.Fragment>
  );
};

export default UserPage;
