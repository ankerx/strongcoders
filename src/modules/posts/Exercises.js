import { useState } from "react";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export const Exercises = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (form, e) => {
    e.preventDefault();
  };

  console.log(watch("test")); // watch input value by passing the name of it
  const initialValues = {
    exerciseName: "",
    sets: 0,
    reps: 0,
  };
  const [exercises, setExercises] = useState([initialValues]);
  console.log(exercises);
  const addExercise = (event) => {
    event.preventDefault();
    setExercises([...exercises, initialValues]);
  };
  return (
    <form
      className="flex flex-col items-center m-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input className="text-black" name="test" {...register("test")} />
      {exercises.map((exercise, index) => {
        return (
          <div className="flex ">
            <input
              ref={register()}
              className="shadow w-40 appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 md:text-lg m-4 mb-10"
              type="text"
              name={`exercise${index}`}
              placeholder="Exercise's name"
            />
            <input
              className="shadow w-20 appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 md:text-lg m-4 mb-10"
              type="text"
              name="sets"
              placeholder="Sets"
            />
            <input
              className="shadow w-20 appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 md:text-lg   m-4 mb-10"
              type="text"
              name="reps"
              placeholder="Reps"
            />
          </div>
        );
      })}
      <input value="Save" type="submit" />
      <Button onClick={addExercise}>Add exercise</Button>
    </form>
  );
};
