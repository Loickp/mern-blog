import { LOGIN, LOGOUT, REGISTER, USER_LOADED } from "../actions/authActions";

const initialState = {
  isAuth: null,
  user: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        user: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        user: null
      }
    default:
      return state
  }
}


export default authReducer