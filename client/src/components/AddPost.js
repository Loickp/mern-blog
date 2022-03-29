import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addPost, getPosts } from '../state/actions/postsActions'

const AddPost = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const postHandler = async (e) => {
    e.preventDefault();
    const user_id = auth.user._id
    dispatch(addPost(user_id, title, content))
    dispatch(getPosts())

    navigate('/')
  }

  return (
    <div className="container mx-auto">
      <div className="w-full my-12">
        <form onSubmit={postHandler}>
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-center">New post</h1>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Post Title
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Post Title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              Content
            </label>
            <textarea rows="15" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Content"
              required
            >
            </textarea>
          </div>
          <div className="text-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" type="submit">
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
 
export default AddPost;