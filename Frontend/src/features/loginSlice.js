import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }
);

export const Login = createSlice({
  name: "login",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default Login.reducer;
