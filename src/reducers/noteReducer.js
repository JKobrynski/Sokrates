import { NoteTake, NoteList } from "../rekrClient";
import isEmpty from "../is-empty";

import { GET_NOTES } from "../actions/types";

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
    default: {
      return state;
    }
  }
}
