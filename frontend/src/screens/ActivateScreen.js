import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { activateAccount } from "../actions/userActions";

const ActivateScreen = ({ location, history, match }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  let { loading, error, message, userInfo } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const userLoginInfo = userLogin.userInfo;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    if (userInfo || userLoginInfo) {
      history.push(redirect);
    } else {
      let tokenReceived = match.params.token;
      if (tokenReceived) {
        let { name, email } = jwt.decode(tokenReceived);
        console.log(name + " : " + email + " : " + tokenReceived);
        setToken(tokenReceived);
        setName(name);
        setEmail(email);
      }
    }
  }, [history, formErrors, userInfo, userLoginInfo, redirect]);

  useEffect(() => {
    if (message) {
      setPassword("");
      setConfirmPassword("");
    } else {
      setPassword(password);
      setConfirmPassword(confirmPassword);
    }
  }, [name, email, password, confirmPassword, message, error, userRegister]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormErrors("Passwords do not match");
    } else {
      setFormErrors(null);
      dispatch(activateAccount(token, password));
    }
  };

  return (
    <section className="bg-white flex-grow">
      <div className="mx-auto flex justify-center md:items-center relative">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-4/6 lg:w-6/12 xl:w-8/12 text-gray-600 mb-12 sm:mb-0 my-10 sm:my-6 px-6"
        >
          {/* <div className="px-2 flex flex-col items-center justify-center mt-8 sm:mt-0">
            <h2 className="text-4xl leading-tight pt-8">The North</h2>
          </div> */}
          <div className="pt-16 px-2 flex flex-col items-center justify-center">
            <h3 className="text-xl sm:text-2xl xl:text-xl font-bold leading-tight uppercase">
              Activate Your Account
            </h3>
            {formErrors && <Message variant="danger">{formErrors}</Message>}
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
                disabled="disabled"
                autoComplete="off"
                className="h-10 bg-white focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow cursor-not-allowed"
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
                disabled="disabled"
                autoComplete="off"
                className="h-10 bg-white focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow cursor-not-allowed"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-8">
              <label
                htmlFor="password"
                className="text-xs font-semibold leading-tight"
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
                className="h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
              />
            </div>
            <div className="flex flex-col mt-8">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-semibold leading-tight"
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
                className="h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
              />
            </div>
          </div>

          <div className="px-2 py-6 mb-16 sm:mb-56 md:mb-16 sm:px-6 mx-auto w-full md:w-4/6 lg:w-8/12 xl:w-6/12">
            <button
              type="submit"
              className="focus:outline-none w-full bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm mt-6"
            >
              Activate
            </button>
            <p className="mt-16 text-xs text-center">
              Not registered yet?
              <Link
                className="text-indigo-600 ml-3 font-semibold"
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ActivateScreen;
