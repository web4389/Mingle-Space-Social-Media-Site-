import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const specificPostFunc = createAsyncThunk(
  "user/specificPost",
  async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}post/specificpost/${id}`,
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

export const specificPost = createSlice({
  name: "specificPost",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(specificPostFunc.pending, (state) => {
        state.loading = true;
      })
      .addCase(specificPostFunc.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(specificPostFunc.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default specificPost.reducer;
