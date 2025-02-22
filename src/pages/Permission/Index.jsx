import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { serverMaster } from "../../config/Index";
import { FiEdit, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import PermissionAdd from "./Add";
import PermissionUpdate from "./Update";
import PermissionDelete from "./Delete";

const PermissionIndex = ({ userLogin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    getPermissions();
  };

  const openModalEdit = (data) => {
    setIsModalOpenEdit(true);
    setDataEdit(data);
  };
  const closeModalEdit = () => {
    setIsModalOpenEdit(false);
    setDataEdit(null);
    getPermissions();
  };

  const openModalDelete = (data) => {
    setIsModalOpenDelete(true);
    setDataDelete(data);
  };
  const closeModalDelete = () => {
    setIsModalOpenDelete(false);
    setDataDelete(null);
    getPermissions();
  };

  const [permissions, setPermissions] = useState([]);
  const getPermissions = async () => {
    const response = await axios.get(`${serverMaster}/permission`, {
      withCredentials: true,
    });
    setPermissions(response.data.data);
  };
  useEffect(() => {
    getPermissions();
  }, []);
  return (
    <Navbar userLogin={userLogin}>
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-eiraHeadline">
            Permission
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
      <PermissionAdd isOpen={isModalOpen} onClose={closeModal} />
      <PermissionUpdate
        isOpen={isModalOpenEdit}
        onClose={closeModalEdit}
        data={dataEdit}
      />
      <PermissionDelete
        isOpen={isModalOpenDelete}
        onClose={closeModalDelete}
        data={dataDelete}
      />

      <div className="bg-white p-4 rounded-xl mt-2 shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText p-2">
                No
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText p-2">
                Nama Permission
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText p-2">
                Url
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText p-2">
                Method
              </th>

              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText p-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!userLogin?.role?.permissions?.find(
              (item) => item?.name == "permissions.get"
            ) && "You dont have permission"}
            {permissions?.map((permission, i) => (
              <tr key={i}>
                <td className="border border-gray-300 p-2">{i + 1}</td>
                <td className="border border-gray-300 p-2">
                  {permission.name}
                </td>
                <td className="border border-gray-300 p-2">{permission.url}</td>
                <td className="border border-gray-300 p-2">
                  {permission.method}
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex justify-center">
                    <FiEdit
                      title="Edit"
                      className="w-6 h-6 cursor-pointer text-green-500 hover:text-green-500/80"
                      onClick={() => openModalEdit(permission)}
                    />
                    <FiTrash2
                      title="Delete"
                      className="w-6 h-6 cursor-pointer text-red-500 hover:text-red-500/80 ml-1"
                      onClick={() => openModalDelete(permission)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Navbar>
  );
};

export default PermissionIndex;
