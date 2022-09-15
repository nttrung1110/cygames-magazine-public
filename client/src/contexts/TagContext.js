import { createContext, useReducer } from "react";
import { tagReducer } from "../reducers/tagReducer";
import { apiUrl, TAGS_LOADED_SUCCESS, TAGS_LOADED_FAIL } from "./_constants";
import axios from "axios";

export const TagContext = createContext();

const TagContextProvider = ({ children }) => {
  // Tag state
  const [tagState, dispatch] = useReducer(tagReducer, {
    tags: [],
    tagsLoading: true,
  });

  // Get all tags
  const getTags = async () => {
    try {
      const response = await axios.get(`${apiUrl}/tags`);

      if (response.data.success) {
        dispatch({
          type: TAGS_LOADED_SUCCESS,
          payload: response.data.tags,
        });
      }
    } catch (err) {
      dispatch({ type: TAGS_LOADED_FAIL });
    }
  };

  // Article context data
  const TagContextData = {
    tagState,
    getTags,
  };

  // Return provider
  return (
    <TagContext.Provider value={TagContextData}>{children}</TagContext.Provider>
  );
};

export default TagContextProvider;
