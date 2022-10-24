import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import articleSlice from "./articleSlice";
import tagSlice from "./tagSlice";
import toastifySlice from "./toastifySlice";
import loadingSlice from "./loadingSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    article: articleSlice,
    tag: tagSlice,
    toastify: toastifySlice,
    loading: loadingSlice,
  },
});
