import { createSlice } from "@reduxjs/toolkit";
import { getTheme } from "utilities/helpers";

const initialState = {
  theme: getTheme(),
  isDrawerOpen: false,
  searchQuery: '',
};

const appSlice = createSlice({
  name: 'app',

  initialState,

  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setTheme, toggleDrawer, setSearchQuery } = appSlice.actions;

export default appSlice.reducer;
