import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../state/actions/postsActions";
import Card from './Card';
import { isEmpty } from './Utils'

const PostList = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.postsReducer);
  
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <div className="container mx-auto">
      <div className="mx-4 my-8 text-center">
        <h1 className="font-bold text-3xl">Recents posts</h1>
      </div>

      <div className="flex flex-col">
        { !isEmpty(posts[0]) && posts.map((post) => {
          return <Card post={post} key={post._id} />;
        })}
      </div>
    </div>
  );
}
 
export default PostList;