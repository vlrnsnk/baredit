import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isLoading: false,
  comments: [],
  isLoadingComments: false,
  isShowComments: false,
  lastLoadedCommentsPermalink: '',
};

const redditPostsSlice = createSlice({
  name: 'redditPosts',

  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    setComments: (state, action) => {
      state.comments = action.payload;
    },

    toggleComments: (state) => {
      state.isShowComments = !state.isShowComments;
    },

    setLoadingComments: (state, action) => {
      state.isLoadingComments = action.payload;
    },

    setLastLoadedCommentsPermalink: (state, action) => {
      state.lastLoadedCommentsPermalink = action.payload;
    },
  },
});

export const {
  setLoading,
  setPosts,
  setComments,
  toggleComments,
  setLoadingComments,
  setLastLoadedCommentsPermalink,
} = redditPostsSlice.actions;

export default redditPostsSlice.reducer;
