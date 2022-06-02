import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/features/posts/postsSlice";

function UserPosts() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => ({ ...state.posts }));
  console.log(users);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div className="mt-20 text-center">
      <h1>Our strong coders</h1>
      {users &&
        users?.map((user) => (
          <div className="bg-black text-white grid grid-cols-1 w-1/2">
            <h3>{user.name}</h3>
          </div>
        ))}
    </div>
  );
}

export default UserPosts;
