import React from "react";

const Loader = () => {
  return (
    <>
      <span className="inline-flex rounded-md shadow-sm">
        <p
          type="button"
          className="inline-flex items-center px-4 py-2 mt-8 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
        >
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading
        </p>
      </span>
      {/* <div className="flex space-x-8 text-3xl my-10">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          className="sm:w-16 sm:h-16 w-10 animate-spin h-10 text-red-500"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="7" r="6"></circle>
        </svg>
      </div> */}
    </>
  );
};

export default Loader;
