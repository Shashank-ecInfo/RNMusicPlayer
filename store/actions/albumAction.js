import axios from "axios";

import { API_HOST, API_KEY } from "../../utils/https";
import {
  GET_ALBUMS_REQ,
  GET_ALBUMS_SUCCESS,
  GET_ALBUMS_FAILURE,
} from "../types";
import { Alert, Platform, ToastAndroid } from "react-native";

export const getAlbums = () => async (dispatch) => {
  dispatch({ type: GET_ALBUMS_REQ });
  try {
    const res = await axios({
      method: "GET",
      url: `${API_HOST}albums/top?apikey=${API_KEY}`,
    });
    console.log(res.data);
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
