import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const editingDescription = createAsyncThunk(
  "user/editingDescription",
  async ({ name, description }) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}auth/updatingUsersInfo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ name: name, description: description }),
      }
    );
    return response.json();
  }
);

export const editDescription = createSlice({
  name: "editDescription",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(editingDescription.pending, (state) => {
        state.loading = true;
      })
      .addCase(editingDescription.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(editingDescription.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default editDescription.reducer;
