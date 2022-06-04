function Button(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className="bg-dark-orange shadow-md mx-5 hover:shadow-xl uppercase font-medium text-xs leading-tight text-white my-5 py-3 px-6 rounded cursor-pointer  disabled:bg-slate-50 disabled:text-gray-600 disabled:border-slate-200 disabled:shadow-none"
    >
      {props.children}
    </button>
  );
}

export default Button;
