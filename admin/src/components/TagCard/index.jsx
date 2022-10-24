import dateFormat from "dateformat";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";

import { setLoading_slice } from "../../redux/loadingSlice";
import { deleteTag_slice } from "../../redux/tagSlice";
import { setToastify_slice } from "../../redux/toastifySlice";

import { deleteTag } from "../../services/tagService";

const TagCard = ({ tag, setTag, setShowUpdateModal }) => {
  const { slug, label, createdAt } = tag;

  const dispatch = useDispatch();

  const handleDeleteTag = async (tagId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tag?"
    );

    if (!confirmed) return;

    dispatch(setLoading_slice(true));

    const { msg, error } = await deleteTag(tagId);

    dispatch(setLoading_slice(false));

    if (error) {
      return dispatch(setToastify_slice({ type: "error", text: error[0].msg }));
    }

    dispatch(deleteTag_slice({ tagId }));

    dispatch(setToastify_slice({ type: "success", text: msg }));
  };

  return (
    <div className="bg-white shadow-sm rounded flex flex-col">
      <div className="flex-1 flex flex-col p-2">
        <h1 className="text-lg font-semibold text-gray-700 line-clamp-2">
          {label}
        </h1>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between mt-1">
            <p className="w-fit px-1 bg-gray-500 text-white text-sm">{slug}</p>
            <p className="text-gray-500 text-sm">
              {dateFormat(createdAt, "mediumDate")}
            </p>
          </div>

          <div className="flex items-center justify-center space-x-3 pt-2 mt-auto">
            <button
              onClick={() => {
                setTag(tag);
                setShowUpdateModal(true);
              }}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-blue-700"
            >
              <BsPencilSquare />
            </button>
            <button
              onClick={() => handleDeleteTag(tag.value)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-700"
            >
              <BsTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagCard;
