import axios from "axios";

export const REGISTER = "REGISTER"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const USER_LOADED = "USER_LOADED"

export const register = (username, email, password) => async(dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/auth/register",
      { username, email, password },
      { withCredentials: true }
    )

    dispatch({type: REGISTER, payload: data.user})
  } catch (error) {
    // faire action pour erreurs
    console.log(error.response.data.error);
  }
}

export const login = (email, password) => async(dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/auth/login",
      { email, password },
      { withCredentials: true }
    )

    dispatch({type: LOGIN, payload: data.user})
  } catch (error) {
    // faire action pour erreurs
    console.log(error.response.data.error);
  }
}

export const logout = () => {
  return(dispatch) => {
    try {
      axios.get(
        "http://localhost:3001/api/auth/logout",
        { withCredentials: true }
      )

      dispatch({type: LOGOUT})
    } catch (error) {
      // faire action pour erreurs
      console.log(error.response.data.error);
    }
  }
}

export const loadUser = () => async(dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:3001/api/auth/user",
      { withCredentials: true }
    )

    dispatch({type: USER_LOADED, payload: data.user})
  } catch (error) {
    // faire action pour erreurs
    console.log(error.response.data.error);
  }
}