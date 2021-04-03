import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Councils from "../components/Councils";

import Header from "../components/Header";
import Registrations from "../components/Registrations";
import Reports from "../components/Reports";
import AddCouncil from "../components/AddCouncil";

const DashboardScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { isAdmin } = userInfo;

  const councilList = useSelector((state) => state.councilList);
  let { loading, error } = councilList;

  const [activeStatus, setActiveStatus] = useState(1);

  useEffect(() => {
    if (userInfo) {
    } else {
      history.push("/");
    }
  }, [history, userInfo, activeStatus]);

  const handleChange = (selectedTab) => {
    selectedTab === "Councils" && setActiveStatus(1);
    selectedTab === "Reports" && setActiveStatus(2);
    selectedTab === "Registrations" && setActiveStatus(3);
    selectedTab === "Add Council" && setActiveStatus(4);
  };

  return (
    <div className="flex-grow">
      <Header />
      {/* Page title starts */}
      <div className="relative z-10 bg-gray-800 pb-16">
        <div className="container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between"></div>
      </div>
      {/* Page title ends */}
      <div className="bg-gray-200 min-h-screen pb-10">
        <div className="container px-6 mx-auto">
          <div className="relative z-10 w-full">
            <div className="w-full -mt-8 h-auto">
              <div className="w-full h-auto lg:h-20 mb-6 rounded shadow bg-white">
                <div className="lg:hidden bg-white w-full relative rounded">
                  <div className="absolute inset-0 m-auto mr-4 z-0 w-6 h-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-selector"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#A0AEC0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="8 9 12 5 16 9" />
                      <polyline points="16 15 12 19 8 15" />
                    </svg>
                  </div>
                  <select
                    aria-label="Selected tab"
                    className="form-select block w-full p-3 border border-gray-300 rounded text-gray-600 appearance-none bg-transparent relative z-10"
                    onChange={(e) => handleChange(e.target.value)}
                  >
                    <option
                      className={
                        activeStatus === 1
                          ? "text-sm text-gray-600 selected"
                          : "text-sm text-gray-600"
                      }
                    >
                      Councils
                    </option>
                    <option
                      className={
                        activeStatus === 2
                          ? "text-sm text-gray-600 selected"
                          : "text-sm text-gray-600"
                      }
                    >
                      Reports
                    </option>
                    <option
                      className={
                        activeStatus === 3
                          ? "text-sm text-gray-600 selected"
                          : "text-sm text-gray-600"
                      }
                    >
                      Registrations
                    </option>
                    {isAdmin && (
                      <option
                        className={
                          activeStatus === 4
                            ? "text-sm text-gray-600 selected"
                            : "text-sm text-gray-600"
                        }
                      >
                        Add Council
                      </option>
                    )}
                  </select>
                </div>
                <ul className="hidden lg:flex flex-row items-center h-full">
                  <li
                    onClick={() => setActiveStatus(1)}
                    className={
                      activeStatus === 1
                        ? "ml-12 my-2 lg:my-0 cursor-pointer rounded text-base bg-gray-800 text-white px-4 py-2 shadow-md font-semibold"
                        : "ml-12 my-2 lg:my-0 cursor-pointer rounded text-base bg-gray-200 shadow-md text-gray-800 px-4 py-2"
                    }
                  >
                    Councils
                  </li>
                  <li
                    onClick={() => setActiveStatus(2)}
                    className={
                      activeStatus === 2
                        ? "ml-12 my-2 lg:my-0 cursor-pointer rounded text-base bg-gray-800 text-white px-4 py-2 shadow-md font-semibold"
                        : "ml-12 my-2 lg:my-0 cursor-pointer rounded text-base bg-gray-200 shadow-md text-gray-800 px-4 py-2"
                    }
                  >
                    Reports
                  </li>
                  <li
                    onClick={() => setActiveStatus(3)}
                    className={
                      activeStatus === 3
                        ? "ml-12 my-2 lg:my-0 cursor-pointer rounded text-base bg-gray-800 text-white px-4 py-2 shadow-md font-semibold"
                        : "ml-12 my-2 lg:my-0 cursor-pointer rounded text-base bg-gray-200 shadow-md text-gray-800 px-4 py-2"
                    }
                  >
                    Registrations
                  </li>
                  {isAdmin && (
                    <li
                      onClick={() => handleChange("Add Council")}
                      className={
                        activeStatus === 4
                          ? "ml-12 my-2 lg:my-0 cursor-pointer rounded text-base bg-gray-800 text-white px-4 py-2 shadow-md font-semibold"
                          : "ml-12 my-2 lg:my-0 cursor-pointer rounded text-base bg-gray-200 shadow-md text-gray-800 px-4 py-2"
                      }
                    >
                      Add Council
                    </li>
                  )}
                </ul>
              </div>
              {/* < className="container mx-auto h-screen min-h-screen"> */}
              {/* <div className="container mx-auto h-screen"> */}
              <div
                // className="container mx-auto min-h-screen h-auto"
                className={
                  loading
                    ? "container mx-auto h-screen"
                    : error
                    ? "container mx-auto h-screen"
                    : "container mx-auto min-h-screen h-auto"
                }
              >
                <div className="bg-white w-full h-full rounded shadow">
                  {activeStatus === 1 && <Councils />}
                  {activeStatus === 2 && <Reports />}
                  {activeStatus === 3 && <Registrations />}
                  {activeStatus === 4 && <AddCouncil />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
