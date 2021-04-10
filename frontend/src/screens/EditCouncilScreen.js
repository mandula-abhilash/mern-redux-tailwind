import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getCouncilDetails } from "../actions/councilActions";

const EditCouncilScreen = ({ match, history }) => {
  const councilId = match.params.id;

  const [authorityName, setAuthorityName] = useState("");
  const [authorityURL, setAuthorityURL] = useState("");
  const [authorityType, setAuthorityType] = useState("");
  const [dateTypes, setDateTypes] = useState([{ value: null }]);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const councilDetails = useSelector((state) => state.councilDetails);
  let { loading, error, council } = councilDetails;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (!council.authorityName || council._id !== councilId) {
        dispatch(getCouncilDetails(councilId));
      } else {
        let dateTypeValues = [];

        setAuthorityName(council.authorityName);
        setAuthorityURL(council.authorityURL);
        setAuthorityType(council.authorityType);

        council.dateTypes.forEach((dateType) =>
          dateTypeValues.push({ value: dateType })
        );
        setDateTypes(dateTypeValues);
      }
    } else {
      history.push("/");
    }
  }, [dispatch, history, councilId, council, userInfo]);

  const handleDateTypeChange = (index, event) => {
    const values = [...dateTypes];
    values[index].value = event.target.value;
    setDateTypes(values);
  };

  const handleDateTypeAdd = () => {
    const values = [...dateTypes];
    values.push({ value: null });
    setDateTypes(values);
  };

  const handleDateTypeRemove = (index) => {
    const values = [...dateTypes];
    values.splice(index, 1);
    setDateTypes(values);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const dateTypeValues = dateTypes.filter(
      (dateType) => !!dateType.value && !!dateType.value.trim()
    );

    const values = {
      authorityName: authorityName.trim(),
      authorityURL: authorityURL.trim(),
      authorityType: authorityType.trim(),
      dateTypes: dateTypeValues,
    };
    console.log(values);
    // dispatch(addCouncil(values));
  };

  return (
    <>
      <Header />
      <section className="bg-white flex-grow rounded-md pb-20">
        <div className="mt-8 pl-6 md:pl-0 mx-auto w-full sm:w-4/6 lg:w-6/12 xl:w-8/12 flex items-center justify-start rounded-tl-lg rounded-tr-lg">
          <div className="mt-0">
            <Link
              to="/"
              className="bg-white shadow-md focus:outline-none transition duration-150 ease-in-out rounded hover:bg-indigo-700 hover:text-white text-indigo-700 px-3 py-2 text-sm font-semibold"
            >
              <i className="fas fa-long-arrow-alt-left mr-2"></i> Back
            </Link>
          </div>
        </div>
        <div className="mx-auto flex justify-center md:items-center">
          <form
            onSubmit={submitHandler}
            className=" bg-gray-100 rounded w-full sm:w-4/6 lg:w-6/12 xl:w-8/12 text-gray-600 mb-12 sm:mb-0 my-10 sm:my-6 px-6"
          >
            <div className="pt-2 px-2 flex flex-col items-center justify-center">
              <h3 className="text-lg text-pink-600 font-bold my-10 leading-relaxed tracking-tight uppercase text-center">
                {authorityName && <span>{authorityName} Council</span>}
              </h3>
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
            </div>
            <div className="mt-4 mx-auto w-full xl:w-9/12 2xl:w-6/12 px-2 sm:px-6 uppercase">
              <div className="flex flex-col mt-8">
                <label
                  htmlFor="authorityName"
                  className="text-xs font-semibold leading-tight"
                >
                  Authority Name
                </label>
                <input
                  name="authorityName"
                  id="authorityName"
                  type="text"
                  className="h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                  onChange={(e) => setAuthorityName(e.target.value)}
                  value={authorityName}
                />
              </div>
              <div className="flex flex-col mt-8">
                <label
                  htmlFor="authorityURL"
                  className="text-xs font-semibold leading-tight"
                >
                  Authority URL
                </label>
                <input
                  name="authorityURL"
                  id="authorityURL"
                  type="text"
                  className="h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                  onChange={(e) => setAuthorityURL(e.target.value)}
                  value={authorityURL}
                />
              </div>

              <div className="flex flex-col mt-8">
                <label
                  htmlFor="authorityType"
                  className="text-xs font-semibold leading-tight"
                >
                  Authority Type
                </label>
                <input
                  name="authorityType"
                  id="authorityType"
                  type="text"
                  className="h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                  onChange={(e) => setAuthorityType(e.target.value)}
                  value={authorityType}
                />
              </div>

              <div className="flex flex-col mt-8">
                <label
                  htmlFor="dateTypes"
                  className="text-xs font-semibold leading-tight"
                >
                  Date Types
                </label>
                {dateTypes.map((dateType, index) => {
                  return (
                    <div className="flex" key={`${dateType}-${index}`}>
                      <input
                        type="text"
                        value={dateType.value || ""}
                        className={
                          index === 0
                            ? "h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                            : "h-10 bg-gray-50 focus:bg-white px-2 w-5/6 rounded mt-6 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                        }
                        onChange={(e) => handleDateTypeChange(index, e)}
                      />
                      <button
                        type="button"
                        className={
                          index === 0
                            ? "hidden"
                            : "focus:outline-none w-1/6 bg-gray-200 transition duration-150 ease-in-out hover:bg-gray-300 rounded ml-4 mt-6 text-lg font-bold text-indigo-900 shadow-md"
                        }
                        onClick={() => handleDateTypeRemove(index)}
                      >
                        -
                      </button>
                      <button
                        type="button"
                        className={
                          index === 0
                            ? "focus:outline-none w-1/6 bg-gray-200 transition duration-150 ease-in-out hover:bg-gray-300 rounded ml-4 mt-2 text-lg font-bold text-indigo-900 shadow-md"
                            : "focus:outline-none w-1/6 bg-gray-200 transition duration-150 ease-in-out hover:bg-gray-300 rounded ml-4 mt-6 text-lg font-bold text-indigo-900 shadow-md"
                        }
                        onClick={() => handleDateTypeAdd()}
                      >
                        +
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="px-2 py-6 mb-16 sm:mb-56 md:mb-16 sm:px-6 mx-auto w-full md:w-4/6 lg:w-8/12 xl:w-6/12">
              <button
                type="submit"
                className="focus:outline-none w-full bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm mt-6"
              >
                Update Council
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditCouncilScreen;
