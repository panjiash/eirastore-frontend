/* eslint-disable react/prop-types */

import axios from "axios";
import { serverMaster } from "../../config/Index";

const ProductPage = ({ data }) => {
  const logout = async () => {
    try {
      await axios.delete(`${serverMaster}/logout`, {
        withCredentials: true,
      });
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-eiraBackground intro-y">
      <h1 className="flex justify-center py-2 text-2xl font-semibold text-eiraHeadline">
        Home
      </h1>
      {data ? (
        <>
          <div className="flex justify-center">
            <div className="text-center">
              <h2 className="text-lg text-eiraParagraph font-medium">
                Hello, {data.user.name}
              </h2>
              <p className="text-eiraParagraph">Email: {data.user.email}</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1">
              <button
                className="px-4 py-2 w-full rounded-xl bg-eiraButton text-eiraButtonText"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <p>Loading user data...</p>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
