import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Header from "../components/Header";

const DashboardScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  return (
    <>
      <Header />
      <div className="flex mx-auto h-screen bg-indigo-100 justify-center items-center">
        Dashboard Screen
      </div>
    </>
  );
};

export default DashboardScreen;
