import { combineReducers } from "redux";
import todos from "./todos";
import login from "./login";

export default combineReducers({ todos, login });
