import appReducer, { setTheme, toggleDrawer, setSearchQuery } from './appSlice';
import { getTheme } from 'utilities/helpers';

jest.mock('utilities/helpers', () => ({
  getTheme: jest.fn().mockReturnValue('light'),
}));

describe('appSlice', () => {
  const initialState = {
    theme: 'light',
    isDrawerOpen: false,
    searchQuery: '',
  };

  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setTheme', () => {
    const newTheme = 'dark';
    const action = setTheme(newTheme);
    const state = appReducer(initialState, action);

    expect(state.theme).toBe(newTheme);
  });

  it('should handle toggleDrawer', () => {
    const action = toggleDrawer();
    const state1 = appReducer(initialState, action);
    const state2 = appReducer(state1, action);

    expect(state1.isDrawerOpen).toBe(true);
    expect(state2.isDrawerOpen).toBe(false);
  });

  it('should handle setSearchQuery', () => {
    const query = 'new search query';
    const action = setSearchQuery(query);
    const state = appReducer(initialState, action);

    expect(state.searchQuery).toBe(query);
  });
});
