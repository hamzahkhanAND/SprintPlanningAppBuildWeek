import React from "react";

const ErrorMsg = ({ message }) => {
  return (
    <div className="ml-auto mr-auto w-80 bg-yellow-100 border border-red-400 text-red-700 px-2 py-2 rounded relative">
      <span>{message.name}</span>
    </div>
  );
};

export default ErrorMsg;
