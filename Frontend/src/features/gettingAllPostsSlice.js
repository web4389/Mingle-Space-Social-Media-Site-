import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const gettingAllPosts = createAsyncThunk(
  "post/gettingAllPosts",
  async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}post/gettingposts`,
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

export const getAllPosts = createSlice({
  name: "getAllPosts",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(gettingAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(gettingAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(gettingAllPosts.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default getAllPosts.reducer;
