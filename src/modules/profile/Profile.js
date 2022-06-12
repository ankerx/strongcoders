import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { Transition } from "../../components/Transition";
import {
  getUserPosts,
  deletePost,
  removePost,
} from "../../redux/features/posts/postsSlice";
import UserPost from "./UserPost";
function Profile() {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userPosts, loading } = useSelector((state) => ({ ...state.posts }));
  console.log(user);
  const dispatch = useDispatch();
  const userID = user?.user?._id || user?._id;

  console.log(userID);
  const handleDelete = (id) => {
    dispatch(deletePost(id));
    dispatch(removePost(id));
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
    <Transition>
      <div className="text-center pt-20 pb-10 text-white min-h-screen	">
        <h2 className="my-5 text-xl">
          Whaats's up {user?.name}
          <span className="text-light-orange">{user && user?.user?.name}</span>!
        </h2>
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
          <button className="text-light-orange">
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
    </Transition>
  );
}

export default Profile;
