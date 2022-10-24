import { Fragment, useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { ImEye, ImSpinner11 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import DeviceView from "../DeviceView";
import ImageInput from "../ImageInput";
import MarkdownRule from "../MarkdownRule";

import { setTag_slice } from "../../redux/tagSlice";
import { setToastify_slice } from "../../redux/toastifySlice";

import { getTags } from "../../services/tagService";
import { handleDeleteArticle } from "../../services/articleService";

const CATEGORY_OPTIONS = [
  { value: "PEOPLE", label: "PEOPLE" },
  { value: "COMPANY", label: "COMPANY" },
  { value: "EVENT", label: "EVENT" },
  { value: "STAFF VOICE", label: "STAFF VOICE" },
  { value: "MOVIE", label: "MOVIE" },
];

export const defaultArticle = {
  slug: "",
  title: "",
  content: "",
  thumbnail: {},
  category: "",
  tags: [],
  meta: {
    title: "",
    description: "",
    image: "",
  },
};

const ArticleForm = ({
  pageTitle,
  btnSubmitTitle,
  handleSaveLocalStorage,
  handleSubmitFormData,
  article = defaultArticle,
}) => {
  const [articleInfo, setArticleInfo] = useState(defaultArticle);
  const [selectedThumbnailImage, setSelectedThumbnailImage] = useState("");
  const [showDeviceView, setShowDeviceView] = useState(false);

  const { tags: tags_data } = useSelector((state) => state.tag);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchTags = async () => {
    const { tags, error } = await getTags();

    if (error) {
      return dispatch(setToastify_slice({ type: "error", text: error[0].msg }));
    }

    dispatch(setTag_slice({ tags }));
  };

  useEffect(() => {
    fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setArticleInfo({ ...article });

    if (article.thumbnail.url) {
      setSelectedThumbnailImage(article.thumbnail.url);
    }
  }, [article]);

  const {
    slug,
    title,
    content,
    thumbnail,
    category,
    tags,
    meta: {
      title: meta_title,
      description: meta_description,
      image: meta_image,
    },
  } = articleInfo;

  const handleChange = ({ name, value, files }) => {
    if (name === "thumbnail") {
      const file = files[0];
      if (!file.type?.includes("image")) {
        return dispatch(
          setToastify_slice({ type: "error", text: "Invalid image format!" })
        );
      }

      setSelectedThumbnailImage(URL.createObjectURL(file));
    }

    let articleForm = {};

    if (
      name === "meta_title" ||
      name === "meta_description" ||
      name === "meta_image"
    ) {
      articleForm = {
        ...articleInfo,
        meta: {
          ...articleInfo.meta,
          [name.slice(5)]: value,
        },
      };
    } else {
      articleForm = {
        ...articleInfo,
        [name]: name === "thumbnail" ? files[0] : value,
      };
    }

    setArticleInfo({ ...articleForm });
    handleSaveLocalStorage && handleSaveLocalStorage(articleForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in articleInfo) {
      if (
        !articleInfo[key] &&
        key !== "thumbnail" &&
        key !== "tags" &&
        key !== "isNewArticle" &&
        key !== "views"
      ) {
        return dispatch(
          setToastify_slice({
            type: "error",
            text: `Article ${key} is missing!`,
          })
        );
      }
    }

    if (handleSaveLocalStorage && thumbnail instanceof File === false) {
      return dispatch(
        setToastify_slice({
          type: "error",
          text: `Article thumbnail is missing!`,
        })
      );
    }

    const formData = new FormData();

    for (let key in articleInfo) {
      formData.append(
        key,
        key === "tags" || key === "meta"
          ? JSON.stringify(articleInfo[key])
          : articleInfo[key]
      );
    }

    const { resetData } = await handleSubmitFormData(formData);

    if (resetData) {
      handleReset();

      navigate("/");
    }
  };

  const handleReset = () => {
    setArticleInfo(defaultArticle);

    setSelectedThumbnailImage("");

    localStorage.removeItem("articleForm");
  };

  const handleView = () => {
    setShowDeviceView(!showDeviceView);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="flex p-2">
        <div className="w-9/12 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-700">{pageTitle}</h1>
            <div className="flex items-center space-x-5">
              {handleSaveLocalStorage ? (
                <button
                  type="button"
                  className="create_article_button"
                  onClick={handleReset}
                >
                  <ImSpinner11 />
                  <span>Reset</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="delete_article_button"
                  onClick={() =>
                    handleDeleteArticle(navigate, dispatch, article?._id)
                  }
                >
                  <BsTrash />
                  <span>Delete</span>
                </button>
              )}
              <button
                type="button"
                className="create_article_button"
                onClick={handleView}
              >
                <ImEye />
                <span>View</span>
              </button>
              <button
                type="submit"
                className="px-5 h-10 w-36 bg-blue-500 ring-blue-500  rounded text-white hover:text-blue-500 hover:ring-1 hover:bg-transparent transition"
              >
                <span>{btnSubmitTitle}</span>
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="slug" className="create_article_label">
              Slug
            </label>
            <input
              value={slug}
              name="slug"
              id="slug"
              type="text"
              placeholder="Article slug"
              className="create_article_inputField"
              onChange={(e) => handleChange(e.target)}
            />
          </div>
          <div>
            <label htmlFor="title" className="create_article_label">
              Title
            </label>
            <input
              value={title}
              name="title"
              id="title"
              type="text"
              placeholder="Article title"
              className="create_article_inputField"
              onChange={(e) => handleChange(e.target)}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="content" className="create_article_label">
              Content
            </label>
            <ImageInput slug={slug} />
            <textarea
              value={content}
              name="content"
              id="content"
              className="create_article_inputField resize-none h-96"
              placeholder="Article content"
              onChange={(e) => handleChange(e.target)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="category" className="create_article_label">
              Category
            </label>
            <Select
              name="category"
              id="category"
              options={CATEGORY_OPTIONS}
              menuPlacement={"top"}
              isSearchable={false}
              value={CATEGORY_OPTIONS.filter(({ value }) => value === category)}
              onChange={(option) => {
                handleChange({ name: "category", value: option.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="tags" className="create_article_label">
              Tags
            </label>
            <Select
              name="tags"
              id="tags"
              options={tags_data}
              menuPlacement={"top"}
              isMulti={true}
              closeMenuOnSelect={false}
              value={tags_data.filter((tag) => tags.includes(tag.value))}
              onChange={(option) => {
                const newTags = option.map((tag) => tag.value);

                handleChange({ name: "tags", value: newTags });
              }}
            />
          </div>
          <div>
            <label htmlFor="meta_title" className="create_article_label">
              Meta Title
            </label>
            <input
              value={meta_title}
              name="meta_title"
              id="meta_title"
              type="text"
              placeholder="Article meta title"
              className="create_article_inputField"
              onChange={(e) => handleChange(e.target)}
            />
          </div>
          <div>
            <label htmlFor="meta_description" className="create_article_label">
              Meta Description
            </label>
            <input
              value={meta_description}
              name="meta_description"
              id="meta_description"
              type="text"
              placeholder="Article meta description"
              className="create_article_inputField"
              onChange={(e) => handleChange(e.target)}
            />
          </div>
          <div>
            <label htmlFor="meta_image" className="create_article_label">
              Meta Image
            </label>
            <input
              value={meta_image}
              name="meta_image"
              id="meta_image"
              type="text"
              placeholder="Article meta image"
              className="create_article_inputField"
              onChange={(e) => handleChange(e.target)}
            />
          </div>
        </div>
        <div className="w-1/4 flex flex-col px-2 mt-14">
          <h1 className="flex items-center font-semibold">Thumbnail</h1>
          <div>
            <input
              name="thumbnail"
              id="thumbnail"
              type="file"
              hidden
              onChange={(e) => handleChange(e.target)}
            />
            <label htmlFor="thumbnail" className="cursor-pointer">
              {selectedThumbnailImage ? (
                <img
                  src={selectedThumbnailImage}
                  alt=""
                  className="aspect-video shadow-sm rounded"
                />
              ) : (
                <div className="border border-dashed border-gray-500 aspect-video text-gray-500 flex flex-col justify-center items-center">
                  <span>Select thumbnail</span>
                </div>
              )}
            </label>
          </div>
          <MarkdownRule />
        </div>
      </form>
      {showDeviceView && (
        <DeviceView
          thumbnail={
            handleSaveLocalStorage ? selectedThumbnailImage : thumbnail.url
          }
          title={title}
          content={content}
          setShowDeviceView={setShowDeviceView}
        />
      )}
    </Fragment>
  );
};

export default ArticleForm;
