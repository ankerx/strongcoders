import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../redux/features/posts/postsSlice";
import Spinner from "../../components/Spinner";
import Post from "./post/Post";
import ReactPaginate from "react-paginate";
function AllPosts() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => ({ ...state.posts }));

  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 6;
  const pageVisited = pageNumber * postsPerPage;
  const pageCount = Math.ceil(posts?.length / postsPerPage);

  const reversedArray = [...posts].reverse();

  const allPosts = reversedArray
    .slice(pageVisited, pageVisited + postsPerPage)
    .map((post) => {
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
    });

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="relative pb-20 flex flex-col items-center">
      <h3 className="text-gray-100 my-5 text-xl  md:text-2xl">
        Workouts dashboard
      </h3>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 && allPosts}
      </div>
      {posts.length > 0 && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="flex gap-2 absolute bottom-10 text-white text-xl "
          activeClassName="text-dark-orange"
        />
      )}

      {posts.length === 0 && (
        <p className="text-center text-gray-300  mt-5">
          Couldn't find workouts with these requirements
        </p>
      )}
    </div>
  );
}

export default AllPosts;
