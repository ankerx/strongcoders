import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { Transition } from "../../components/Transition";
import { getUsers } from "../../redux/features/posts/postsSlice";

export const Users = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => ({ ...state.posts }));

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Transition>
      <div className="text-center pt-20 text-white min-h-screen mx-8">
        <h1 className="my-5 text-2xl">List of strong coders</h1>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {users &&
            users?.map((user) => (
              <div
                key={user._id}
                className="bg-dark-purple rounded-md p-8 text-white "
              >
                <h3 className="text-light-orange text-xl">
                  {" "}
                  <Link to={`/users/${user._id}`}> {user.name}</Link>
                </h3>
                <p>Created workouts: {user.createdPosts.length}</p>
                <p>Collected likes:</p>
              </div>
            ))}
        </div>
      </div>
    </Transition>
  );
};
