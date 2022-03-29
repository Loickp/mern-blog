import { Link } from "react-router-dom";
import postimage from "../assets/image.jpg"

const Card = ({ post }) => {
  return (
    <div className="w-3/4 py-4 m-auto">
      <div className="lg:flex">
        <img src={postimage} alt="" className="rounded-lg lg:w-1/2" />
        <div className="m-4">
          <h1 className="font-bold text-2xl">{ post.title }</h1>
          <p>by <span className="text-blue-500 font-medium">{ post.user.username }</span></p>
          <p className="my-4">{ post.content }</p>
          <div className="py-6">
            <Link to={`/post/${post._id}`}>
              <button className="font-bold px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
                Read more
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Card;