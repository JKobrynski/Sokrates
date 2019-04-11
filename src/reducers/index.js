import { combineReducers } from "redux";
import authReducer from "./authReducer";
import noteReducer from "./noteReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  note: noteReducer,
  errors: errorReducer
});
