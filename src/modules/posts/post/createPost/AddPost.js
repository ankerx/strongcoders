import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
import { Transition } from "../../../../components/Transition";
import { stepOne } from "../../../../redux/features/posts/postsSlice";
import { PostExercises } from "./PostExercises";
import { PostInfo } from "./PostInfo";
export const AddPost = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [page, setPage] = useState(0);
  const [formErrors, setFormErrors] = useState();
  const formTitle = ["Create your workout", "Exercises"];
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    level: "easy",
    username: user?.user?.name,
  });

  if (!formData.username) {
    setFormData({ ...formData, username: user?.user?.name });
  }
  // const validate = (formData) => {
  //   let errors = {};
  //   if (!formData.name) {
  //     errors.name = "Name is required";
  //   }
  //   if (formData.desc.length === 0) {
  //     errors.password = "Description is required!";
  //   }
  //   return errors;
  // };
  // useEffect(() => {
  //   setFormErrors(validate(formData));
  // }, [formData]);
  return (
    <Transition>
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center pt-10 text-white  overflow-x-hidden mx-4 ">
          <div className="text-center mt-14 ">
            <h1 className="text-xl">{formTitle[page]}</h1>
            {page === 0 ? (
              <PostInfo formData={formData} setFormData={setFormData} />
            ) : (
              <PostExercises />
            )}
            <Button
              disabled={page === 0}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </Button>
            <Button
              disabled={page === 1}
              onClick={() => {
                if (page === 0) {
                  dispatch(stepOne(formData));
                  setPage((prev) => prev + 1);
                }
              }}
            >
              Next
            </Button>
            {/* {formErrors.name && (
            <p className="text-red-500 text-sm">{formErrors.name}</p>
          )} */}
          </div>
        </div>
      </div>
    </Transition>
  );
};
