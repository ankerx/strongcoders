import { useState } from "react";
import Button from "../../components/Button";
import CreatePost from "./CreatePost";
import { Exercises } from "./Exercises";

export const AddPost = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(0);
  const formTitle = ["Create your workout", "Add exercises"];
  return (
    <div className="h-full">
      <div className="flex flex-col items-center justify-center mt-10 text-white  overflow-x-hidden ">
        <div className=" text-center">
          <h1>{formTitle[page]}</h1>
          {page === 0 ? <CreatePost /> : <Exercises />}
          <Button
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </Button>
          <Button
            onClick={() => {
              if (page === 0) {
                setPage((prev) => prev + 1);
              }
              console.log("submit");
            }}
          >
            {page === 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};
