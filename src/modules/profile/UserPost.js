function UserPost({ name, desc, id, handleDelete }) {
  return (
    <div className="p-6 rounded-lg shadow-xl bg-white my-5 ">
      <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
        {name}
      </h5>
      <p className="text-gray-700 text-base mb-4">{desc}</p>
      <p>asdk csadkcm sadkmc sadkcasd ...</p>
      <button
        className="bg-red-500 mt-3 text-white rounded-md py-2 px-5"
        onClick={() => handleDelete(id)}
      >
        delete
      </button>
    </div>
  );
}

export default UserPost;
