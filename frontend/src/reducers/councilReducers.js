import {
  COUNCIL_ADD_FAIL,
  COUNCIL_ADD_REQUEST,
  COUNCIL_ADD_RESET,
  COUNCIL_ADD_SUCCESS,
  COUNCIL_LIST_FAIL,
  COUNCIL_LIST_REQUEST,
  COUNCIL_LIST_SUCCESS,
} from "../constants/councilConstants";

//council list
export const councilListReducer = (state = { councils: [] }, action) => {
  switch (action.type) {
    case COUNCIL_LIST_REQUEST:
      return { loading: true, councils: [] };
    case COUNCIL_LIST_SUCCESS:
      return { loading: false, councils: action.payload.councils };
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
      return { loading: false, message: action.payload };
    case COUNCIL_ADD_FAIL:
      return { loading: false, error: action.payload };
    case COUNCIL_ADD_RESET:
      return {};
    default:
      return state;
  }
};
