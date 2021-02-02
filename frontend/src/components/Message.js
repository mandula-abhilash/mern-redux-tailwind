import React from "react";

const Message = ({ variant, children }) => {
  return (
    <div
      className={
        variant === "danger"
          ? `text-center w-full text-xs bg-red-100 text-red-500 rounded font-medium p-3 mt-8`
          : `text-center w-full text-xs bg-green-100 text-green-500 rounded font-medium p-3 mt-8`
      }
    >
      {children}
    </div>
  );
};

export default Message;
