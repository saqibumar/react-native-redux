import { LOGIN_USER, LOGOUT_USER } from "../actions/login/actionTypes";

const initialState = {
    user_id: '',
    token: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER: {
      const { user_id, token } = action.payload
      return {
        ...state,
        user_id: [ ...state, { user_id, token }]
      };
    }
    case LOGOUT_USER: {
      const { user_id } = action.payload
      return {
        ...state,
        user_info: state.user_info.filter((todo) => todo.id != user_id)
      };
    }
    default:
      return state;
  }
}
