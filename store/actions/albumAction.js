import axios from "axios";

import { API_HOST, API_KEY } from "../../utils/https";
import {
  GET_ALBUMS_REQ,
  GET_ALBUMS_SUCCESS,
  GET_ALBUMS_FAILURE,
} from "../types";

export const getAlbums = (offset) => async (dispatch) => {
  console.log(offset);
  dispatch({ type: GET_ALBUMS_REQ });
  try {
    const res = await axios({
      method: "GET",
      url: `${API_HOST}albums/top?apikey=${API_KEY}&limit=20&offset=${offset}`,
    });
    if (res.status === 200) {
      dispatch({
        type: GET_ALBUMS_SUCCESS,
        payload: { albums: res.data.albums, metaData: res.data.meta },
      });
    } else {
      dispatch({
        type: GET_ALBUMS_FAILURE,
        payload: "No albums found",
      });
    }
  } catch (error) {
    dispatch({ type: GET_ALBUMS_FAILURE, payload: error });
  }
};
