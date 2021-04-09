import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

import Header from "../components/Header";
import { Link } from "react-router-dom";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [editProfile, setEditProfile] = useState(false);

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
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        setPassword("");
        setConfirmPassword("");
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, userLogin, success, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else if (!password) {
      setMessage("Please enter your password");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      // setPassword("");
      // setConfirmPassword("");
    }
  };

  return (
    <>
      <Header />
      <section className="bg-white flex-grow">
        <div className="container w-11/12 md:w-10/12 mx-auto my-16 h-auto rounded shadow-2xl">
          <div className="mt-8 p-6 bg-gray-100 mx-auto flex items-center justify-between rounded-tl-lg rounded-tr-lg">
            <h4 className="text-sm md:text-lg mx-2 md:mx-8 font-bold leading-tight text-gray-800 uppercase">
              {editProfile ? "Edit Profile" : "Profile"}
            </h4>
            <div className="mt-0">
              <button
                onClick={() => setEditProfile(true)}
                className="ml-2 bg-white shadow-md focus:outline-none transition duration-150 ease-in-out rounded hover:bg-indigo-700 hover:text-white text-indigo-700 px-3 py-2 text-sm"
              >
                Edit
              </button>
              <Link
                to="/"
                className="ml-2 bg-white shadow-md focus:outline-none transition duration-150 ease-in-out rounded hover:bg-indigo-700 hover:text-white text-indigo-700 px-3 py-2 text-sm"
              >
                Back
              </Link>
            </div>
          </div>

          <div className="mx-auto flex bg-white justify-center md:items-center relative rounded-bl-lg rounded-br-lg">
            <form
              onSubmit={submitHandler}
              className="w-full sm:w-4/6 md:w-4/6 lg:w-5/12 xl:4/12 text-gray-800 mb-12 sm:mb-0 my-10 sm:my-6 px-2 sm:px-0"
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
                {/* {loading && <Loader />} */}
              </div>
              {loading ? (
                <div className="flex mx-auto h-20 mt-24 mb-48 justify-center">
                  <Loader />
                </div>
              ) : (
                <>
                  <div className="mt-12 w-full px-2 sm:px-6">
                    <div className="flex flex-col mt-5">
                      <label
                        htmlFor="name"
                        className="text-md font-semibold leading-tight"
                      >
                        Name :
                      </label>
                      {editProfile ? (
                        <input
                          name="name"
                          id="name"
                          type="text"
                          value={name}
                          className="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 bg-white focus:bg-white border shadow"
                          onChange={(e) => setName(e.target.value)}
                        />
                      ) : (
                        <p className="h-10 p-2 w-full rounded mt-2 text-gray-600 shadow-md">
                          {name}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col mt-5">
                      <label
                        htmlFor="email"
                        className="text-md font-semibold leading-tight"
                      >
                        Email :
                      </label>
                      {editProfile ? (
                        <input
                          name="email"
                          id="email"
                          type="email"
                          disabled="disabled"
                          value={email}
                          className="h-10 px-2 bg-gray-300 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow cursor-not-allowed"
                          // onChange={(e) => setEmail(e.target.value)}
                        />
                      ) : (
                        <p className="h-10 p-2 w-full rounded mt-2 text-gray-600 shadow-md">
                          {email}
                        </p>
                      )}
                    </div>
                    {editProfile && (
                      <>
                        <div className="flex flex-col mt-5">
                          <label
                            htmlFor="password"
                            className="text-md font-semibold fleading-tight"
                          >
                            Password :
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
                            Confirm Password :
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
                      </>
                    )}
                  </div>

                  <div className="px-2 py-6 mb-16 sm:mb-56 md:mb-16 sm:px-6">
                    {editProfile && (
                      <button
                        type="submit"
                        className="focus:outline-none w-full bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm mt-6"
                      >
                        Update
                      </button>
                    )}
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileScreen;
