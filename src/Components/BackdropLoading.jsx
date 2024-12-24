// BackdropLoading.js
import React from "react";

const BackdropLoading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-t-eiraButton border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default BackdropLoading;
