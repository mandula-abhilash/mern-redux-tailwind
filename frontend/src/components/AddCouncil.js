import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { addCouncil } from "../actions/councilActions";
import { useHistory } from "react-router-dom";
import { COUNCIL_ADD_RESET } from "../constants/councilConstants";

const AddCouncil = () => {
  const history = useHistory();

  const [authorityName, setAuthorityName] = useState("");
  const [authorityURL, setAuthorityURL] = useState("");
  const [authorityType, setAuthorityType] = useState("");
  const [dateTypes, setDateTypes] = useState([{ value: null }]);

  const dispatch = useDispatch();

  // const councilList = useSelector((state) => state.councilList);
  // let { loading, error, councils } = councilList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const councilAdd = useSelector((state) => state.councilAdd);
  let { loading, error, success } = councilAdd;

  useEffect(() => {
    dispatch({ type: COUNCIL_ADD_RESET });
    if (success) {
      // dispatch({ type: COUNCIL_ADD_RESET });
      history.push("/");
    }
  }, [dispatch, userInfo, success]);

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

    const dateTypeValues = dateTypes.map(
      (dateType) => dateType != null && dateType.value.trim()
    );
    const values = {
      authorityName: authorityName.trim(),
      authorityURL: authorityURL.trim(),
      authorityType: authorityType.trim(),
      dateTypes: dateTypeValues,
    };
    dispatch(addCouncil(values));
  };

  return (
    <>
      <section className="bg-white flex-grow rounded-md">
        <div className="mx-auto flex justify-center md:items-center relative">
          <form
            onSubmit={submitHandler}
            className="w-full sm:w-4/6 lg:w-6/12 xl:w-8/12 text-gray-600 mb-12 sm:mb-0 my-10 sm:my-6 px-6"
          >
            <div className="pt-16 px-2 flex flex-col items-center justify-center">
              <h3 className="text-xl sm:text-2xl xl:text-xl font-bold leading-tight uppercase">
                Add New Council
              </h3>
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
            </div>
            <div className="mt-12 mx-auto w-full xl:w-9/12 2xl:w-6/12 px-2 sm:px-6 uppercase">
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
                  autoComplete="off"
                  className="h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                  onChange={(e) => setAuthorityName(e.target.value)}
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
                  autoComplete="off"
                  className="h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                  onChange={(e) => setAuthorityURL(e.target.value)}
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
                  autoComplete="off"
                  className="h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                  onChange={(e) => setAuthorityType(e.target.value)}
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
                        autoComplete="off"
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
                Add Council
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddCouncil;
