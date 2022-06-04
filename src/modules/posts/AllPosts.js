import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../redux/features/posts/postsSlice";

import Spinner from "../../components/Spinner";
import Post from "./post/Post";
function AllPosts() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => ({ ...state.posts }));

  const reversedArray = [...posts].reverse();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h3 className="text-gray-100 my-5">Workouts dashboard</h3>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mx-5">
        {posts.length > 0 &&
          reversedArray.map((post) => {
            return (
              <Post
                author={post.username}
                key={post._id}
                id={post._id}
                name={post.name}
                desc={post.desc}
                likes={post.likes}
                level={post.level}
              />
            );
          })}
      </div>
      {posts.length === 0 && (
        <p className="text-center text-gray-300  mt-5">
          Couldn't find workouts with these requirements
        </p>
      )}
    </div>
  );
}

export default AllPosts;
