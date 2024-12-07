import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { Comment } from "./Comment";

describe('Comment Component', () => {
  it('renders comment text correctly', () => {
    const commentText = 'This is a test comment';

    render(<Comment comment={commentText} />);

    const commentElement = screen.getByText(commentText);

    expect(commentElement).toBeInTheDocument();
  });

  it('renders the correct HTML structure', () => {
    const commentText = 'Another comment example';

    render(<Comment comment={commentText} />);

    // eslint-disable-next-line testing-library/no-node-access
    const paragraph = screen.getByText(commentText).closest('p');
    expect(paragraph).toHaveClass('break-words');
    expect(paragraph).toHaveClass('p-4');

    const hr = screen.getByRole('separator');
    expect(hr).toBeInTheDocument();
  });
});
