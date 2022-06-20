import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { createPost } from "../../../../redux/features/posts/postsSlice";
import Button from "../../../../components/Button";
import { NumberInput } from "../../components/NumberInput";
import { SwipeTransition } from "../../../../components/Transition";
import { toast } from "react-toastify";
export const PostExercises = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const divRef = useRef();
  const { post } = useSelector((state) => ({ ...state.posts }));

  const initialValues = useMemo(
    () => ({
      exerciseName: "",
      sets: 0,
      reps: 0,
    }),
    []
  );
  const [error, setError] = useState(false);
  const [exercises, setExercises] = useState([initialValues]);
  const handleChange = (index, event) => {
    setExercises((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }
        return {
          ...item,
          [event.target.name]: event.target.value,
        };
      });
    });
    exercises.map((item) => {
      if (item.reps < 0 || item.sets < 0) {
        setError(true);
        // toast.error("Sets & reps can't have a negative value");
      } else {
        setError(false);
      }
    });
  };

  const addExercise = useCallback(
    (event) => {
      event.preventDefault();
      setExercises([...exercises, initialValues]);
    },
    [exercises, initialValues]
  );

  const scrollToBottom = useCallback(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (divRef.current) scrollToBottom();
  }, [addExercise, scrollToBottom]);

  const removeExercise = (index) => {
    let data = [...exercises];
    data.splice(index, 1);
    setExercises(data);
  };

  const object = {
    ...post,
    exercises: [...exercises],
  };
  console.log(error);
  const onSubmit = (event) => {
    event.preventDefault();
    exercises.map((item) => {
      if (item.reps < 0 || item.sets < 0) {
        setError(true);
        toast.error("Sets & reps can't have a negative value");
      } else {
        setError(false);
      }
    });
    if (!error) {
      dispatch(createPost(object));
      navigate("/");
    }
  };

  return (
    <SwipeTransition>
      <form
        className="flex flex-col items-center m-2 lg:px-20   bg-dark-purple py-8 px-12 rounded-md"
        onSubmit={onSubmit}
      >
        {exercises.map((exercise, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center my-4 border-t-2 border-slate-700"
            >
              <label className="block text-gray-300 text-md md:text-lg font-bold ">
                Exercise's name
              </label>
              <input
                className="shadow w-60 max-w-sm appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 md:text-lg   m-4 mt-2 mb-4 "
                type="text"
                placeholder="Exercise's name"
                name="exerciseName"
                onChange={(event) => handleChange(index, event)}
                value={exercise.exerciseName}
                required
              />
              <NumberInput
                label="Sets"
                type="number"
                name="sets"
                onChange={(event) => handleChange(index, event)}
                onBlur={() => exercise.sets < 0 && setError(true)}
                value={exercise.sets}
                placeholder="Sets"
              />

              <NumberInput
                label="Reps"
                type="number"
                value={exercise.reps}
                onChange={(event) => handleChange(index, event)}
                onBlur={() => exercise.reps < 0 && setError(true)}
                name="reps"
                placeholder="Reps"
              />
              <button
                className="mt-1 flex"
                onClick={(e) => {
                  e.preventDefault();
                  removeExercise(index);
                }}
              >
                remove <MdDelete className="text-2xl" />
              </button>
              <div ref={divRef}></div>
            </div>
          );
        })}
        <Button onClick={addExercise}>Add exercise</Button>
        {exercises.length > 0 && <Button type="submit">SUBMIT WORKOUT</Button>}
      </form>
    </SwipeTransition>
  );
};
