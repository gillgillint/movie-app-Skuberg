import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearch: false,
  searchValue: "",
};

export const searchSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    toggleSearch: (state) => {
      state.isSearch = !state.isSearch;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { toggleSearch, setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
