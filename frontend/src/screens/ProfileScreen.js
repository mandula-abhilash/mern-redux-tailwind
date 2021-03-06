import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

import Header from "../components/Header";
import { Link } from "react-router-dom";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <>
      <Header />
      <section className="bg-white h-screen">
        <div className="container mt-8 bg-indigo-100 p-6 mx-auto flex items-center justify-between rounded-tl-lg rounded-tr-lg shadow-lg">
          <h4 className="text-lg mx-8 font-bold leading-tight text-gray-800 uppercase">
            User Profile
          </h4>
          <div className="mt-6 md:mt-0">
            <Link
              to="/"
              className="mx-8 bg-white shadow-md focus:outline-none transition duration-150 ease-in-out rounded hover:bg-indigo-700 hover:text-white text-indigo-700 px-5 py-2 text-sm"
            >
              Back
            </Link>
          </div>
        </div>
        <div className="mx-auto flex justify-center md:items-center relative">
          <form
            onSubmit={submitHandler}
            className="w-full sm:w-4/6 md:w-3/6 lg:w-4/12 xl:w-3/12 text-gray-800 mb-12 sm:mb-0 my-10 sm:my-6 px-2 sm:px-0"
          >
            <div className="pt-4 lg:pt-16 px-2 flex flex-col items-center justify-center uppercase">
              {/* <h3 className="text-xl sm:text-2xl xl:text-xl font-bold leading-tight">
                User Profile
              </h3> */}
              {message && <Message variant="danger">{message}</Message>}
              {success && (
                <Message variant="info">Profile updated succesfully</Message>
              )}
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
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
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
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ProfileScreen;
