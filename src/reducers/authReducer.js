import { SET_CURRENT_USER, SET_SESSION } from "../actions/types";
import isEmpty from "../is-empty";

const initialState = {
  isAuthenticated: false,
  // session_id, session_key, expires_at
  session: {},
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SESSION:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        session: action.payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
