import { LOGIN_USER, LOGOUT_USER, USER_INFO } from "./actionTypes";

let nextTodoId = 0;

export const loginUser = (user_id, token) => ({
  type: LOGIN_USER,
  payload: {
    user_id,
    token
  }
});

export const logoutUser = user_id => ({
  type: LOGOUT_USER,
  payload: {
    user_id
  }
});

export const userInfo = user_info => ({
  type: USER_INFO,
  payload: {
    user_info
  }
});
