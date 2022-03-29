import axios from "axios";

export const GET_POSTS = "GET_POSTS"
export const EDIT_POST = "EDIT_POST"
export const DELETE_POST = "DELETE_POST"

export const getPosts = () => async(dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:3001/api/posts"
    )

    dispatch({type: GET_POSTS, payload: data})
  } catch (error) {
    // faire action pour erreurs
    console.log(error.response.data.error);
  }
}

export const addPost = (user_id, title, content) => async(dispatch) => {
  try {
    await axios.post(
      "http://localhost:3001/api/posts/add",
      { user_id, title, content },
      { withCredentials: true }
    )
  } catch (error) {
    // faire action pour erreurs
    console.log(error.response.data.error);
  }
}

export const editPost = (post_id, user_id, title, content) => async(dispatch) => {
  try {
    await axios.put(
      `http://localhost:3001/api/posts/${post_id}`,
      { user_id, title, content },
      { withCredentials: true }
    )

    dispatch({type: EDIT_POST, payload: { title, content, post_id }})
  } catch (error) {
    // faire action pour erreurs
    console.log(error.response.data.error);
  }
}

export const deletePost = (post_id) => async(dispatch) => {
  try {
    await axios.delete(
      `http://localhost:3001/api/posts/${post_id}`
    )

    dispatch({type: DELETE_POST, payload: { post_id }})
  } catch (error) {
    // faire action pour erreurs
    console.log(error.response.data.error);
  }
}