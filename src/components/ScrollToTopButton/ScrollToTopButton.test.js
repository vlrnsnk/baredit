import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { ScrollToTopButton } from "./ScrollToTopButton";

jest.mock('assets/arrow-up.svg', () => ({
  ReactComponent: () => <svg data-testid="arrow-up-icon" />
}));

const mockScrollTo = jest.fn();
global.scrollTo = mockScrollTo;

describe('ScrollToTopButton', () => {

  beforeEach(() => {
    window.scrollY = 0;
  });

  it('should render the button with opacity 0 initially (hidden)', () => {
    render(<ScrollToTopButton />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('opacity-0');
  });

  it('should become visible when scroll position is greater than 300px', () => {
    render(<ScrollToTopButton />);

    window.scrollY = 400;
    fireEvent.scroll(window);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('opacity-100');
  });

  it('should call window.scrollTo when the button is clicked', () => {
    render(<ScrollToTopButton />);

    window.scrollY = 400;
    fireEvent.scroll(window);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('should add and remove scroll event listener correctly', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    render(<ScrollToTopButton />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockClear();

    const { unmount } = render(<ScrollToTopButton />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should render the arrow icon inside the button', () => {
    render(<ScrollToTopButton />);

    const arrowIcon = screen.getByTestId('arrow-up-icon');

    expect(arrowIcon).toBeInTheDocument();
  });
});
