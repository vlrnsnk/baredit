import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { Post } from "./Post";

jest.mock('utilities/helpers.js', () => ({
  timeAgo: jest.fn().mockReturnValue('2 hours ago'),
}));

const post = {
  title: 'Test Title',
  description: 'This is a test post description. It is long enough to test the "read more" functionality. So here it goes. This text is about to be more than 150 symbols because I have added more words to it.',
  author: 'Author Name',
  subreddit: 'SubredditName',
  created: Date.now(),
  ups: 10,
  downs: 5,
  numberOfComments: 2,
  commentsPermalink: '/comments/test',
  pictureTag: null,
};

const mockHandleCommentsButtonClick = jest.fn();

describe('Post Component', () => {
  describe('Rendering', () => {
    it('renders post with title, description, and other fields', () => {
      render(
        <Post
          post={post}
          handleCommentsButtonClick={mockHandleCommentsButtonClick}
        />
      );

      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.author)).toBeInTheDocument();
      expect(screen.getByText(post.subreddit)).toBeInTheDocument();
      expect(screen.getByText(post.description.slice(0, 150) + '...')).toBeInTheDocument();
      expect(screen.getByText('Read more')).toBeInTheDocument();
    });

    it('renders post without description correctly', () => {
      const postWithoutDescription = { ...post, description: '' };

      render(
        <Post
          post={postWithoutDescription}
          handleCommentsButtonClick={mockHandleCommentsButtonClick}
        />
      );

      expect(screen.getByText(postWithoutDescription.title)).toBeInTheDocument();
      expect(screen.queryByText('Read more')).not.toBeInTheDocument();
    });

    it('renders post with picture tag correctly', () => {
      const postWithPicture = { ...post, pictureTag: <img src="test.jpg" alt="Test" /> };

      render(
        <Post
          post={postWithPicture}
          handleCommentsButtonClick={mockHandleCommentsButtonClick}
        />
      );

      expect(screen.getByAltText('Test')).toBeInTheDocument();
    });
  })

  describe('Description Toggle', () => {
    it('toggles description visibility when "Read more" is clicked', () => {
      render(
        <Post
          post={post}
          handleCommentsButtonClick={mockHandleCommentsButtonClick}
        />
      );

      const truncatedDescription = post.description.slice(0, 150) + '...';
      expect(screen.getByText(truncatedDescription)).toBeInTheDocument();

      fireEvent.click(screen.getByText('Read more'));
      expect(screen.getByText(post.description)).toBeInTheDocument();
      expect(screen.getByText('Show less')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Show less'));
      expect(screen.getByText(truncatedDescription)).toBeInTheDocument();
    });

    it('does not show "Read more" button for short descriptions', () => {
      const shortDescriptionPost = {
        ...post,
        description: 'Short description',
      };

      render(
        <Post
          post={shortDescriptionPost}
          handleCommentsButtonClick={mockHandleCommentsButtonClick}
        />
      );

      expect(screen.queryByText('Read more')).not.toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    it('calls handleCommentsButtonClick when comment button is clicked', () => {
      render(
        <Post
          post={post}
          handleCommentsButtonClick={mockHandleCommentsButtonClick}
        />
      );

      fireEvent.click(screen.getByLabelText('Open Comments'));

      expect(mockHandleCommentsButtonClick).toHaveBeenCalledWith(post.commentsPermalink);
    });
  });

  describe('Post with No Comments', () => {
    it('renders post with zero comments correctly', () => {
      const postWithoutComments = {
        ...post,
        numberOfComments: 0,
      };
      render(
        <Post
          post={postWithoutComments}
          handleCommentsButtonClick={mockHandleCommentsButtonClick}
        />
      );

      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });
});
