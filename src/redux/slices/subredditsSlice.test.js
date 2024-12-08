import subredditsReducer, { setSubreddits, setLoading } from './subredditsSlice';

describe('subredditsSlice', () => {
  const initialState = {
    subreddits: [],
    isLoading: false,
  };

  it('should return the initial state', () => {
    expect(subredditsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setSubreddits', () => {
    const action = setSubreddits([{ id: 1, name: 'javascript' }]);
    const state = subredditsReducer(initialState, action);

    expect(state.subreddits).toEqual([{ id: 1, name: 'javascript' }]);
  });

  it('should handle setLoading', () => {
    const action = setLoading(true);
    const state = subredditsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });

  it('should handle setLoading to false', () => {
    const action = setLoading(false);
    const state = subredditsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });
});
