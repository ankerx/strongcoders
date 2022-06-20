import React from "react";

export const SelectInput = ({ handleChange }) => {
  return (
    <>
      <label className="text-gray-300 ">Workouts level</label>
      <select
        className="shadow appearance-none border w-28 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  m-3 focus:border-black"
        name="level"
        onChange={handleChange}
      >
        <option value="all">All</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        <option value="pro">Pro</option>
      </select>
    </>
  );
};
