import redditPostsReducer, {
  setLoading,
  setPosts,
  setComments,
  toggleComments,
  setLoadingComments,
  setLastLoadedCommentsPermalink,
} from "./redditPostsSlice";

describe('redditPostsSlice', () => {
  const initialState = {
    posts: [],
    isLoading: false,
    comments: [],
    isLoadingComments: false,
    isShowComments: false,
    lastLoadedCommentsPermalink: '',
  };

  it('should return the initial state', () => {
    expect(redditPostsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setLoading', () => {
    const action = setLoading(true);
    const state = redditPostsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });

  it('should handle setPosts', () => {
    const posts = [{ id: 1, title: 'Test Post' }];
    const action = setPosts(posts);
    const state = redditPostsReducer(initialState, action);

    expect(state.posts).toEqual(posts);
  });

  it('should handle setComments', () => {
    const comments = [{ id: 1, body: 'Test Comment' }];
    const action = setComments(comments);
    const state = redditPostsReducer(initialState, action);

    expect(state.comments).toEqual(comments);
  });

  it('should handle toggleComments', () => {
    const action = toggleComments();
    const state1 = redditPostsReducer(initialState, action);
    const state2 = redditPostsReducer(state1, action);

    expect(state1.isShowComments).toEqual(true);
    expect(state2.isShowComments).toEqual(false);
  });

  it('should handle setLoadingComments', () => {
    const action = setLoadingComments(true);
    const state = redditPostsReducer(initialState, action);

    expect(state.isLoadingComments).toBe(true);
  });

  it('should handle setLastLoadedCommentsPermalink', () => {
    const permalink = 'test/permalink';
    const action = setLastLoadedCommentsPermalink(permalink);
    const state = redditPostsReducer(initialState, action);

    expect(state.lastLoadedCommentsPermalink).toBe(permalink);
  });
});
