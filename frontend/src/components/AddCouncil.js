import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getCouncils } from "../actions/councilActions";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";

const AddCouncil = ({ history }) => {
  // const [authorityName, setAuthorityName] = useState("");
  // const [authorityURL, setAuthorityURL] = useState("");
  // const [authorityType, setAuthorityType] = useState("");
  // const [dateTypes, setDateTypes] = useState("");

  const [formValues, setFormValues] = useState(null);

  const initialValues = {
    authorityName: "",
    authorityURL: "",
    authorityType: "",
    dateTypes: [""],
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const councilList = useSelector((state) => state.councilList);
  let { loading, error, councils } = councilList;

  let message = "";

  useEffect(() => {
    if (userInfo) {
      dispatch(getCouncils());
    } else {
      history.push("/");
    }
  }, [history, dispatch, userInfo]);

  // useEffect(() => {
  //   dispatch(getCouncils());
  // }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(register(name, email, accessKey));
  };

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  return (
    <>
      {loading ? (
        <div className="flex mx-auto justify-center">
          <Loader />
        </div>
      ) : error ? (
        <div className="flex mx-auto justify-center">
          <Message variant="danger">{error}</Message>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen py-4">
          <div className="mx-auto flex-grow container bg-white rounded">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-stretch w-full">
              <div className="w-full lg:w-2/4 xl:w-2/3 flex flex-col lg:flex-row items-start lg:items-center"></div>
            </div>
            <div className="w-full overflow-x-hidden">
              {/* Test Start */}
              <section className="bg-white flex-grow">
                <div className="mx-auto flex justify-center md:items-center relative">
                  {/* TEST START */}
                  <Formik
                    initialValues={formValues || initialValues}
                    onSubmit={onSubmit}
                    enableReinitialize
                  >
                    {(formik) => {
                      console.log("Formik props", formik);
                      return (
                        <Form className="w-full sm:w-4/6 lg:w-6/12 xl:w-8/12 text-gray-600 mb-12 sm:mb-0 my-10 sm:my-6 px-6">
                          <div className="pt-16 px-2 flex flex-col items-center justify-center">
                            <h3 className="text-xl sm:text-2xl xl:text-xl font-bold leading-tight uppercase">
                              Add New Council
                            </h3>
                            {message && (
                              <Message variant="info">
                                {message.message}
                              </Message>
                            )}
                            {error && (
                              <Message variant="danger">{error}</Message>
                            )}
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
                              <Field
                                name="authorityName"
                                id="authorityName"
                                type="text"
                                autoComplete="off"
                                className="h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                              />
                            </div>

                            <div className="flex flex-col mt-8">
                              <label
                                htmlFor="authorityURL"
                                className="text-xs font-semibold leading-tight"
                              >
                                Authority URL
                              </label>
                              <Field
                                name="authorityURL"
                                id="authorityURL"
                                type="text"
                                autoComplete="off"
                                className="h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                              />
                            </div>

                            <div className="flex flex-col mt-8">
                              <label
                                htmlFor="authorityType"
                                className="text-xs font-semibold leading-tight"
                              >
                                Authority Type
                              </label>
                              <Field
                                name="authorityType"
                                id="authorityType"
                                type="text"
                                autoComplete="off"
                                className="h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                              />
                            </div>

                            <div className="flex flex-col mt-8">
                              <label
                                htmlFor="authorityType"
                                className="text-xs font-semibold leading-tight"
                              >
                                Authority Date Types
                              </label>
                              <FieldArray name="dateTypes">
                                {(fieldArrayProps) => {
                                  const {
                                    push,
                                    remove,
                                    form,
                                  } = fieldArrayProps;
                                  const { values } = form;
                                  const { dateTypes } = values;
                                  // console.log('fieldArrayProps', fieldArrayProps)
                                  // console.log('Form errors', form.errors)
                                  return (
                                    <div>
                                      {dateTypes.map((dateType, index) => (
                                        <div
                                          key={index}
                                          className="mx-auto flex items-center justify-center py-2"
                                        >
                                          <Field
                                            name={`dateTypes[${index}]`}
                                            className="h-10 bg-gray-50 focus:bg-white px-2 w-full rounded mt-4 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                                          />
                                          <div className="">
                                            {index > 0 && (
                                              <button
                                                type="button"
                                                className={
                                                  !(index > 0)
                                                    ? "invisible ml-3 text-base focus:outline-none"
                                                    : " ml-3 mt-4 h-10 w-10 rounded items-center justify-center bg-gray-300 flex flex-col mx-auto text-base focus:outline-none shadow-lg"
                                                }
                                                onClick={() => remove(index)}
                                              >
                                                <svg
                                                  className="h-3 w-4"
                                                  viewBox="0 -192 469.33333 469"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path d="m437.332031.167969h-405.332031c-17.664062 0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938 32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0" />
                                                </svg>
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                      {/* Plus */}
                                      <button
                                        type="button"
                                        className="h-10 w-10 mt-4 rounded items-center justify-center bg-gray-300 flex flex-col mx-auto text-base focus:outline-none shadow-lg"
                                        onClick={() => push("")}
                                      >
                                        <svg
                                          className="h-4 w-4"
                                          viewBox="0 0 512 512"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm112 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0" />
                                        </svg>
                                      </button>
                                    </div>
                                  );
                                }}
                              </FieldArray>
                            </div>
                          </div>

                          <div className="px-2 py-6 mb-16 sm:mb-56 md:mb-16 sm:px-6 mx-auto w-full md:w-4/6 lg:w-8/12 xl:w-6/12">
                            <button
                              type="submit"
                              // onClick={() => setFormValues(savedValues)}
                              disabled={!formik.isValid || formik.isSubmitting}
                              className="focus:outline-none w-full bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm mt-6"
                            >
                              Add Council
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                  {/* TEST END */}
                </div>
              </section>

              {/* Test End */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCouncil;
