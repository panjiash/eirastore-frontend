import React from "react";

/* eslint-disable react/prop-types */
const MainMenuPage = ({ data }) => {
  return (
    <React.Fragment>
      <h1 className="flex text-2xl font-semibold text-eiraHeadline">
        Main Menu
      </h1>
      {/* <div className="flex justify-center">
        <img src="https://via.placeholder.com/1200x800" alt="Background" />
      </div> */}
      <div className="w-full bg-white p-2 rounded-xl mt-4 shadow">
        {data ? (
          <>
            <h2 className="w-full">Hello, {data.user.name}</h2>
          </>
        ) : (
          <div className="flex justify-center">
            <p>Loading user data...</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default MainMenuPage;
