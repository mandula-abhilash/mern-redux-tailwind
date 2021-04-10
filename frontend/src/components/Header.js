import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import initials from "initialism";
import { logout } from "../actions/userActions";

const Header = () => {
  const history = useHistory();

  const [nameInitials, setNameInitials] = useState("");
  const [show, setshow] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      const { name } = userInfo;
      setNameInitials(initials(name, 2));
    }
  }, [history, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      {userInfo && (
        <div className="m-2 p-2 md:flex items-center w-full justify-between mx-auto container">
          <div className="flex justify-between md:w-1/2 items-center">
            <Link
              to="/"
              className="text-base text-indigo-600 hover:text-indigo-800 font-bold tracking-normal leading-tight p-2 ml-3 lg:block uppercase"
            >
              <span className="hidden md:block">Planning Applications</span>
              <span className="md:hidden text-sm">Planning Apps</span>
            </Link>
            {/* <div className="rounded relative ml-2 md:ml-4 lg:ml-8 w-6/12 md:w-10/12 lg:w-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-500 absolute ml-4 inset-0 m-auto icon icon-tabler icon-tabler-search border-r-1 border-gray-900"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z"></path>
            <circle cx="10" cy="10" r="7"></circle>
            <line x1="21" y1="21" x2="15" y2="15"></line>
          </svg>
          <input
            className="border border-gray-100 focus:outline-none focus:border-brand rounded-full w-full text-sm bg-gray-100 text-gray-500 pl-12 sm:pl-10 md:pl-12 py-2 pr-4"
            type="text"
            placeholder="Search"
          />
        </div> */}
            <div className="flex items-center md:hidden mr-4">
              {/* Mobile Screens */}
              <div
                className="flex items-center lg:mb-0 mr-2 relative cursor-pointer"
                onClick={() => setshow(!show)}
              >
                {show && (
                  <ul className="p-2 w-40 border-r bg-gray-100 absolute rounded z-40 right-0 shadow-xl mt-10 top-0">
                    <Link to="/profile">
                      <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                        <div className="flex items-center">
                          <i class="fas fa-user"></i>
                          <span className="ml-2">My Profile</span>
                        </div>
                      </li>
                    </Link>
                    <li
                      onClick={logoutHandler}
                      className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      <span className="ml-2">Sign Out</span>
                    </li>
                  </ul>
                )}
                {/* <div className="w-8 h-8 bg-cover rounded mr-3">
              <img
                src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_1.png"
                className="rounded h-full w-full overflow-hidden shadow"
                alt
              />
            </div> */}
                <div className="flex items-center border-1 h-9 w-full bg-gray-100 px-3 rounded-md shadow-md">
                  <p className="text-indigo-700 text-sm font-bold tracking-widest">
                    {nameInitials}
                  </p>
                  <div
                    className="ml-2 mt-1 cursor-pointer text-indigo-800"
                    onClick={() => setshow(!show)}
                  >
                    {show ? (
                      <svg
                        id="upIcon1"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-up"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 15 12 9 18 15" />
                      </svg>
                    ) : (
                      <svg
                        id="downIcon1"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-down"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse mt-0 md:flex-row md:items-center">
            <div className="mr-2 lg:mr-6 hidden md:flex items-center">
              <div className="px-6 flex flex-col items-start sm:items-center sm:flex-row flex-wrap">
                {/* Code block starts */}
                <div
                  className="flex items-center lg:mb-0 mr-2 relative cursor-pointer"
                  onClick={() => setshow(!show)}
                >
                  {show && (
                    <ul className="p-2 min-w-max px-4 w-full border-r bg-gray-100 absolute rounded z-40 right-0 shadow-xl mt-16 top-0">
                      <Link to="/profile">
                        <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                          <div className="flex items-center">
                            <i class="fas fa-user"></i>
                            <span className="ml-2">My Profile</span>
                          </div>
                        </li>
                      </Link>
                      <li
                        onClick={logoutHandler}
                        className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
                      >
                        <i className="fas fa-sign-out-alt"></i>
                        <span className="ml-2">Sign Out</span>
                      </li>
                    </ul>
                  )}
                  {/* <div className="w-8 h-8 bg-cover rounded mr-3">
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_1.png"
                  className="rounded h-full w-full overflow-hidden shadow"
                  alt
                />
              </div> */}
                  <div className="flex items-center border-1 h-12 w-full bg-gray-100 px-4 rounded shadow-md">
                    <p className="text-indigo-800 text-base font-medium tracking-tighter">
                      {userInfo.name}
                    </p>
                    <div
                      className="ml-2 mt-1 font-bold cursor-pointer text-indigo-800"
                      onClick={() => setshow(!show)}
                    >
                      {show ? (
                        <svg
                          id="upIcon1"
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-chevron-up"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 15 12 9 18 15" />
                        </svg>
                      ) : (
                        <svg
                          id="downIcon1"
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-chevron-down"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                {/* Code block ends */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
