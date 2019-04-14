import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    // Zapis nowych błędów
    case GET_ERRORS:
      return action.payload;
    // Wyczyszczenie wcześniej zapisanych błędów
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
