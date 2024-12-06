global.matchMedia = jest.fn().mockImplementation(query => ({
  matches: query === '(prefers-color-scheme: dark)',
  addListener: jest.fn(),   // Suppress any calls to addListener
  removeListener: jest.fn(), // Suppress any calls to removeListener
}));
