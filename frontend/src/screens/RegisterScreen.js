import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  let { loading, error, userInfo } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const userLoginInfo = userLogin.userInfo;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    if (userInfo || userLoginInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, userLoginInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <section className="bg-white flex-grow">
      <div className="mx-auto flex justify-center md:items-center relative">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-4/6 md:w-3/6 lg:w-4/12 xl:w-3/12 text-gray-800 mb-12 sm:mb-0 my-10 sm:my-6 px-2 sm:px-0"
        >
          {/* <div className="px-2 flex flex-col items-center justify-center mt-8 sm:mt-0">
            <h2 className="text-4xl leading-tight pt-8">The North</h2>
          </div> */}
          <div className="pt-16 px-2 flex flex-col items-center justify-center uppercase">
            <h3 className="text-xl sm:text-2xl xl:text-xl font-bold leading-tight">
              Create New Account
            </h3>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
          </div>
          <div className="mt-12 w-full px-2 sm:px-6">
            <div className="flex flex-col mt-5">
              <label
                htmlFor="name"
                className="text-md font-semibold leading-tight"
              >
                Name
              </label>
              <input
                name="name"
                id="name"
                type="text"
                value={name}
                autoComplete="off"
                className="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-5">
              <label
                htmlFor="email"
                className="text-md font-semibold leading-tight"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                value={email}
                autoComplete="off"
                className="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-5">
              <label
                htmlFor="password"
                className="text-md font-semibold fleading-tight"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
              />
            </div>
            <div className="flex flex-col mt-5">
              <label
                htmlFor="confirmPassword"
                className="text-md font-semibold fleading-tight"
              >
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
              />
            </div>
          </div>

          <div className="px-2 py-6 mb-16 sm:mb-56 md:mb-16 sm:px-6">
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
