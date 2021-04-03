import {
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
