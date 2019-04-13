import { NoteTake, NoteList } from "../rekrClient";
import isEmpty from "../is-empty";

import { GET_NOTES, ADD_NOTE } from "../actions/types";

const initialState = {
  notes: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES: {
      return {
        ...state,
        notes: action.payload,
        loading: false
      };
    }
    case ADD_NOTE: {
      return state;
    }
    default: {
      return state;
    }
  }
}
