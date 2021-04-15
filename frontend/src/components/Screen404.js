import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Screen404 = ({ history }) => {
  let location = useLocation();

  useEffect(() => {
    const reset404Timer = setTimeout(() => {
      history.push("/");
    }, 5000);
    return () => clearTimeout(reset404Timer);
  }, [history]);

  return (
    <div className="flex-grow">
      <div className="w-full h-96 mx-auto justify-center items-center">
        {/* <div className="p-16 m-auto bg-gray-100 dark:bg-gray-800 rounded-xl max-w-2xl"> */}
        <div className="p-16 my-36 bg-gray-100 rounded-xl justify-center items-center mx-auto max-w-2xl">
          <p className="text-2xl break-all lg:text-3xl font-bold lg:leading-10 text-gray-800 dark:text-gray-50">
            No match found for path <code>{location.pathname}</code>
          </p>
          <div className="mt-4">
            <p className="text-sm md:text-lg text-center leading-7 text-gray-700 dark:text-gray-300">
              You will be redirected to home page now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen404;
