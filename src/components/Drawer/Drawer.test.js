import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Drawer } from "./Drawer";

describe('Drawer Component', () => {
  const mockHandleBurgerClick = jest.fn();
  const mockHandleSubredditClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the drawer when isDrawerOpen is true', () => {
    render(
      <Drawer
        subreddits={[]}
        isDrawerOpen={true}
        handleBurgerClick={mockHandleBurgerClick}
        isLoading={false}
        handleSubredditClick={mockHandleSubredditClick}
      />
    );

    const drawer = screen.getByRole('presentation');

    expect(drawer).toBeVisible();
  });

  it('does not render the drawer when isDrawerOpen is false', () => {
    render(
      <Drawer
        subreddits={[]}
        isDrawerOpen={false}
        handleBurgerClick={mockHandleBurgerClick}
        isLoading={false}
        handleSubredditClick={mockHandleSubredditClick}
      />
    );

    const drawer = screen.getByRole('presentation');

    expect(drawer).toHaveClass('invisible');
  });

  it('calls handleBurgerClick when the close button is clicked', () => {
    render(
      <Drawer
        subreddits={[]}
        isDrawerOpen={true}
        handleBurgerClick={mockHandleBurgerClick}
        isLoading={false}
        handleSubredditClick={mockHandleSubredditClick}
      />
    );

    const closeButton = screen.getByLabelText('Close Menu');
    fireEvent.click(closeButton);

    expect(mockHandleBurgerClick).toHaveBeenCalledTimes(1);
  });

  it('closes the drawer when Escape key is pressed', () => {
    render(<Drawer
      subreddits={[]}
      isDrawerOpen={true}
      handleBurgerClick={mockHandleBurgerClick}
      isLoading={false}
      handleSubredditClick={mockHandleSubredditClick}
    />);

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(mockHandleBurgerClick).toHaveBeenCalledTimes(1);
  });

  it('shows the loading spinner when isLoading is true', () => {
    render(<Drawer
      subreddits={[]}
      isDrawerOpen={true}
      handleBurgerClick={mockHandleBurgerClick}
      isLoading={true}
      handleSubredditClick={mockHandleSubredditClick}
    />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays subreddits when isLoading is false and data is available', async () => {
    const subreddits = [
      { name: 'r/test', url: 'https://reddit.com/r/test' },
      { name: 'r/example', url: 'https://reddit.com/r/example' },
    ];

    render(<Drawer
      subreddits={subreddits}
      isDrawerOpen={true}
      handleBurgerClick={mockHandleBurgerClick}
      isLoading={false}
      handleSubredditClick={mockHandleSubredditClick}
    />);

    subreddits.forEach(subreddit => {
      expect(screen.getByText(subreddit.name)).toBeInTheDocument();
    });
  });

  it('shows an error message if there are no subreddits and isLoading is false', async () => {
    render(<Drawer
      subreddits={[]}
      isDrawerOpen={true}
      handleBurgerClick={mockHandleBurgerClick}
      isLoading={false}
      handleSubredditClick={mockHandleSubredditClick}
    />);

    expect(screen.getByText('There was an error fetching SubReddits')).toBeInTheDocument();
  });
});
