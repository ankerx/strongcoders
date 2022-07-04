import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { Transition } from "../../components/Transition";
import { getUsers } from "../../redux/features/posts/postsSlice";
import ReactPaginate from "react-paginate";
export const Users = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => ({ ...state.posts }));

  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }
  // const usersWithPosts = users.filter((user) => user.createdPosts.length > 0);
  // const userPosts = usersWithPosts
  //   .map((user) => user.createdPosts)
  //   .map((userPost) => userPost);
  // console.log(userPosts[0][0].likes.length);
  // console.log(userPosts.length);
  // for (let i = 0; i < userPosts.length; i++) {
  //   console.log(userPosts[i][0].likes);
  // }
  const usersPerPage = 6;
  const pageVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(users?.length / usersPerPage);

  const allUsers = users
    .slice(pageVisited, pageVisited + usersPerPage)
    .map((user) => (
      <div key={user._id} className="bg-dark-purple rounded-md p-8 text-white ">
        <h3 className="text-light-orange text-xl">
          <Link to={`/users/${user._id}`}> {user.name}</Link>
        </h3>
        <p>Created workouts: {user.createdPosts.length}</p>
      </div>
    ));

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Transition>
      <div className="text-center py-20 text-white min-h-screen mx-8 flex flex-col items-center relative">
        <h1 className="my-5 text-2xl">List of strong coders</h1>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {users && allUsers}
        </div>
        {users && (
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex gap-2 absolute bottom-10 text-xl "
            activeClassName="text-dark-orange"
          />
        )}
      </div>
    </Transition>
  );
};
