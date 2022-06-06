import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import CreatePost from "./CreatePost";
import { Exercises } from "./Exercises";
import { stepOne } from "../../redux/features/posts/postsSlice";
export const AddPost = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [page, setPage] = useState(0);
  const formTitle = ["Create your workout", "Exercises"];
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    level: "easy",
    username: user?.user?.name,
  });
  useEffect(() => {
    setFormData({ ...formData, username: user?.user?.name });
  }, [user]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center pt-10 text-white  overflow-x-hidden mx-4 ">
        <div className="text-center mt-14 ">
          <h1 className="text-xl">{formTitle[page]}</h1>
          {page === 0 ? (
            <CreatePost formData={formData} setFormData={setFormData} />
          ) : (
            <Exercises />
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
        </div>
      </div>
    </div>
  );
};
