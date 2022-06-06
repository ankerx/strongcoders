export const Input = (props) => {
  return (
    <>
      <label className="block text-gray-300 text-md md:text-lg font-bold ">
        {props.label}
      </label>
      <input
        className="shadow w-60 max-w-sm appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 md:text-lg   m-4 mb-10 "
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      />
    </>
  );
};
