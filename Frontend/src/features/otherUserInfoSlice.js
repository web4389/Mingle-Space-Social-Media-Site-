import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

export const searchValue = createSlice({
  name: "searchValue",
  initialState,
  reducers: {
    updateSearchValue: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { updateSearchValue } = searchValue.actions;

export default searchValue.reducer;
