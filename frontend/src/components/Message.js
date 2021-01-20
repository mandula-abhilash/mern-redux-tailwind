import React from "react";

const Message = ({ variant="info", children }) => {
  return (
    <div
      className={
        (variant = "danger"
          ? `text-center w-full text-xs bg-red-200 text-red-500 rounded font-medium p-3 my-8`
          : `text-center w-full text-xs bg-green-200 text-green-500 rounded font-medium p-3 my-8`)
      }
    >
      {children}
    </div>
  );
};

export default Message;