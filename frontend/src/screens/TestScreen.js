import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TestScreen = ({ history }) => {
  let location = useLocation();

  useEffect(() => {
    const reset404Timer = setTimeout(() => {
      history.push("/");
    }, 5000000);
    return () => clearTimeout(reset404Timer);
  }, [history]);

  return (
    <>
      <div className="bg-gray-300 max-w-3xl">
        <ul className="flex flex-wrap space-x-4 px-5 justify-center items-center text-center m-4 text-md text-black">
          <li className="mt-4">Home</li>
          <li className="mt-4">Listings</li>
          <li className="mt-4">Podcasts</li>
          <li className="mt-4">Videos</li>
          <li className="mt-4">Tags</li>
          <li className="mt-4">Code of Conduct</li>
          <li className="mt-4">FAQ</li>
          <li className="mt-4">DEV Shop</li>
          <li className="mt-4">Sponsors</li>
          <li className="mt-4">About</li>
          <li className="mt-4">Privacy Policy</li>
          <li className="mt-4">Terms of use</li>
          <li className="mt-4">Contact</li>
          <li className="mt-4 font-bold">Sign In/Up</li>
        </ul>
        <p className="flex flex-wrap justify-center items-center text-center break-all text-2xl lg:text-3xl font-bold lg:leading-10 text-gray-800 dark:text-gray-50">
          No match found for path{" "}
          <code>
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </code>
        </p>
      </div>
    </>
  );
};

export default TestScreen;
