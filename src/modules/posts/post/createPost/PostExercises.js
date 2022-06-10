import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { Input } from "../../../../components/Input";
import { createPost } from "../../../../redux/features/posts/postsSlice";
import Button from "../../../../components/Button";
import { NumberInput } from "../../components/NumberInput";
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
            <Input
              label="Exercise's name"
              onChange={(event) => handleChange(index, event)}
              value={exercises.exerciseName}
              type="text"
              placeholder="Exercise's name"
              name="exerciseName"
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
          </div>
        );
      })}
      <Button onClick={addExercise}>Add exercise</Button>

      {exercises.length > 0 && <Button type="submit">SUBMIT WORKOUT</Button>}
    </form>
  );
};
