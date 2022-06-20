import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Transition } from "../../../components/Transition";
import { getPost } from "../../../redux/api";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState();

  const fetchPost = async () => {
    try {
      const { data } = await getPost(id);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);
  console.log(post);
  return (
    <Transition>
      <div className="py-20 text-white min-h-screen flex flex-col items-center mx-4">
        {post && (
          <div className="pt-20">
            <h1 className="text-2xl">
              Workout's name:{" "}
              <span className="text-light-orange">{post.name}</span>
            </h1>
            <h4 className="text-xl">
              Level: <span className="text-light-orange">{post.level}</span>
            </h4>
            <p>{post.desc}</p>
          </div>
        )}
        <div className="relative overflow-x-auto shadow-md rounded-lg max-w-md md:max-w-2xl w-full m-4">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs  uppercase bg-gray-700 text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Exercise
                </th>
                <th scope="col" className="px-6 py-3">
                  Sets
                </th>
                <th scope="col" className="px-6 py-3">
                  Reps
                </th>
              </tr>
            </thead>
            {post &&
              post.exercises.map((item) => {
                return (
                  <tbody key={item._id}>
                    <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 text-white">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-white whitespace-nowrap"
                      >
                        {item.exerciseName}
                      </th>
                      <td className="px-6 py-4">{item.sets}</td>
                      <td className="px-6 py-4">{item.reps}</td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
    </Transition>
  );
}

export default PostDetails;
