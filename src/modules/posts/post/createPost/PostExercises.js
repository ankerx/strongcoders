import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { createPost } from "../../../../redux/features/posts/postsSlice";
import Button from "../../../../components/Button";
import { NumberInput } from "../../components/NumberInput";
import { SwipeTransition } from "../../../../components/Transition";
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
  const scrollToBottom = useCallback(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const [exercises, setExercises] = useState([initialValues]);
  console.log(exercises);
  const object = {
    ...post,
    exercises: [...exercises],
  };

  const handleChange = (index, event) => {
    let data = [...exercises];
    data[index][event.target.name] = event.target.value;
    setExercises(data);
  };
  const addExercise = useCallback(
    (event) => {
      event.preventDefault();
      setExercises([...exercises, initialValues]);
    },
    [exercises, initialValues]
  );

  useEffect(() => {
    if (divRef.current) scrollToBottom();
  }, [addExercise, scrollToBottom]);

  const removeExercise = (index) => {
    let data = [...exercises];
    data.splice(index, 1);
    setExercises(data);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(exercises);
    dispatch(createPost(object));
    navigate("/");
  };

  return (
    <SwipeTransition>
      <form
        className="flex flex-col items-center m-2 lg:px-20   bg-dark-purple py-8 px-12 rounded-md"
        onSubmit={onSubmit}
      >
        {" "}
        <AnimatePresence exitBeforeEnter>
          {exercises.map((exercise, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
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
                  value={exercises.exerciseName}
                  required
                />
                <NumberInput
                  label="Sets"
                  type="number"
                  name="sets"
                  onChange={(event) => handleChange(index, event)}
                  value={exercises.sets}
                  placeholder="Sets"
                />
                <NumberInput
                  label="Reps"
                  type="number"
                  value={exercises.reps}
                  onChange={(event) => handleChange(index, event)}
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
              </motion.div>
            );
          })}
        </AnimatePresence>
        <Button onClick={addExercise}>Add exercise</Button>
        {exercises.length > 0 && <Button type="submit">SUBMIT WORKOUT</Button>}
      </form>
    </SwipeTransition>
  );
};
