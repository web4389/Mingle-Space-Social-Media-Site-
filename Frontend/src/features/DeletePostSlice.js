import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const DeletingPost = createAsyncThunk(
  "user/DeletingPost",
  async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}post/deletingpost/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    return response.json();
  }
);

export const DeletePost = createSlice({
  name: "DeletePost",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(DeletingPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeletingPost.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(DeletingPost.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default DeletePost.reducer;
