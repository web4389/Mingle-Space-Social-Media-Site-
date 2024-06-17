import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loggedInUserInfo = createAsyncThunk(
  "post/loggedInUserInfo",
  async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}auth/getuser`,
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

export const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(loggedInUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(loggedInUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loggedInUserInfo.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default userInfo.reducer;
