import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'
import { editPost } from '../state/actions/postsActions'

const EditPost = () => {
  const {id} = useParams();
  const auth = useSelector((state) => state.authReducer)
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [postUser, setPostUser] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();;

  useEffect(() => {
    getPost()
  }, [])

  useEffect(() => {
    if(auth.user && postUser){
      if(postUser._id !== auth.user._id){
        navigate("/")
      }
    }
  }, [isLoaded])

  const getPost = async() => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/posts/${id}`
      )
  
      setPostUser(data.user)
      setTitle(data.title)
      setContent(data.content)
      setIsLoaded(true)
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const user_id = auth.user._id
    dispatch(editPost(id, user_id, title, content))

    navigate('/')
  }

  return (
    <div className="container mx-auto">
      <div className="w-full my-12">
        <form onSubmit={handleEdit}>
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-center">Edit post</h1>
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
 
export default EditPost;