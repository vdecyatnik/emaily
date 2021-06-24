import axios from "axios";

import { FETCH_USER } from "./types";

//when action creator is called it will return a function redux thunk will see this and auto call it with the dispatch
//wait until we get the response from api and then we will dispatch the action
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};
