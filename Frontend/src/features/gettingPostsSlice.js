import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const gettingPosts = createAsyncThunk(
  "post/gettingUserPosts",
  async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}post/userposts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    return response.json();
  }
);

export const getPosts = createSlice({
  name: "getPosts",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(gettingPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(gettingPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(gettingPosts.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default getPosts.reducer;
