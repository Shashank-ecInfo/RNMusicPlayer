import {
  GET_ALBUMS_REQ,
  GET_ALBUMS_SUCCESS,
  GET_ALBUMS_FAILURE,
} from "../types";

const initState = {
  isLoading: false,
  albums: [],
  meta: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_ALBUMS_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALBUMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        albums: action.payload.albums,
        meta: action.payload.metaData,
      };
    case GET_ALBUMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
