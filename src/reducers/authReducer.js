import { SET_CURRENT_USER, SET_SESSION } from "../actions/types";
import isEmpty from "../is-empty";

// Inicjalizacja state
const initialState = {
  isAuthenticated: false,
  session: {},
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    // Zwróć biezacy state ze zmienionymi wartosciami
    // Zmiana wartosci autoryzacji i zapis danych o sesji
    case SET_SESSION:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        session: action.payload
      };
    // Zapisanie danych o biezącym uzytkowniku
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
