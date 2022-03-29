import { GET_POSTS, EDIT_POST, DELETE_POST } from "../actions/postsActions"

const initialState = {}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return action.payload
    case EDIT_POST:
      return state.map((post) => {
        if (post._id === action.payload.post_id) {
          return {
            ...post,
            title: action.payload.title,
            content: action.payload.content
          }
        } else return post 
      })
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.post_id)
    default:
      return state
  }
}

export default postsReducer