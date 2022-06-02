function Input(props) {
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold ">
        {props.label}
      </label>
      <input
        className="shadow appearance-none border  rounded w-80 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-3  focus:border-black"
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      />
    </>
  );
}

export default Input;
