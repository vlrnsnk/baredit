// jest.setup.js

// Mock matchMedia
global.matchMedia = jest.fn().mockImplementation(query => ({
  matches: query === '(prefers-color-scheme: dark)', // Return true for dark mode
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

// Mock localStorage (if you rely on it in your tests)
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
