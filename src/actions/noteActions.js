import { NoteTake, NoteList } from "../rekrClient";
import client from "../client";

import { GET_NOTES, GET_ERRORS, NOTES_LOADING } from "./types";

// Stwórz lub edytuj notatkę
export const createNote = (note, session) => dispatch => {
  client
    .withSession(session.session_id, session.session_key)
    .executeSingle(new NoteTake(note.title, note.body))
    .then(response => {
      if (response.status !== 204) {
        // Zapisanie błędów zwróconych przez API
        dispatch({
          type: GET_ERRORS,
          payload: response.message
        });
      } else {
        // Wykonanie funkcji getNotes, pobierającej notatki
        // stworzone przez biezącego uzytkownika
        dispatch(getNotes(session, null, null));
      }
    });
};

// Pobranie z api notatek uzytkownika
export const getNotes = session => dispatch => {
  // Ustawienie "ładowania" notatek w oczekiwaniu
  // na odpowiedź z API
  dispatch(setNotesLoading());

  client
    .withSession(session.session_id, session.session_key)
    .executeSingle(new NoteList())
    .then(response => {
      if (response.status === 200) {
        // Zapisanie pobranych notatek w Redux
        dispatch({
          type: GET_NOTES,
          payload: response.data.results
        });
      } else {
        // Zapisanie błędów zwróconych przez API
        dispatch({
          type: GET_ERRORS,
          payload: response.message
        });
      }
    });
};

// Ustawienie "ładowania" notatek
export const setNotesLoading = () => {
  return {
    type: NOTES_LOADING
  };
};
