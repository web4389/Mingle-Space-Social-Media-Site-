import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const creatingPost = createAsyncThunk(
  "user/creatingPost",
  async ({ content, postImg }) => {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}post/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ paragraph: content, postImage: postImg }),
    });
    return response.json();
  }
);

export const createPost = createSlice({
  name: "createPost",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(creatingPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(creatingPost.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(creatingPost.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default createPost.reducer;
