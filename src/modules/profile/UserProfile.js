import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { Transition } from "../../components/Transition";
import { getUserPosts } from "../../redux/features/posts/postsSlice";
import { UserPost } from "./UserPost";

export const UserProfile = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { userPosts, loading } = useSelector((state) => ({ ...state.posts }));

  const userID = id;

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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mx-10">
          {userPosts?.length > 0 &&
            userPosts?.map((post) => (
              <UserPost
                key={post._id}
                desc={post.desc}
                id={post._id}
                name={post.name}
                hideBtn={true}
              />
            ))}
        </div>
        {userPosts?.length === 0 && (
          <p className="mt-10">No workouts available</p>
        )}
      </div>
    </Transition>
  );
};
