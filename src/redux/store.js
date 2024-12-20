import { configureStore } from "@reduxjs/toolkit";

import appReducer from './slices/appSlice';
import redditPostsReducer from './slices/redditPostsSlice';
import subredditsReducer from './slices/subredditsSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    redditPosts: redditPostsReducer,
    subreddits: subredditsReducer,
  },
});

export { store };
