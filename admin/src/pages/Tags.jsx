import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CreateTagModal from "../components/CreateTagModal";
import TagCard from "../components/TagCard";
import UpdateTagModal from "../components/UpdateTagModal/index.js";

import { setTag_slice } from "../redux/tagSlice";
import { setToastify_slice } from "../redux/toastifySlice";

import { getTags } from "../services/tagService";

const Tags = () => {
  const { tags } = useSelector((state) => state.tag);
  const [tag, setTag] = useState({});
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const dispatch = useDispatch();

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

  return (
    <Fragment>
      <CreateTagModal />

      <UpdateTagModal
        tag={tag}
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
      />

      <div className="mt-4">
        <div className="grid grid-cols-4 gap-3">
          {tags.map((tag) => (
            <TagCard
              key={tag.value}
              tag={tag}
              setTag={setTag}
              setShowUpdateModal={setShowUpdateModal}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Tags;
