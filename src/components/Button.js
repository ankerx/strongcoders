function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className="bg-black shadow-md hover:shadow-xl uppercase font-medium text-xs leading-tight text-white my-5 py-3 px-6 rounded cursor-pointer"
    >
      {props.children}
    </button>
  );
}

export default Button;
