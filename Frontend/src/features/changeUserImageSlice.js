import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const changingUserImg = createAsyncThunk(
  "post/changingUserImg",
  async (image) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}auth/changingUsersImage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ base64: image }),
      }
    );
    return response.json();
  }
);

export const changeUserImg = createSlice({
  name: "changeUserImg",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(changingUserImg.pending, (state) => {
        state.loading = true;
      })
      .addCase(changingUserImg.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(changingUserImg.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default changeUserImg.reducer;
