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

  describe('generatePictureTag', () => {
    it('should return an empty string if no valid image is found', () => {
      const jsonData = {};

      expect(generatePictureTag(jsonData)).toBe('');
    });

    // it('should generate an <img> tag if no resolutions are found', () => {
    //   const jsonData = { title: 'Test', preview: { images: [{ source: { url: 'image.jpg' } }] } };
    //   const result = generatePictureTag(jsonData);
    //   console.log(result);

    //   expect(result).toContain('<img class="rounded-xl border border-orange-400"');
    //   expect(result).toContain('src="image.jpg"');
    // });

    // it('should generate a <picture> tag with <source> for different resolutions', () => {
    //   const jsonData = {
    //     title: 'Test',
    //     preview: {
    //       images: [
    //         {
    //           source: { url: 'image.jpg' },
    //           resolutions: [
    //             { url: 'small.jpg', width: 600 },
    //             { url: 'medium.jpg', width: 800 },
    //             { url: 'large.jpg', width: 1200 },
    //           ],
    //         },
    //       ],
    //     },
    //   };

    //   const result = generatePictureTag(jsonData);

    //   expect(result).toContain('<picture>');
    //   expect(result).toContain('<source media="(min-width: 992px)"');
    //   expect(result).toContain('srcSet="large.jpg 1200w, medium.jpg 800w, small.jpg 600w"');
    //   expect(result).toContain('<img class="rounded-xl border border-orange-400"');
    // });

    it('should return empty if image url is "default" or "nsfw"', () => {
      const jsonData = {
        title: 'Test',
        preview: {
          images: [{ source: { url: 'default' } }],
        },
      };

      expect(generatePictureTag(jsonData)).toBe('');
    });
  });

  describe('formatPosts', () => {
    it('should correctly format post data', () => {
      const postsJsonData = {
        data: {
          children: [
            {
              data: {
                id: 'post1',
                title: 'Post Title',
                selftext: 'Description of post',
                subreddit_name_prefixed: 'r/test',
                author: 'author1',
                num_comments: 10,
                permalink: '/r/test/comments/post1',
                ups: 100,
                downs: 20,
                created_utc: 1618560000,
              },
            },
          ],
        },
      };

      const formattedPosts = formatPosts(postsJsonData);

      expect(formattedPosts[0].id).toBe('post1');
      expect(formattedPosts[0].title).toBe('Post Title');
    });
  });

  describe('formatSubreddits', () => {
    it('should correctly format subreddit data', () => {
      const subredditsJsonData = {
        data: {
          children: [
            {
              data: {
                display_name_prefixed: 'r/test',
                subscribers: 100,
                icon_img: 'icon.jpg',
              },
            },
          ],
        },
      };

      const formattedSubreddits = formatSubreddits(subredditsJsonData);

      expect(formattedSubreddits[0].name).toBe('r/test');
      expect(formattedSubreddits[0].members).toBe(100);
      expect(formattedSubreddits[0].image).toBe('icon.jpg');
    });
  });
});
