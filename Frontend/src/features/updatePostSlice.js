import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const editingPost = createAsyncThunk(
  "user/editingPost",
  async ({ id, content, postImg }) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}post/editingpost/${id}`,
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },

        body: JSON.stringify({ paragraph: content, postImage: postImg }),
      }
    );
    return response.json();
  }
);

export const editPost = createSlice({
  name: "editPost",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(editingPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(editingPost.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(editingPost.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default editPost.reducer;
