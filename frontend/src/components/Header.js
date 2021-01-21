import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="m-2 p-2 md:flex items-center w-full justify-between mx-auto container">
      <div className="flex md:w-1/2 justify-between items-center">
        <div className="rounded relative w-8/12 md:w-10/12 lg:w-1/2">
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
        </div>
        <div className="flex items-center md:hidden mr-4">
          <Link to="/profile">
            <img
              className="h-8 w-8 md:h-10 md:w-10"
              src="https://cdn.tuk.dev/assets/components/todos/profile.png"
              alt="profile"
              srcSet=""
            />
          </Link>
          <div className="ml-2 md:ml-0 cursor-pointer" onClick={logoutHandler}>
            <svg
              className="h-6 lg:h-8 w-6 lg:w-8 text-blue-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <path
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
                d="M32,52.72A20.43,20.43,0,0,1,17.87,17.55a1,1,0,0,1,1.42,0,1,1,0,0,1,0,1.41,18.42,18.42,0,1,0,25.48,0,1,1,0,0,1,0-1.41,1,1,0,0,1,1.42,0A20.43,20.43,0,0,1,32,52.72Z"
              />
              <path
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
                d="M32,34a1,1,0,0,1-1-1V12.28a1,1,0,0,1,2,0V33A1,1,0,0,1,32,34Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse mt-0 md:flex-row md:items-center">
        {/* <div className="relative w-80 sm:w-72 md:w-80 lg:w-auto">
        <select className="focus:outline-none border border-gray-400 rounded-lg appearance-none cursor-pointer text-base sm:text-sm py-3 pl-4 pr-12 text-gray-700">
          <option>Notebook: UX Design brainstorming</option>
          <option>Notebook: UX Design brainstorming</option>
          <option>Notebook: UX Design brainstorming</option>
        </select>
        <div className="w-4 h-4 absolute m-auto inset-0 mr-4 pointer-events-none cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-chevron-down"
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
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div> */}
        <div className="mr-2 lg:mr-6 hidden md:flex items-center">
          <Link to="/profile">
            <img
              className="h-8 w-8 md:h-10 md:w-10"
              src="https://cdn.tuk.dev/assets/components/todos/profile.png"
              alt="profile"
              srcSet=""
            />
          </Link>
          <div className="ml-4 lg:ml-6 cursor-pointer" onClick={logoutHandler}>
            <svg
              className="h-6 lg:h-8 w-6 lg:w-8 text-blue-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <path
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
                d="M32,52.72A20.43,20.43,0,0,1,17.87,17.55a1,1,0,0,1,1.42,0,1,1,0,0,1,0,1.41,18.42,18.42,0,1,0,25.48,0,1,1,0,0,1,0-1.41,1,1,0,0,1,1.42,0A20.43,20.43,0,0,1,32,52.72Z"
              />
              <path
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
                d="M32,34a1,1,0,0,1-1-1V12.28a1,1,0,0,1,2,0V33A1,1,0,0,1,32,34Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
