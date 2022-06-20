export const NumberInput = (props) => {
  return (
    <>
      <label className="block text-gray-300 text-sm md:text-lg font-bold ">
        {props.label}
      </label>
      <input
        className="shadow w-24 appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 md:text-lg m-2 md:m-4"
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        onBlur={props.onBlur}
      />
    </>
  );
};
