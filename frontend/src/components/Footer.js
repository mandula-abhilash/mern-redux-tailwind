import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="w-full bg-gray-100 px-0 md:px-10 py-8">
        <div className="container mx-auto xl:flex lg:flex text-center xl:text-left lg:text-left">
          <div className="xl:w-3/6 lg:w-3/6 sm:w-full text-center xl:text-left mb-6 xl:mb-0 lg:mb-0">
            <p className="text-gray-800 hover:text-black text-xs font-medium">
              2020{" "}
              <Link className="text-indigo-600 hover:text-indigo-900" to="/">
                BRAND NAME
              </Link>{" "}
              All Rights Reserved
            </p>
          </div>
          <div className="xl:w-3/6 lg:w-3/6 sm:w-full">
            <ul className="xl:flex lg:flex md:flex sm:flex text-xs justify-around">
              <li className="text-gray-800 hover:text-black mb-3 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0 duration-500 ease-in-out transform hover:scale-110">
                <Link to="/terms-of-service">Terms of service</Link>
              </li>
              <li className="text-gray-800 hover:text-black mb-3 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0 duration-500 ease-in-out transform hover:scale-110">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="text-gray-800 hover:text-black mb-3 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0 duration-500 ease-in-out transform hover:scale-110">
                <Link to="/security">Security</Link>
              </li>
              <li className="text-gray-800 hover:text-black mb-3 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0 duration-500 ease-in-out transform hover:scale-110">
                <Link to="/sitemap">Sitemap</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
