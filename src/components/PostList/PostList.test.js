import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { PostList } from "./PostList";
import { Provider } from "react-redux";
import { store } from '../../redux/store';
import { getTheme, timeAgo } from 'utilities/helpers';

jest.mock('utilities/helpers', () => ({
  getTheme: jest.fn().mockReturnValue('light'),  // Mock the return value of getTheme
}));

// Mock timeAgo function
jest.mock('utilities/helpers', () => ({
  timeAgo: jest.fn().mockReturnValue('1 hour ago'), // or any mock value
}));

describe('PostList Component', () => {
  const mockHandleCommentsButtonClick = jest.fn();

  const posts = [
    {
      id: '1',
      title: 'Test Post 1',
      description: 'This is a test post.',
      numberOfComments: 5,
      commentsPermalink: '/comments/test1',
      ups: 10,
      downs: 2,
      author: 'author1',
      subreddit: 'subreddit1',
      created: Date.now(),
    },
  ];

  it('renders posts when loaded', () => {
    render(
      <Provider store={store}>
        <PostList
          posts={posts}
          isLoading={false}
          handleCommentsButtonClick={mockHandleCommentsButtonClick}
        />
      </Provider>
    );

    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('This is a test post.')).toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    render(
      <Provider store={store}>
        <PostList
          posts={[]}
          isLoading={true}
          handleCommentsButtonClick={mockHandleCommentsButtonClick}
        />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
