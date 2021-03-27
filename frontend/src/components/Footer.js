import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="w-full bg-gray-100 px-0 md:px-10 py-8">
        <div className="container mx-auto xl:flex lg:flex text-center xl:text-left lg:text-left">
          <div className="xl:w-3/6 lg:w-3/6 sm:w-full text-center xl:text-left mb-6 xl:mb-0 lg:mb-0">
            <p className="text-indigo-600 text-xs font-medium">
              2020 BRAND NAME. All Rights Reserved
            </p>
          </div>
          <div className="xl:w-3/6 lg:w-3/6 sm:w-full">
            <ul className="xl:flex lg:flex md:flex sm:flex text-xs justify-around">
              <li className="text-indigo-600 hover:text-indigo-800 mb-3 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0">
                <a href="/terms-of-service">Terms of service</a>
              </li>
              <li className="text-indigo-600 hover:text-indigo-800 mb-3 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0">
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li className="text-indigo-600 hover:text-indigo-800 mb-3 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0">
                <a href="/security">Security</a>
              </li>
              <li className="text-indigo-600 hover:text-indigo-800 mb-3 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0">
                <a href="/sitemap">Sitemap</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
