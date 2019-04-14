import { GET_NOTES } from "../actions/types";

// Początkowy state
const initialState = {
  notes: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    // Zwrócenie nowych notatek
    // Zmiana wartości loading na false
    // poniewaz zostały juz pobrane z API
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
