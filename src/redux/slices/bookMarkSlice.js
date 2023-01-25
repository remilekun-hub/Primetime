import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarks: [],
};
export const bookMarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarks.push(action.payload);
    },
    removeBookMark: (state, action) => {
      const filtered = state.bookmarks.filter(
        (bookmark) => bookmark.id !== action.payload
      );
      state.bookmarks = filtered;
    },
    removeAll: (state) => {
      state.bookmarks = [];
    },
  },
});

export const { addBookmark, removeBookMark, removeAll } = bookMarkSlice.actions;

export default bookMarkSlice.reducer;
