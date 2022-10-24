import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: false,
    loading: false,
  },
  reducers: {
    setAuth_slice(state, action) {
      state.auth = action.payload;
    },
    setAuthLoading_slice(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
  extraReducers: {},
});

export default authSlice.reducer;

export const { setAuth_slice, setAuthLoading_slice } = authSlice.actions;
