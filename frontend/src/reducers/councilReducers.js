import {
  COUNCIL_LIST_FAIL,
  COUNCIL_LIST_REQUEST,
  COUNCIL_LIST_SUCCESS,
  COUNCIL_ADD_FAIL,
  COUNCIL_ADD_REQUEST,
  COUNCIL_ADD_RESET,
  COUNCIL_ADD_SUCCESS,
  COUNCIL_DELETE_FAIL,
  COUNCIL_DELETE_REQUEST,
  COUNCIL_DELETE_SUCCESS,
  COUNCIL_DETAILS_REQUEST,
  COUNCIL_DETAILS_SUCCESS,
  COUNCIL_DETAILS_FAIL,
  COUNCIL_DETAILS_RESET,
} from "../constants/councilConstants";

//council list
export const councilListReducer = (state = { councils: [] }, action) => {
  switch (action.type) {
    case COUNCIL_LIST_REQUEST:
      return { loading: true, councils: [] };
    case COUNCIL_LIST_SUCCESS:
      return {
        loading: false,
        councils: action.payload.councils,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case COUNCIL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//council add
export const councilAddReducer = (state = {}, action) => {
  switch (action.type) {
    case COUNCIL_ADD_REQUEST:
      return { loading: true, error: null };
    case COUNCIL_ADD_SUCCESS:
      return { loading: false, success: true };
    case COUNCIL_ADD_FAIL:
      return { loading: false, error: action.payload };
    case COUNCIL_ADD_RESET:
      return {};
    default:
      return state;
  }
};

//council delete
export const councilDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COUNCIL_DELETE_REQUEST:
      return { loading: true };
    case COUNCIL_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COUNCIL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//council details
export const councilDetailsReducer = (state = { council: {} }, action) => {
  switch (action.type) {
    case COUNCIL_DETAILS_REQUEST:
      return { ...state, loading: true };
    case COUNCIL_DETAILS_SUCCESS:
      return { loading: false, council: action.payload };
    case COUNCIL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case COUNCIL_DETAILS_RESET:
      return { council: {} };
    default:
      return state;
  }
};
