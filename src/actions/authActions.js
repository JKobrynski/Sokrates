import { UserSignup, SessionCreate, SessionInfo } from "../rekrClient";
import client from "../client";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  SET_SESSION
} from "./types";

// Register new user
export const registerUser = (userData, history) => dispatch => {
  dispatch(clearErrors());
  client
    .executeSingle(new UserSignup(userData.email, userData.password))
    .then(response => {
      if (response.status === 200) {
        console.log(`user id: ${response.data.user_id}`);
      } else {
        // TODO: dispatch
        console.log(`error: ${response.status} ${response.message}`);
        dispatch({
          type: GET_ERRORS,
          payload: response.message
        });
      }
    });
};

// Create session
export const createSession = (email, password) => dispatch => {
  dispatch(clearErrors());
  client
    .withLogin(email, password)
    .executeSingle(new SessionCreate())
    .then(response => {
      if (response.status === 200) {
        dispatch(setSession(response.data));
        // Save session info to local storage
        const session = response.data;
        // Set session to ls
        localStorage.setItem("session", JSON.stringify(session));
        // Set current user with getSession func
        dispatch(getSession(session));
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: response.message
        });
      }
    });
};

// Get session info
export const getSessionInfo = session => dispatch => {
  client
    .withSession(session.session_id, session.session_key)
    .executeSingle(new SessionInfo())
    .then(response => {
      if (response.status === 200) {
        console.log(response);
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: response.message
        });
      }
    });
};

// Set session
export const setSession = session => {
  return {
    type: SET_SESSION,
    payload: session
  };
};

// Get session info
export const getSession = session => dispatch => {
  client
    .withSession(session.session_id, session.session_key)
    .executeSingle(new SessionInfo())
    .then(response => {
      if (response.status === 200) {
        dispatch(setCurrentUser(response.data.user));
        // Save user to local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: response.message
        });
      }
    });
};

// Set current user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

// Logout user (Set session to empty object)
export const logoutUser = () => dispatch => {
  // Remove session data from local storage
  localStorage.removeItem("session");
  // Set session to {}
  dispatch(setSession({}));
  // Remove user from local storage
  localStorage.removeItem("user");
  // Set current user to {}
  dispatch(setCurrentUser({}));
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
