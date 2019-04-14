import { UserSignup, SessionCreate, SessionInfo } from "../rekrClient";
import client from "../client";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  SET_SESSION
} from "./types";

// Stwórz nowe konto
export const registerUser = (userData, history) => dispatch => {
  dispatch(clearErrors());
  client
    .executeSingle(new UserSignup(userData.email, userData.password))
    .then(response => {
      if (response.status === 200) {
        // W przypadku utworzenia nowego konta przekierowanie
        // do formularza logowania
        history.push("/");
      } else {
        // Zapisz błędy zwrócone przez API
        dispatch({
          type: GET_ERRORS,
          payload: response.message
        });
      }
    });
};

// Stwórz nową sesję
export const createSession = (email, password) => dispatch => {
  dispatch(clearErrors());

  client
    .withLogin(email, password)
    .executeSingle(new SessionCreate())
    .then(response => {
      if (response.status === 200) {
        // Wykonanie akcji SET_SESSION dla nowo utworzonej sesji
        // i zapisanie jej
        dispatch(setSession(response.data));

        // Wyciągnięcie sesji z danych zwróconych przez API
        const session = response.data;

        // Zapisanie sesji do localStorage, aby była zapamiętana
        // między odświezeniami strony
        localStorage.setItem("session", JSON.stringify(session));

        // Wykonanie funkcji getSession dla nowo utworzonej sesji
        // w celu zapisania danych biezącego uzytkownika i sesji
        // Potrzebne m.in. do wyświetlenia etykiety uzytkownika w Navbarze
        dispatch(getSession(session));
      } else {
        // Zapis błędów zwróconych przez api
        dispatch({
          type: GET_ERRORS,
          payload: response.message
        });
      }
    });
};

// Pobranie informacji o aktualnej sesji
export const getSessionInfo = session => dispatch => {
  client
    .withSession(session.session_id, session.session_key)
    .executeSingle(new SessionInfo())
    .then(response => {
      if (response.status === 200) {
        console.log(response);
      } else {
        // Zapis błędów zwróconych przez API
        dispatch({
          type: GET_ERRORS,
          payload: response.message
        });
      }
    });
};

// Ustawienie obecnej sesji (Wykonanie SET_SESSION)
export const setSession = session => {
  return {
    type: SET_SESSION,
    payload: session
  };
};

// Pobranie informacji o biezącej sesji
export const getSession = session => dispatch => {
  client
    .withSession(session.session_id, session.session_key)
    .executeSingle(new SessionInfo())
    .then(response => {
      if (response.status === 200) {
        // Wykonanie fukcji setCurrentUser zapisującej informacje
        // o biezącym uzytkowniku
        dispatch(setCurrentUser(response.data.user));

        // Zapisanie danych o biezącym uzytkowniku do localStorage
        // w celu zachowania tych danych między odświezeniami strony
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        // Zapisanie błędów zwróconych przez API
        dispatch({
          type: GET_ERRORS,
          payload: response.message
        });
      }
    });
};

// Ustawienie biezącego uzytkownika
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

// Wyloguj uzytkownika (+ ustawienie sesji jako {})
export const logoutUser = () => dispatch => {
  // Usunięcie danych o biezącej sesji z localStorage
  localStorage.removeItem("session");

  // Zapisanie biezacej sesji jako pusty obiekt w Redux
  dispatch(setSession({}));

  // Usunięcie danych o uytkowniku z localStorage
  localStorage.removeItem("user");

  // Zapisanie biezącego uzytkownika jako pusty obiekt w Redux
  dispatch(setCurrentUser({}));
};

// Wyczyszczenie błędów
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
