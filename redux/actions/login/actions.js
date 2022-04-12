import { LOGIN_USER, LOGOUT_USER, SAVE_LOGGEDIN_USER } from "./actionTypes";

let nextTodoId = 0;

export const loginUser = user_info => ({
  type: LOGIN_USER,
  payload: {
    user_info
  }
});

export const logoutUser = user_info => ({
  type: LOGOUT_USER,
  payload: {
    user_info
  }
});

export const saveLoggedInUser = user_info => ({
  type: SAVE_LOGGEDIN_USER,
  payload: {
    user_info
  }
});
