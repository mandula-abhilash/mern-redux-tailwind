import React, { useState } from "react";
import Header from "../components/Header";
import Header1 from "../components/Header1";

const DashboardScreen = () => {
  return (
    <>
      {/* <Header /> */}
      <Header1 />
      <div className="flex mx-auto h-screen bg-indigo-100 justify-center items-center">
        Dashboard Screen
      </div>
    </>
  );
};

export default DashboardScreen;
