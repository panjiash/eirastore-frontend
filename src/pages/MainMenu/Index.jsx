/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FiEdit, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { serverMaster } from "../../config/Index";
import MainMenuAdd from "./Add";
import MainMenuUpdate from "./Update";
import MainMenuDelete from "./Delete";
import Navbar from "../../components/Navbar";
/* eslint-disable react/prop-types */
const MainMenuIndex = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    getData();
  };

  const openModalEdit = (data) => {
    setIsModalOpenEdit(true);
    setDataEdit(data);
  };
  const closeModalEdit = () => {
    setIsModalOpenEdit(false);
    setDataEdit(null);
    getData();
  };

  const openModalDelete = (data) => {
    setIsModalOpenDelete(true);
    setDataDelete(data);
  };
  const closeModalDelete = () => {
    setIsModalOpenDelete(false);
    setDataDelete(null);
    getData();
  };

  const [menus, setMenus] = useState([]);
  const getData = async () => {
    const response = await axios.get(`${serverMaster}/api/master/main-menu`, {
      withCredentials: true,
    });
    setMenus(response.data.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Navbar>
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-eiraHeadline">
            Main Menu
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

      <MainMenuAdd isOpen={isModalOpen} onClose={closeModal} />

      <MainMenuUpdate
        isOpen={isModalOpenEdit}
        onClose={closeModalEdit}
        data={dataEdit}
      />

      <MainMenuDelete
        isOpen={isModalOpenDelete}
        onClose={closeModalDelete}
        data={dataDelete}
      />

      <div className="w-full bg-white p-4 rounded-xl mt-2 shadow">
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText">
                No
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText">
                Title
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText">
                Pathname
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {menus?.map((menu, i) => (
              <tr key={i}>
                <td className="text-center border border-gray-300 p-2">
                  <div className="my-1">{i + 1}</div>
                </td>
                <td className="border border-gray-300 p-2">{menu.title}</td>
                <td className="border border-gray-300 p-2">{menu.pathname}</td>
                <td className="border border-gray-300 p-2">
                  <div className="flex justify-center">
                    <FiEdit
                      title="Edit"
                      className="w-6 h-6 cursor-pointer text-green-500 hover:text-green-500/80"
                      onClick={() => openModalEdit(menu)}
                    />
                    <FiTrash2
                      title="Delete"
                      className="w-6 h-6 cursor-pointer text-red-500 hover:text-red-500/80 ml-1"
                      onClick={() => openModalDelete(menu)}
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

export default MainMenuIndex;
