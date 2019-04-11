import { NoteTake, NoteList } from "../rekrClient";
import client from "../client";

import { ADD_NOTE, GET_NOTES, GET_ERRORS, NOTES_LOADING } from "./types";

// Create or edit note
export const createNote = (note, session) => dispatch => {
  client
    .withSession(session.session_id, session.session_key)
    .executeSingle(new NoteTake(note.title, note.body))
    .then(response => {
      if (response.status !== 204) {
        dispatch({
          type: GET_ERRORS,
          payload: response.message
        });
      }
    });
};

// Fetch all notes
export const getNotes = (session, after, volume) => dispatch => {
  dispatch(setNotesLoading());
  client
    .withSession(session.session_id, session.session_key)
    .executeSingle(new NoteList())
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: GET_NOTES,
          payload: response.data.results
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: response.message
        });
      }
    });
};

// Set notes loading
export const setNotesLoading = () => {
  return {
    type: NOTES_LOADING
  };
};
