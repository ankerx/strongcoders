import { SwipeTransition } from "../../../../components/Transition";

export const PostInfo = ({ setFormData, formData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <SwipeTransition>
      <form className="flex flex-col items-center mt-2 lg:p-20  bg-dark-purple py-8 px-12 rounded-md">
        <label className="block text-gray-300 text-sm md:text-lg m-2 mb-1 font-bold ">
          Workout name
        </label>
        <input
          className="shadow w-full appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 md:text-lg "
          type="text"
          placeholder="Workout name"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
        <p className="text-red-500 mt-1 mb-4">{errors && errors.name}</p>

        <label className="text-gray-300 text-sm md:text-lg m-2 mb-1 font-bold">
          Workout level
        </label>
        <select
          className="shadow appearance-none border  rounded  py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3 focus:border-black"
          name="level"
          value={formData.level}
          onChange={handleChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="pro">Pro</option>
        </select>
        <label className="text-gray-300 text-sm md:text-lg m-2 mb-1 font-bold">
          Description
        </label>
        <textarea
          placeholder="Describe your workout"
          onChange={handleChange}
          value={formData.desc}
          name="desc"
          className="shadow appearance-none border max-w-sm w-full rounded  py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  focus:border-black"
        />
        <p className="text-red-500 mt-1 mb-4">{errors && errors.desc}</p>
      </form>
    </SwipeTransition>
  );
};
