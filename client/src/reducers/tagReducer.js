import { TAGS_LOADED_SUCCESS, TAGS_LOADED_FAIL } from "../contexts/_constants";

export const tagReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case TAGS_LOADED_SUCCESS:
      return {
        ...state,
        tags: payload,
        tagsLoading: false,
      };
    case TAGS_LOADED_FAIL:
      return {
        ...state,
        tags: [],
        tagsLoading: false,
      };
    default:
      return state;
  }
};
