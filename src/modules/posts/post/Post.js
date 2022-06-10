import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GoThumbsup } from "react-icons/go";
import { likePost } from "../../../redux/features/posts/postsSlice";
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
    <div className="p-6 rounded-lg shadow-xl  bg-dark-purple my-5 ">
      <h5 className="text-dark-orange text-xl leading-tight font-medium m-2">
        {name}
      </h5>
      <p className="text-gray-400 ">level {level}</p>
      <p className="text-gray-300 text-base my-6">
        {desc.slice(0, 30)}... <Link to={`/workout/${id}`}>read more</Link>
      </p>

      <div className="flex items-center justify-between">
        <div className="flex text-gray-300  items-center">
          <p>
            {like} {like === 1 ? "like" : "likes"}
          </p>
          {user && (
            <button className="py-3 px-3 " onClick={() => handleLike(id)}>
              <GoThumbsup className="text-blue-500 text-xl hover:scale-125" />
            </button>
          )}
        </div>
        <p className="text-gray-400 ">
          Created by <span className="text-gray-200">{author}</span>
        </p>
      </div>
    </div>
  );
}

export default Post;
