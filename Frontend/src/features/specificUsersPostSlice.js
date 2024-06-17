import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const specificUsersPost = createAsyncThunk(
  "user/specificUsersPost",
  async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}post/specificUserposts/${id}`,
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

export const specificUserPost = createSlice({
  name: "specificUserPost",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(specificUsersPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(specificUsersPost.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(specificUsersPost.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default specificUserPost.reducer;
