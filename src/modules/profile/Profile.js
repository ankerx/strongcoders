import { useEffect, useState } from "react";
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
  console.log(userPosts);

  const dispatch = useDispatch();
  const userID = user?._id;

  useEffect(() => {
    if (userID) {
      dispatch(getUserPosts(userID));
    }
  }, [dispatch, userID]);
  if (loading) {
    return <Spinner />;
  }
  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div className="text-center">
      <h3>Whaats's up {user && user?.user?.name}!</h3>

      {userPosts.length > 0 &&
        userPosts.map((post) => (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 ">
            <UserPost
              key={post._id}
              id={post._id}
              name={post.name}
              handleDelete={handleDelete}
            />
          </div>
        ))}
      {userPosts.length === 0 && (
        <button>
          <Link to="/create-post">Add your first post!</Link>
        </button>
      )}
      <div>
        <p>Records:</p>
        <p>Bench press: 150kg</p>
        <p>Squat: 150kg</p>
        <p>Deadlift: 150kg</p>
      </div>
    </div>
  );
}

export default Profile;
