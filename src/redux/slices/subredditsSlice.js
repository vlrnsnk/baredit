import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subreddits: [],
  isLoading: false,
};

const subredditsSlice = createSlice({
  name: 'subreddits',

  initialState,

  reducers: {
    setSubreddits: (state, action) => {
      state.subreddits = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setSubreddits, setLoading } = subredditsSlice.actions;

export default subredditsSlice.reducer;
