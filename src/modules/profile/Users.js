import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { getUsers } from "../../redux/features/posts/postsSlice";

function Users() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => ({ ...state.posts }));
  console.log(users);
  const sumLikes = () => {
    let likes;
    // users?.map((user) => {
    //   user.createdPosts.map((post) => (likes = post.likes.length));
    // });
    // users?.forEach(user => {
    //   user.createdPosts.forEach(post =>{

    //   })
    // });
    console.log(likes);
  };
  useEffect(() => {
    dispatch(getUsers());
    sumLikes();
  }, [dispatch]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="text-center pt-20 text-white min-h-screen">
      <h1>Our strong coders</h1>
      {users &&
        users?.map((user) => (
          <div key={user._id} className="bg-dark-purple p-8 text-white ">
            <h3>{user.name}</h3>
            <p>Created workouts: {user.createdPosts.length}</p>
            <p>
              Collected likes:
              {user.createdPosts.map((item) => console.log(item.likes.length))}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Users;
