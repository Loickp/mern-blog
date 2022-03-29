import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { dateParser } from "./Utils";
import postimage from "../assets/image.jpg"
import { deletePost } from '../state/actions/postsActions'

const PostDetail = () => {
  const {id} = useParams();
  const auth = useSelector((state) => state.authReducer)
  const dispatch = useDispatch();
  const [post, setPost] = useState({})
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    getPost()
  }, [])

  const getPost = async() => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/posts/${id}`
      )
  
      setPost(data)
      setUser(data.user)
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deletePost(post._id))

    navigate('/')
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="mx-4 my-8 w-3/4">
          <div className="flex justify-between">
            <div>
              <h1 className="font-bold text-3xl">{ post.title }</h1>
              <p>by <a href="" className="text-blue-500 font-medium">{ user.username }</a></p>
            </div>
            {auth.user && auth.user._id === user._id &&
              <div>
                <Link to={`/post/edit/${post._id}`}>
                  <button className="bg-green-600 hover:bg-green-700 px-4 py-2 mx-4 rounded-lg text-white">Edit</button>
                </Link>
                <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white">Delete</button>
              </div>
            }
          </div>
          <hr className="my-2" />
          <p className="font-light italic">{ dateParser(post.createdAt) }</p>
          <img src={postimage} alt="" className="mx-auto my-4 rounded-lg" />
          <p>{ post.content }</p>
        </div>
      </div>
    </div>
  );
}
 
export default PostDetail;