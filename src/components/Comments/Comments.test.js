import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Comments } from "./Comments";
import { Comment } from "components/Comment/Comment";
import { ReactComponent as CloseIcon } from 'assets/x-mark.svg';
import { ReactComponent as Spinner } from 'assets/spinner.svg';

describe('Comments Component', () => {
  const mockHandleCloseButtonClick = jest.fn();

  global.window = Object.create(window);
  Object.defineProperty(window, 'innerWidth', { value: 1024 });
  Object.defineProperty(window, 'innerHeight', { value: 768 });

  it('renders loading state correctly', () => {
    render(
      <Comments
        isShowComments={true}
        comments={[]}
        handleCloseButtonClick={mockHandleCloseButtonClick}
        isLoadingComments={true}
      />
    );

    const spinner = screen.getByTestId('spinner');
    const loadingText = screen.getByText(/Loading.../i);

    expect(spinner).toBeInTheDocument();
    expect(loadingText).toBeInTheDocument();
  });

  it('renders comments correctly when available', () => {
    const sampleComments = ['This is comment 1', 'This is comment 2'];

    render(
      <Comments
        isShowComments={true}
        comments={sampleComments}
        handleCloseButtonClick={mockHandleCloseButtonClick}
        isLoadingComments={false}
      />
    );

    sampleComments.forEach(comment => {
      expect(screen.getByText(comment)).toBeInTheDocument();
    });
  });

  it('renders no comments message when there are no comments', () => {
    render(
      <Comments
        isShowComments={true}
        comments={[]}
        handleCloseButtonClick={mockHandleCloseButtonClick}
        isLoadingComments={false}
      />
    );

    const noCommentsMessage = screen.getByText(/No comments loaded/i);

    expect(noCommentsMessage).toBeInTheDocument();
  });

  it('calls handleCloseButtonClick when close button is clicked', () => {
    render(
      <Comments
        isShowComments={true}
        comments={[]}
        handleCloseButtonClick={mockHandleCloseButtonClick}
        isLoadingComments={false}
      />
    );

    const closeButton = screen.getByLabelText(/Close Comments/i);
    fireEvent.click(closeButton);

    expect(mockHandleCloseButtonClick).toHaveBeenCalledTimes(1);
  });

  it('closes overlay when Esc key is pressed', async () => {
    render(
      <Comments
        isShowComments={true}
        comments={[]}
        handleCloseButtonClick={mockHandleCloseButtonClick}
        isLoadingComments={false}
      />
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.keyDown(window, { key: 'Escape' });
    });

    expect(mockHandleCloseButtonClick).toHaveBeenCalledTimes(1);
  });

  it('overlay visibility transitions correctly', async () => {
    const { rerender } = render(
      <Comments
        isShowComments={true}
        comments={[]}
        handleCloseButtonClick={mockHandleCloseButtonClick}
        isLoadingComments={false}
      />
    );

    const overlay = screen.getByRole('presentation');
    expect(overlay).toHaveClass('opacity-100');
    expect(overlay).toHaveClass('visible');

    rerender(
      <Comments
        isShowComments={false}
        comments={[]}
        handleCloseButtonClick={mockHandleCloseButtonClick}
        isLoadingComments={false}
      />
    );

    await waitFor(() => {
      expect(overlay).toHaveClass('opacity-0');
    });

    await waitFor(() => {
      expect(overlay).toHaveClass('invisible');
    });
  });
});
