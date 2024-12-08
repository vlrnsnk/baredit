import { store } from "./store";

import { setPosts } from "./slices/redditPostsSlice";
import { setSubreddits } from "./slices/subredditsSlice";

import appReducer from "./slices/appSlice";
import redditPostsReducer from "./slices/redditPostsSlice";
import subredditsReducer from "./slices/subredditsSlice";

describe('Redux store', () => {
  it('should initialize with the correct initial state', () => {
    const state = store.getState();

    expect(state.app).toEqual(appReducer(undefined, { type: '@@INIT' }));
    expect(state.redditPosts).toEqual(redditPostsReducer(undefined, { type: '@@INIT' }));
    expect(state.subreddits).toEqual(subredditsReducer(undefined, { type: '@@INIT' }));
  });

  it('should have the expected shape', () => {
    const state = store.getState();

    expect(state).toHaveProperty('app');
    expect(state).toHaveProperty('redditPosts');
    expect(state).toHaveProperty('subreddits');
  });

  describe('store dispatch and state updates', () => {
    it('should correctly update the redditPosts slice when setPosts action is dispatched', () => {
      const posts = [{ id: 1, title: 'Test Post' }];

      store.dispatch(setPosts(posts));

      const state = store.getState();

      expect(state.redditPosts.posts).toEqual(posts);
    });

    it('should correctly update the subreddits slice when setSubreddits action is dispatched', () => {
      const subreddits = ['/r/AskReddit', '/r/MildlyInfuriating'];

      store.dispatch(setSubreddits(subreddits));

      const state = store.getState();

      expect(state.subreddits.list).toEqual(subreddits);
    });
  });
});
