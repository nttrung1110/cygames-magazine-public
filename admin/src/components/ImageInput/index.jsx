import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ImCopy, ImFilePicture } from "react-icons/im";
import { useDispatch } from "react-redux";

import { setToastify_slice } from "../../redux/toastifySlice";

import { uploadImage } from "../../services/imageService";

const ImageInput = ({ slug }) => {
  const [imageUrl, setImageUrl] = useState({
    secure_url: "",
    public_id: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (!file.type?.includes("image")) {
      return dispatch(
        setToastify_slice({ type: "error", text: "Invalid image format!" })
      );
    }

    const formData = new FormData();

    formData.append("slug", slug);
    formData.append("image", file);

    setLoading(true);

    const { secure_url, public_id, error } = await uploadImage(formData);

    setLoading(false);

    if (error) {
      return dispatch(setToastify_slice({ type: "error", text: error[0].msg }));
    }

    setImageUrl({ secure_url, public_id });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(imageUrl.secure_url);
  };

  return (
    <div className="my-2 flex items-center space-x-2">
      <label
        htmlFor="image-input"
        className={`flex items-center space-x-2 px-3 ring-1 ring-gray-700 rounded h-10 text-gray-700 hover:text-white hover:bg-gray-700 transition cursor-pointer ${
          loading ? "pointer-events-none" : ""
        }`}
      >
        <span>Place image</span>
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          <ImFilePicture />
        )}
      </label>
      <input
        type="file"
        id="image-input"
        hidden
        disabled={loading ? true : false}
        onChange={handleChange}
      />
      {!loading && imageUrl.secure_url && (
        <div className="h-10 flex-1 flex items-center justify-between bg-gray-400 rounded overflow-hidden">
          <input
            type="text"
            value={imageUrl.secure_url}
            disabled
            className="flex-1 bg-transparent px-2 text-white"
          />
          <button
            type="button"
            className="flex items-center justify-center flex-col text-xs self-stretch p-2 text-white bg-gray-700"
            onClick={handleCopy}
          >
            <ImCopy />
            copy
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
