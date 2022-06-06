import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../../redux/api";
function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState();
  console.log(post);
  const fetchPost = async () => {
    try {
      const { data } = await getPost(id);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className="mt-44">
      Post
      <p>{post ? post?.desc : ""}</p>
    </div>
  );
}

export default PostDetails;
