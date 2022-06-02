import { useSelector, useDispatch } from "react-redux";

import FileBase from "react-file-base64";
import { useState } from "react";
import { uploadImage } from "../../redux/features/auth/authSlice";

function ProfileInfo() {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userID = user?.user?._id;
  const dispatch = useDispatch();
  const [img, setImg] = useState();

  const uploadPhoto = async (e) => {
    e.preventDefault();
    if (img) {
      dispatch(uploadImage(userID, img.imageFile));
    } else {
      alert("Choose picture first!");
    }
  };

  return (
    <div className="mt-20">
      <p>Name</p>
      <p>Records:</p>
      <p>Bench press: 150kg</p>
      <p>Squat: 150kg</p>
      <p>Deadlift: 150kg</p>
      <form onSubmit={uploadPhoto}>
        <label>
          <FileBase
            type="file"
            name="file"
            multiple={false}
            accept=".png,.jpeg,.jpg"
            onDone={({ base64 }) => setImg({ imageFile: base64 })}
          />
        </label>
        <button type="submit">Upload image</button>
      </form>
      {user && (
        <div className="w-80">
          <img alt="avatar" src={user?.user?.profilePicture} />{" "}
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;
