import {
  getTheme,
  formatNumberToCommaSeparated,
  timeAgo,
  extractComments,
  generatePictureTag,
  formatPosts,
  formatSubreddits,
} from './helpers';

describe('Utility functions', () => {

  beforeEach(() => {
    localStorage.clear();

    global.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
    }));
  });

  describe('getTheme', () => {
    it('should return the theme from localStorage if it exists', () => {
      localStorage.setItem('theme', 'dark');

      expect(getTheme()).toBe('dark');
    });

    it('should set and return dark theme if no theme in localStorage and prefers-color-scheme is dark', () => {
      localStorage.removeItem('theme');

      expect(getTheme()).toBe('dark');
      expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('should set and return light theme if no theme in localStorage and prefers-color-scheme is not dark', () => {
      global.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: light)',
      }));

      localStorage.removeItem('theme');

      expect(getTheme()).toBe('light');
      expect(localStorage.getItem('theme')).toBe('light');
    });
  });

  describe('formatNumberToCommaSeparated', () => {
    it('should format numbers correctly', () => {
      expect(formatNumberToCommaSeparated(1000)).toBe('1,000');
      expect(formatNumberToCommaSeparated(1000000)).toBe('1,000,000');
      expect(formatNumberToCommaSeparated(1000000000)).toBe('1,000,000,000');
    });

    it('should not add commas for small numbers', () => {
      expect(formatNumberToCommaSeparated(123)).toBe('123');
      expect(formatNumberToCommaSeparated(9)).toBe('9');
    });
  });

  describe('timeAgo', () => {
    it('should return "x days ago" for timestamps in past', () => {
      const now = Math.floor(Date.now() / 1000);

      expect(timeAgo(now - 86400)).toBe('1 day ago');
      expect(timeAgo(now - 172800)).toBe('2 days ago');
    });

    it('should return "x hours ago" for timestamps within the same day', () => {
      const now = Math.floor(Date.now() / 1000);

      expect(timeAgo(now - 3600)).toBe('1 hour ago');
      expect(timeAgo(now - 7200)).toBe('2 hours ago');
    });

    it('should return "x minutes ago" for timestamps within the same hour', () => {
      const now = Math.floor(Date.now() / 1000);

      expect(timeAgo(now - 60)).toBe('1 minute ago');
      expect(timeAgo(now - 120)).toBe('2 minutes ago');
    });

    it('should return "x seconds ago" for timestamps within the same minute', () => {
      const now = Math.floor(Date.now() / 1000);

      expect(timeAgo(now - 10)).toBe('10 seconds ago');
      expect(timeAgo(now - 45)).toBe('45 seconds ago');
    });
  });

  describe('extractComments', () => {
    it('should extract comments from a nested JSON structure', () => {
      const json = {
        data: {
          children: [
            {
              data: {
                body: 'First comment',
                replies: { data: { children: [{ data: { body: 'Reply to first' } }] } },
              },
            },
            { data: { body: 'Second comment' } },
          ],
        },
      };

      expect(extractComments(json)).toEqual(['First comment', 'Reply to first', 'Second comment']);
    });

    it('should return an empty array if no comments are found', () => {
      const json = { data: {} };

      expect(extractComments(json)).toEqual([]);
    });
  });
});
