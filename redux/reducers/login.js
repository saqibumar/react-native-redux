import { SAVE_LOGGEDIN_USER, LOGOUT_USER } from "../actions/login/actionTypes";

const initialState = {
    user_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case  SAVE_LOGGEDIN_USER: {
      const {token, user} = action.payload.user_info
      // console.log('>>>>>>',user.email);
      const {first_name, last_name, email, phone} = user
      return {
        ...state,
        //todo_list: [ ...state.todo_list, { id, task }] // { id: id, task: task }
        //user_id: [ ...state.user_id, { id:'Chrix:' }],
        first_name:  first_name,
        last_name:  last_name ,
        email:  email,
        phone:  phone 
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
