import React from "react";

const Message = ({ variant, children }) => {
  return (
    <div
      className={
        variant === "danger"
          ? `text-center w-9/12 text-sm bg-gray-100 text-red-500 rounded font-medium p-3 mt-8`
          : `text-center w-full text-sm bg-gray-50 text-green-500 leading-loose rounded font-medium p-3 mt-8`
      }
    >
      {children}
    </div>
  );
};

export default Message;
