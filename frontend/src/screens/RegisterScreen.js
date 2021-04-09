import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register, registerReset } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [tooltipStatus, setTooltipStatus] = useState(0);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  let { loading, error, message } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    // }, [history, formErrors, userInfo, redirect]);
  }, [history, userInfo, redirect]);

  useEffect(() => {
    if (message) {
      setName("");
      setEmail("");
      setAccessKey("");

      const resetMessageTimer = setTimeout(() => {
        dispatch(registerReset());
        history.push("/");
      }, 10000);

      return () => clearTimeout(resetMessageTimer);
    } else {
      setName(name);
      setEmail(email);
      setAccessKey(accessKey);
    }
  }, [name, email, accessKey, message, error, dispatch, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, accessKey));
  };

  return (
    <section className="bg-white flex-grow">
      <div className="mx-auto flex justify-center md:items-center relative">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-4/6 lg:w-6/12 xl:w-8/12 text-gray-600 mb-12 sm:mb-0 my-10 sm:my-6 px-6"
        >
          <div className="pt-16 px-2 flex flex-col items-center justify-center">
            <h3 className="text-xl sm:text-2xl xl:text-xl font-bold leading-tight uppercase">
              Create New Account
            </h3>
            {message && <Message variant="info">{message.message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
          </div>
          <div className="mt-12 mx-auto w-full xl:w-9/12 2xl:w-6/12 px-2 sm:px-6 uppercase">
            <div className="flex flex-col mt-8">
              <label
                htmlFor="name"
                className="text-xs font-semibold leading-tight"
              >
                Name
              </label>
              <input
                name="name"
                id="name"
                type="text"
                value={name}
                autoComplete="off"
                className="h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-8">
              <label
                htmlFor="email"
                className="text-xs font-semibold leading-tight"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                value={email}
                autoComplete="off"
                className="h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-8">
              <label
                // htmlFor="accessKey"
                className="flex justify-between text-xs font-semibold leading-tight"
              >
                Access Key
                {/*Code Block for indigo tooltip starts*/}
                <div
                  className="relative"
                  onMouseEnter={() => setTooltipStatus(2)}
                  onMouseLeave={() => setTooltipStatus(0)}
                >
                  {tooltipStatus === 2 && (
                    <div
                      role="tooltip"
                      className="z-20 transition duration-150 ease-in-out bottom-0 mb-8 right-0 shadow-lg pt-4 pr-2 pl-3 pb-5 bg-indigo-700 text-gray-600 rounded-bl-md rounded-t-md w-56 md:w-60 absolute"
                    >
                      <svg
                        className="absolute bottom-0 -mb-2 right-2"
                        width="16px"
                        height="8px"
                        viewBox="0 0 16 8"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <g
                          id="Page-1"
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g
                            id="Tooltips-"
                            transform="translate(-84.000000, -203.000000)"
                            fill="#4338ca"
                          >
                            <g
                              id="Group-3-Copy"
                              transform="translate(76.000000, 145.000000)"
                            >
                              <polygon
                                className="shadow"
                                id="Triangle"
                                transform="translate(16.000000, 62.000000) rotate(-180.000000) translate(-16.000000, -62.000000) "
                                points="16 58 24 66 8 66"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                      <p className="text-xs text-white leading-4 normal-case">
                        Contact admin to get the access key
                      </p>
                    </div>
                  )}
                  <div className="ml-2 cursor-pointer">
                    <svg
                      aria-haspopup="true"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-info-circle"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#A0AEC0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx={12} cy={12} r={9} />
                      <line x1={12} y1={8} x2="12.01" y2={8} />
                      <polyline points="11 12 12 12 12 16 13 16" />
                    </svg>
                  </div>
                </div>
              </label>
              <input
                name="accessKey"
                id="accessKey"
                type="password"
                value={accessKey}
                autoComplete="new-password"
                onChange={(e) => setAccessKey(e.target.value)}
                className="h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
              />
            </div>
          </div>

          <div className="px-2 py-6 mb-16 sm:mb-56 md:mb-16 sm:px-6 mx-auto w-full md:w-4/6 lg:w-8/12 xl:w-6/12">
            <button
              type="submit"
              className="focus:outline-none w-full bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm mt-6"
            >
              Register
            </button>
            <p className="mt-16 text-xs text-center">
              Already Have An Account?
              <Link
                className="text-indigo-600 ml-3 font-semibold"
                to={redirect ? `/?redirect=${redirect}` : "/"}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterScreen;
