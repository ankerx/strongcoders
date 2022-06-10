import { Link } from "react-router-dom";

const UserPost = ({ name, desc, id, handleDelete }) => {
  return (
    <div className="p-6 rounded-lg shadow-xl bg-dark-purple m-5 ">
      <h5 className="text-white text-xl leading-tight font-medium mb-2">
        {name}
      </h5>
      <p className="text-gray-300 text-base mb-4">{desc.slice(0, 30)}</p>
      <Link to={`/workout/${id}`}>
        <button className="bg-fuchsia-600 mt-3 text-white rounded-md py-2 px-5 mr-2">
          See details
        </button>
      </Link>

      <button
        className="bg-red-600 mt-3 text-white rounded-md py-2 px-5"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default UserPost;
