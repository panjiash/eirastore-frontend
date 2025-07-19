import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { serverMaster } from "../../config/Index";
import { FiEdit, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import PermissionAdd from "./Add";
import PermissionUpdate from "./Update";
import PermissionDelete from "./Delete";
import TablePagination from "../../components/TablePagination";

const PermissionIndex = ({ userLogin }) => {
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

  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (param) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${serverMaster}/permission`, {
        withCredentials: true,
        params: param,
      });
      setData(response.data);
    } catch (error) {
      setData([]);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const storageTitle = "permissionParam";
  const storageParams = sessionStorage.getItem(storageTitle);
  const saveToStorage = (param) => {
    setParams(param);
    getData(param);
    sessionStorage.setItem(storageTitle, JSON.stringify(param));
  };

  const changeLimit = (e) => {
    const newParams = {
      ...params,
      page: 1,
      limit: parseInt(e.target.value),
    };
    saveToStorage(newParams);
  };

  const changeSearch = (e) => {
    const newParams = {
      ...params,
      search: e.target.value,
      page: 1,
    };
    saveToStorage(newParams);
  };

  const handlePageChange = (newPage) => {
    const newParams = {
      ...params,
      page: newPage,
    };
    saveToStorage(newParams);
  };

  useEffect(() => {
    let initialParams = params;
    if (storageParams) {
      initialParams = JSON.parse(storageParams);
      setParams(initialParams);
    }
    getData(initialParams);
  }, []);

  const totalPages = Math.ceil((data?.total || 0) / params.limit);

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

      <div className="bg-white p-4 rounded-xl mt-2 shadow">
        <TablePagination
          search={params.search}
          limit={params.limit}
          page={params.page}
          total={{ current: data?.data?.length, all: data?.total }}
          totalPages={totalPages}
          onSearchChange={changeSearch}
          onLimitChange={changeLimit}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        >
          <div className="overflow-x-auto">
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
                {data?.data?.map((permission, i) => (
                  <tr key={i}>
                    <td className="border border-gray-300 p-2">{i + 1}</td>
                    <td className="border border-gray-300 p-2">
                      {permission.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {permission.url}
                    </td>
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
        </TablePagination>
      </div>
    </Navbar>
  );
};

export default PermissionIndex;
