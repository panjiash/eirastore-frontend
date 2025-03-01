import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { serverMaster } from "../../config/Index";
import { FiEdit, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import RoleAdd from "./Add";
import RoleUpdate from "./Update";
import RoleDelete from "./Delete";

const RoleIndex = ({ userLogin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState(null);
  const [msg, setMsg] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(`${serverMaster}/role`, {
        withCredentials: true,
      });

      setRoles(response.data.data);
      setMsg("");
    } catch (error) {
      setRoles([]);
      setMsg(error.response.data.message);
    }
  };

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
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  return (
    <Navbar userLogin={userLogin}>
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-eiraHeadline">Role</h1>
        </div>
        <div className="flex-1 text-right">
          {userLogin?.role?.permissions?.find(
            (item) => item.name == "role.post"
          ) && (
            <button
              className="p-2 bg-eiraButton rounded-xl hover:bg-eiraButton/80"
              onClick={openModal}
            >
              <FiPlusCircle className="w-6 h-6 text-eiraButtonText" />
            </button>
          )}
        </div>
      </div>

      <RoleAdd isOpen={isModalOpen} onClose={closeModal} />
      <RoleUpdate
        isOpen={isModalOpenEdit}
        onClose={closeModalEdit}
        data={dataEdit}
      />
      <RoleDelete
        isOpen={isModalOpenDelete}
        onClose={closeModalDelete}
        data={dataDelete}
      />
      <div className="bg-white p-4 rounded-xl mt-2 shadow overflow-x-auto">
        {msg}
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText p-2">
                No
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText p-2">
                Nama Role
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText p-2">
                Menu
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText p-2">
                Permission
              </th>
              <th className="bg-eiraButton font-semibold text-lg text-eiraButtonText p-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {!userLogin?.role?.permissions?.find(
              (item) => item?.name == "roles.get"
            ) && "You dont have permission"}
            {roles.map((role, i) => (
              <tr key={i}>
                <td className="border border-gray-300 p-2">{i + 1}</td>
                <td className="border border-gray-300 p-2">{role.name}</td>
                <td className="border border-gray-300 p-2">
                  {role.main_menu.map((mainMenu) => (
                    <div key={mainMenu.id}>{mainMenu.title}</div>
                  ))}
                </td>
                <td className="border border-gray-300 p-2">
                  {role.permissions.map((permission) => (
                    <div key={permission.id}>{permission.name}</div>
                  ))}
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex justify-center">
                    {userLogin?.role?.permissions?.find(
                      (item) => item.name == "role.put"
                    ) && (
                      <FiEdit
                        title="Edit"
                        className="w-6 h-6 cursor-pointer text-green-500 hover:text-green-500/80"
                        onClick={() => openModalEdit(role)}
                      />
                    )}

                    {userLogin?.role?.permissions?.find(
                      (item) => item.name == "role.delete"
                    ) && (
                      <FiTrash2
                        title="Delete"
                        className="w-6 h-6 cursor-pointer text-red-500 hover:text-red-500/80 ml-1"
                        onClick={() => openModalDelete(role)}
                      />
                    )}
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

export default RoleIndex;
