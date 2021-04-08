import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCouncils, deleteCouncil } from "../actions/councilActions";
import Loader from "./Loader";
import Message from "./Message";

const Councils = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const councilList = useSelector((state) => state.councilList);
  let { loading, error, councils } = councilList;

  const councilDelete = useSelector((state) => state.councilDelete);
  let {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = councilDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(getCouncils());
    } else {
      history.push("/");
    }
  }, [history, dispatch, userInfo, successDelete]);

  const deleteCouncilHandler = (id) => {
    dispatch(deleteCouncil(id));
  };

  return (
    <>
      {loading || loadingDelete ? (
        <div className="flex mx-auto justify-center">
          <Loader />
        </div>
      ) : error || errorDelete ? (
        <div className="flex mx-auto justify-center">
          <Message variant="danger">{error}</Message>
        </div>
      ) : (
        <>
          <div
            className={
              loading || loadingDelete
                ? "container mx-auto h-screen min-h-screen"
                : error || errorDelete
                ? "container mx-auto h-screen min-h-screen"
                : "flex flex-col min-h-screen pt-4 pb-12"
            }
          >
            <div className="mx-auto flex-grow container bg-white rounded">
              <div className="flex flex-col lg:flex-row p-8 justify-between items-start lg:items-stretch w-full">
                <div className="w-full lg:w-2/4 xl:w-2/3 flex flex-col lg:flex-row items-start lg:items-center">
                  <div className="w-full relative mb-2 lg:mb-0 lg:mr-4">
                    <div className="absolute text-gray-600 dark:text-gray-400 flex items-center pl-4 h-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-search"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx={10} cy={10} r={7} />
                        <line x1={21} y1={21} x2={15} y2={15} />
                      </svg>
                    </div>
                    <label htmlFor="search" className="hidden" />
                    <input
                      id="search"
                      className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-12 text-sm border-gray-300 dark:border-gray-200 rounded border"
                      placeholder="Search councils"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-2/4 xl:w-1/3 flex flex-col lg:flex-row items-start lg:items-center justify-between">
                  <div className="relative w-full lg:w-2/4 my-2 lg:my-0 lg:mx-2 xl:mx-4 z-10">
                    <div className="z-0 absolute inset-0 m-auto mr-2 xl:mr-4 w-5 h-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon cursor-pointer icon-tabler icon-tabler-chevron-down"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#a0aec0"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    <select
                      aria-label="Selected tab"
                      className="relative z-10 cursor-pointer focus:outline-none focus:border-gray-800 focus:shadow-outline-gray text-sm form-select block w-full py-2 px-2 xl:px-3 border border-gray-300 dark:border-gray-200 rounded text-gray-600  dark:text-gray-400  appearance-none bg-transparent"
                    >
                      <option
                        defaultValue={"ALL"}
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        ALL
                      </option>
                      <option className="text-sm text-gray-600 dark:text-gray-400">
                        PENDING
                      </option>
                      <option className="text-sm text-gray-600 dark:text-gray-400">
                        RUNNING
                      </option>
                      <option className="text-sm text-gray-600 dark:text-gray-400">
                        COMPLETED
                      </option>
                      <option className="text-sm text-gray-600 dark:text-gray-400">
                        TERMINATED
                      </option>
                    </select>
                  </div>
                  <button className="focus:shadow-outline-gray border border-transparent w-auto lg:w-1/4 my-2 lg:my-0 lg:ml-2 xl:ml-4 bg-indigo-700 transition focus:outline-none focus:border-gray-800 focus:shadow-outline-gray duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-sm tracking-wider">
                    SEARCH
                  </button>
                </div>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded">
                  <thead>
                    <tr className="w-full h-16 border-gray-300 border-b py-8 bg-indigo-100">
                      <th className="pl-8 text-gray-600 font-bold pr-6 text-center text-sm tracking-normal leading-4">
                        Council Name
                      </th>
                      <th className="text-gray-600 font-bold pr-6 text-center text-sm tracking-normal leading-4">
                        URL
                      </th>
                      <th className="text-gray-600 font-bold pr-6 text-center text-sm tracking-normal leading-4">
                        Type
                      </th>
                      <th className="text-gray-600 font-bold pr-6 text-center text-sm tracking-normal leading-4">
                        Date Types
                      </th>
                      <th className="text-gray-600 font-bold pr-6 text-center text-sm tracking-normal leading-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {councils &&
                      councils.map((council) => (
                        <tr
                          key={council._id}
                          className="h-20 border-gray-300 border-t border-b hover:border-indigo-300 hover:shadow-md transition duration-150 ease-in-out"
                        >
                          <td className="pl-8 pr-6 text-center whitespace-no-wrap text-sm text-gray-800  tracking-normal leading-4">
                            {council.authorityName}
                          </td>
                          <td className="text-sm pr-6 whitespace-no-wrap text-center text-gray-800  tracking-normal leading-4">
                            {council.authorityURL}
                          </td>
                          <td className="text-sm pr-6 whitespace-no-wrap text-center text-gray-800  tracking-normal leading-4">
                            {council.authorityType}
                          </td>
                          {/* <td className="pr-6">
                          <div className="w-full flex justify-center items-center h-full">
                            <div className="bg-indigo-200 text-indigo-700 rounded-full text-sm leading-3 py-2 px-5">
                              New
                            </div>
                          </div>
                        </td> */}
                          <td className="text-sm pr-6 whitespace-no-wrap text-center text-gray-800  tracking-normal leading-4">
                            {council.dateTypes && council.dateTypes.join(", ")}
                          </td>

                          <td className="text-sm pr-6 whitespace-no-wrap text-center text-gray-800  tracking-normal leading-4">
                            <div className="flex items-center justify-center">
                              <a
                                className="rounded border border-transparent focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                                href="/"
                              >
                                <div className="p-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-indigo-700">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-edit"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                    <line x1={16} y1={5} x2={19} y2={8} />
                                  </svg>
                                </div>
                              </a>

                              <button
                                onClick={() =>
                                  deleteCouncilHandler(council._id)
                                }
                                className="rounded border border-transparent focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                              >
                                <div className="p-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-red-500">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-trash"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1={4} y1={7} x2={20} y2={7} />
                                    <line x1={10} y1={11} x2={10} y2={17} />
                                    <line x1={14} y1={11} x2={14} y2={17} />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                  </svg>
                                </div>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mx-auto container pt-8 flex justify-center items-center">
              <a
                className="mr-2 sm:mr-5 rounded border border-transparent focus:outline-none focus:border-gray-800 text-gray-600 focus:shadow-outline-gray"
                href="/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left text-gray-800 "
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </a>
              <p className="text-gray-800  fot-normal text-base">Page</p>
              <label htmlFor="selectedPage" className="hidden" />
              <input
                id="selectedPage"
                type="text"
                className="bg-white dark:bg-gray-800 w-8 px-2 mx-2 text-gray-800  focus:outline-none focus:shadow-outline-gray focus:border focus:border-indigo-700 font-normal flex items-center text-base border-gray-300 rounded border"
                defaultValue={4}
              />
              <p className="text-gray-800  fot-normal text-base">of 20</p>
              <a
                className="mx-2 sm:mx-5 rounded border border-transparent focus:outline-none focus:border-gray-800 text-gray-600 focus:shadow-outline-gray"
                href="/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-800  icon icon-tabler icon-tabler-chevron-right"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </a>
              {/* <label htmlFor="totalPage" className="hidden" />
          <p className="-mt-1 text-gray-800  fot-normal text-base">Page</p>
          <input
            id="totalPage"
            type="text"
            className="bg-white dark:bg-gray-800 w-10 px-2 mr-2 text-gray-800  focus:outline-none focus:shadow-outline-gray focus:border focus:border-indigo-700 font-normal flex items-center text-base border-gray-300 rounded border"
            defaultValue={30}
          /> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Councils;
