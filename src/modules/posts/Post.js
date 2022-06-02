import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GoThumbsup } from "react-icons/go";
import { likePost } from "../../redux/features/posts/postsSlice";
function Post({ name, desc, id, likes, author, level }) {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const [like, setLike] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const userID = user?.user?._id;
  useEffect(() => {
    setIsLiked(likes.includes(userID));
  }, [likes, userID]);
  const handleLike = (id) => {
    dispatch(likePost(id));
    setIsLiked(!isLiked);
    setLike(isLiked ? like - 1 : like + 1);
  };
  return (
    <div className="p-6 rounded-lg shadow-xl  bg-white my-5 ">
      <h5 className="text-gray-900 text-xl leading-tight font-medium m-2">
        {name}
      </h5>
      <p>level {level}</p>
      <p className="text-gray-700 text-base my-6">
        {desc.slice(0, 30)}... <Link to={`/workout/${id}`}>read more</Link>
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p>{like} likes</p>
          {user && (
            <button
              className="py-3 text-white px-3 "
              onClick={() => handleLike(id)}
            >
              <GoThumbsup className="text-blue-500 text-xl hover:scale-125" />
            </button>
          )}
        </div>
        <p>Created by {author}</p>
      </div>
    </div>
  );
}

export default Post;
