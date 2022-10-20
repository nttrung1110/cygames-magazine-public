import { configureStore } from "@reduxjs/toolkit";

import articleSlice from "./articleSlice";
import layoutSlice from "./layoutSlice";
import tagSlice from "./tagSlice";

export const store = configureStore({
  reducer: {
    article: articleSlice,
    tag: tagSlice,
    layout: layoutSlice,
  },
});
