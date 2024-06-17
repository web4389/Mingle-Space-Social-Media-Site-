import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchingUser = createAsyncThunk(
  "user/searchingUser",
  async (name) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}auth/specificuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ name: name }),
      }
    );
    return response.json();
  }
);

export const searchUser = createSlice({
  name: "searchUser",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(searchingUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchingUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(searchingUser.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default searchUser.reducer;
