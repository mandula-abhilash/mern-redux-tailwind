import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Header from "../components/Header";

const DashboardScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
    } else {
      history.push("/");
    }
  }, [history, userInfo]);

  return (
    <div className="flex-grow">
      <Header />
      <div className="flex mx-auto bg-indigo-100 justify-center items-center">
        Dashboard Screen
        <div className="h-screen"></div>
      </div>
    </div>
  );
};

export default DashboardScreen;
