import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

import { setToastify_slice } from "../../redux/toastifySlice";
import { setLoading_slice } from "../../redux/loadingSlice";
import { addTag_slice } from "../../redux/tagSlice";

import { postTag } from "../../services/tagService";

const defaultTag = {
  slug: "",
  title: "",
};

const CreateTagModal = () => {
  const [tagInfo, setTagInfo] = useState(defaultTag);
  const [showModal, setShowModal] = useState(false);

  const { slug, title } = tagInfo;

  const dispatch = useDispatch();

  const handleClickOutside = (e) => {
    if (e.target.id === "CreateTagModal") {
      setShowModal(false);
    }
  };

  const handleChange = ({ name, value }) => {
    setTagInfo({
      ...tagInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in tagInfo) {
      if (!tagInfo[key]) {
        return dispatch(
          setToastify_slice({
            type: "error",
            text: `Tag ${key} is missing!`,
          })
        );
      }
    }

    dispatch(setLoading_slice(true));

    const { tag, error } = await postTag(tagInfo);

    dispatch(setLoading_slice(false));

    if (error) {
      return dispatch(setToastify_slice({ type: "error", text: error[0].msg }));
    }

    dispatch(addTag_slice(tag));

    setShowModal(false);

    dispatch(
      setToastify_slice({
        type: "success",
        text: "Tag was successfully created!",
      })
    );
  };

  return (
    <Fragment>
      <button
        className="px-5 h-10 w-36 bg-blue-500 ring-blue-500  rounded text-white hover:text-blue-500 hover:ring-1 hover:bg-transparent transition"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create Tag
      </button>
      <div
        onClick={handleClickOutside}
        id="CreateTagModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          !showModal ? "hidden" : ""
        } fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full m-auto md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create Tag
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setShowModal(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-6 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="slug"
                  className="create_article_label text-white"
                >
                  Slug
                </label>
                <input
                  value={slug}
                  name="slug"
                  id="slug"
                  type="text"
                  placeholder="Tag slug"
                  className="create_article_inputField"
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div>
                <label
                  htmlFor="slug"
                  className="create_article_label text-white"
                >
                  Title
                </label>
                <input
                  value={title}
                  name="title"
                  id="title"
                  type="text"
                  placeholder="Tag title"
                  className="create_article_inputField"
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="flex items-center justify-center py-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateTagModal;
