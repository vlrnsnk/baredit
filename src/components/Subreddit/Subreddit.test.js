import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { Subreddit } from "./Subreddit";
import { formatNumberToCommaSeparated } from "utilities/helpers";
import { ReactComponent as DefaultIcon } from "assets/subreddit.svg";

jest.mock('utilities/helpers', () => ({
  formatNumberToCommaSeparated: jest.fn((number) => `${number.toLocaleString()}`),
}));

describe('Subreddit Component', () => {
  const mockHandleSubredditClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the subreddit name and formatted members count', () => {
    const subreddit = {
      name: 'testsubreddit',
      members: 12345,
      image: 'https://example.com/image.png',
    };

    render(
      <Subreddit
        subreddit={subreddit}
        handleSubredditClick={mockHandleSubredditClick}
      />
    );

    expect(screen.getByText('testsubreddit')).toBeInTheDocument();
    expect(screen.getByText('members')).toBeInTheDocument();
  });

  it('renders the default icon when no subreddit image is provided', () => {
    const subreddit = {
      name: 'testsubreddit',
      members: 12345,
      image: '',
    };

    render(
      <Subreddit
        subreddit={subreddit}
        handleSubredditClick={mockHandleSubredditClick}
      />
    );

    const defaultIcon = screen.getByTestId('default-icon');

    expect(defaultIcon).toBeInTheDocument();
    expect(defaultIcon).toHaveClass('size-12');
  });

  it('triggers handleSubredditClick when the article is clicked', () => {
    const subreddit = {
      name: 'testsubreddit',
      members: 12345,
      image: 'https://example.com/image.png',
    };

    render(
      <Subreddit
        subreddit={subreddit}
        handleSubredditClick={mockHandleSubredditClick}
      />
    );

    const articleElement = screen.getByRole('article');
    fireEvent.click(articleElement);

    expect(mockHandleSubredditClick).toHaveBeenCalledTimes(1);
    expect(mockHandleSubredditClick).toHaveBeenCalledWith('testsubreddit');
  });

  it('renders the correct subreddit image if provided', () => {
    const subreddit = {
      name: 'testsubreddit',
      members: 12345,
      image: 'https://example.com/image.png',
    };

    render(
      <Subreddit
        subreddit={subreddit}
        handleSubredditClick={mockHandleSubredditClick}
      />
    );

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'https://example.com/image.png');
  });
});
