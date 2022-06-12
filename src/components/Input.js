export const Input = ({
  name,
  type,
  label,
  placeholder,
  handleChange,
  value,
}) => {
  return (
    <>
      <label className="block text-gray-300 text-md md:text-lg font-bold ">
        {label}
      </label>
      <input
        className="shadow w-60 max-w-sm appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 md:text-lg   m-4 mt-2 mb-10 "
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={value}
      />
    </>
  );
};
