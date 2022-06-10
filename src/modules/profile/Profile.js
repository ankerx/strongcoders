import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import {
  getUserPosts,
  deletePost,
} from "../../redux/features/posts/postsSlice";
import UserPost from "./UserPost";
function Profile() {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userPosts, loading } = useSelector((state) => ({ ...state.posts }));
  const [posts, setPosts] = useState(userPosts);
  console.log(userPosts);
  const dispatch = useDispatch();
  const userID = user?.user?._id;
  const handleDelete = (id) => {
    // dispatch(deletePost(id));
    console.log(id);
  };

  useEffect(() => {
    if (userID) {
      dispatch(getUserPosts(userID));
    }
  }, [dispatch, userID]);
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="text-center pt-20 pb-10 text-white min-h-screen	">
      <h2 className="mt-5">Whaats's up {user && user?.user?.name}!</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
        {userPosts?.length > 0 &&
          userPosts?.map((post) => (
            <UserPost
              key={post._id}
              desc={post.desc}
              id={post._id}
              name={post.name}
              handleDelete={handleDelete}
            />
          ))}
      </div>
      {userPosts?.length === 0 && (
        <button>
          <Link to="/create-post">Add your first post!</Link>
        </button>
      )}
      <div className="m-5">
        <h3 className="text-xl m-5">My personal records:</h3>
        <p>Bench press: 150kg</p>
        <p>Squat: 150kg</p>
        <p>Deadlift: 150kg</p>
      </div>
    </div>
  );
}

export default Profile;
