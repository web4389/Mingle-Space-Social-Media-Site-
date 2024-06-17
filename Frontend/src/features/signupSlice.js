import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const creatingAccount = createAsyncThunk(
  "user/createAccount",
  async ({ name, email, password }) => {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  }
);

export const createAccount = createSlice({
  name: "createAccount",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(creatingAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(creatingAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(creatingAccount.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default createAccount.reducer;
